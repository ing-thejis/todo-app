import { Button, makeStyles, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {Edit, Delete} from '@material-ui/icons';

const baseURL = "http://localhost:4000/task/"

const Tasks = () => {

    const classes = useStyles()

    const [data, setData] = useState([]);
    const [modalInsert, setModalInsert] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const date = new Date()

    const [taskSelect, setTaskSelect] = useState({
        id: "",
        title: "",
        description: "",
        created_at: ""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setTaskSelect(prevState=>({
            ...prevState,
            [name]: value
         }))
         console.log(taskSelect)
    }

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert)
    }

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit)
    }

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete)
    }

    const requestGET = async () => {
      await axios.get(baseURL)
      .then(response=>{
        setData(response.data)
      })
      .catch(error=>{
        console.log(error)
      })
    }

    const requestPOST = async () => {
        await axios.post(baseURL, taskSelect)
        .then(response=>{
            setData(data.concat(response.data))
            openCloseModalInsert()
        })
    }

    const requestPUT = async () => {
        await axios.put(baseURL+taskSelect.id, taskSelect)
        .then(response => {
            var newData = data;
            newData.map(task => {
                if(taskSelect.id === task.id) {
                    task.title = taskSelect.title
                    task.description = taskSelect.description
                    task.created_at = taskSelect.created_at
                }
            })
            setData(newData)
            openCloseModalEdit();
        })
    }

    const requestDEL = async () => {
        await axios.delete(baseURL+taskSelect.id)
        .then(response=>{
            setData(data.filter(task=>task.id!==taskSelect.id))
            openCloseModalDelete()
        })
    }
  
    const selectTask = (task, caso) => {
        setTaskSelect(task)
        switch (caso) {
            case 'Edit':
                setModalEdit(true)     
                break;
            case 'Delete':
                setModalDelete(true)
                break;
            default:
                break;
        } 
    }

    useEffect(() => {
      requestGET();
      document.title = "Task"
    }, [])

    const bodyInsert = (
        <div className={classes.modal}>
            <h1>Insert New Task</h1>
            <TextField className={classes.InputField} name="id" label="ID" type="text" onChange={handleChange} />
            <TextField className={classes.InputField} name="title" label="Title" type="text" onChange={handleChange} />
            <TextField 
                className={classes.InputField}
                name="description"
                label="Description"
                multiline
                maxRows={4} 
                onChange={handleChange}
            />
            <br />
            <br />
            <TextField
                className={classes.InputField}
                name="created_at" label="date" type="date"
                defaultValue={date.getTime()}
                onChange={handleChange}
            />
            <br />
            <br />
            <div>
                <Button className={classes.btn} onClick={()=>requestPOST()} >Create</Button>
                <Button className={classes.btn} onClick={()=>openCloseModalInsert()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEdit = (
        <div className={classes.modal}>
            <h1>Edit Task {taskSelect.id}</h1>
            <TextField className={classes.InputField} name="id" label="ID" type="text" onChange={handleChange} value={taskSelect && taskSelect.id} />
            <TextField className={classes.InputField} name="title" label="Title" type="text" onChange={handleChange} value={taskSelect && taskSelect.title} />
            <TextField 
                className={classes.InputField}
                name="description"
                label="Description"
                multiline
                maxRows={4} 
                onChange={handleChange}
                value={taskSelect && taskSelect.description}
            />
            <br />
            <br />
            <TextField
                className={classes.InputField}
                name="created_at" label="date" type="date"
                defaultValue={date.getTime()}
                onChange={handleChange}
                value={taskSelect && taskSelect.created_at}
            />
            <br />
            <br />
            <div>
                <Button className={classes.btn} onClick={()=>requestPUT()} >Edit</Button>
                <Button className={classes.btn} onClick={()=>openCloseModalEdit()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyDelete = (
        <div className={classes.modal}>
            <p>Delete task <b>{taskSelect && taskSelect.title}</b> ?</p>
            
            <div>
                <Button className={classes.btn} onClick={()=>requestDEL()} style={{backgroundColor: '#f00', color: '#fff'}}>Acept</Button>
                <Button className={classes.btn} onClick={()=>openCloseModalDelete()}>Cancel</Button>
            </div>
        </div>
    )

    return (
        
        <div className={classes.task}>
            
            <Button 
            style={{
                backgroundColor: '#00f',
                color: '#fff'
            }}
            onClick={openCloseModalInsert} >Create</Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>CreatedAt</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(task=>(
                            <TableRow>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.created_at}</TableCell>
                                <TableCell>
                                    <Edit style={{cursor: "pointer"}} onClick={()=>selectTask(task, 'Edit')} />&nbsp;&nbsp;&nbsp;
                                    <Delete style={{cursor: "pointer"}} onClick={()=>selectTask(task, 'Delete')} style={{color: '#f00'}} />
                                </TableCell>
                            </TableRow>       
                        ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={modalInsert} onClose={openCloseModalInsert}>
                {bodyInsert}
            </Modal>
            <Modal open={modalEdit} onClose={openCloseModalEdit}>
                {bodyEdit}
            </Modal>  
            <Modal open={modalDelete} onClose={openCloseModalDelete}>
                {bodyDelete}
            </Modal>          
        </div>
    )
}

export default Tasks

const useStyles = makeStyles((theme)=>({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    InputField: {
        width: "100%"
    }
}))