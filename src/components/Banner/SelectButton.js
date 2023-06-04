import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles=makeStyles(()=>({
    selectButton:{
        border:"1px solid orangered",
        borderRadius:"5px",
        padding:"10px",
        paddingLeft:"20px",
        paddingRight:"20px",
        fontFamily:"Montserrat",
        cursor:"pointer",
        backgroundColor:"orangered",
        fontWeight:"bold",
        "&:hover":{
            backgroundColor:"black",
            color:"orangered"
        },
        width:"22%",
        margin:"7px",
        textAlign:"center"

    }
    
}))

const SelectButton = ({children,selected,onClick}) => {
   
    const classes=useStyles()
  return (
    <span 
    className={classes.selectButton}
    onClick={onClick}
    >{children}</span>
  )
}

export default SelectButton