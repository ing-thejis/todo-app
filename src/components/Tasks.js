import { Button, makeStyles, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {Edit, Delete} from '@material-ui/icons';

const baseURL = "http://localhost:4000/task/"

const Tasks = () => {

    const classes = useStyles()

    const [data, setData] = useState([]);
    const [statusModal, setStatusModal] = useState(false)
    const date = new Date()

    const [taskSelect, setTaskSelect] = useState({
        id: "",
        title: "",
        description: "",
        date: ""
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
        setStatusModal(!statusModal)
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
  
    useEffect(() => {
      requestGET();
      document.title = "Task"
    }, [])

    const bodyInsert = (
        <div className={classes.modalInsert}>
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
            {/* <TextField
                className={classes.InputField}
                name="date"
                type="date"
                defaultValue={date.getTime()}
                onChange={handleChange}
            /> */}
            <TextField
                className={classes.InputField}
                name="date"
                label="date"
                onChange={handleChange}
            />
            <br />
            <br />
            <div>
                <Button className={classes.btn} onCLick={()=>requestPOST()} >Create</Button>
                <Button className={classes.btn} onClick={()=>openCloseModalInsert()}>Cancel</Button>
            </div>
        </div>
    )
    return (
        <div className={classes.task}>
            <Button onClick={openCloseModalInsert} >Create</Button>

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
                                <TableCell><Edit /><Delete /></TableCell>
                            </TableRow>       
                        ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={statusModal}
                onClose={openCloseModalInsert}>
                {bodyInsert}
            </Modal>
        </div>
    )
}

export default Tasks

const useStyles = makeStyles((theme)=>({
    modalInsert: {
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