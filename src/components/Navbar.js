import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Paper } from '@material-ui/core'

const Navbar = () => {

  const classes = useStyles()

  return (
      <nav className={classes.navbar}>
    
        <Link to="/" className={classes.menu}>Tasks</Link>
        <Link to="/todo" className={classes.menu}>ToDo</Link>
        <Link to="/doing" className={classes.menu}>Doing</Link>
        <Link to="/done" className={classes.menu}>Done</Link>    
      </nav>
  )
}

export default Navbar

const useStyles = makeStyles((theme)=>({
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px 0'
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
     justifyContent: 'center',
     textDecoration: 'none',
     cursor: 'pointer',
     fontSize: '2rem',
     width: '25%',
     height: '100%',
     '&:hover': {
       backgroundColor: '#fff',
       color: '#000',
       borderBottom: '6px solid #f00'
     }
  }
}))