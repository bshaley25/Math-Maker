import React from 'react'
// import html2canvas from 'html2canvas'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from  '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Slider from '@material-ui/core/Slider'
// import { ListItemSecondaryAction } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 5,
    },
    slider: {
        width: 300,
        backgroundColor: 'white',
      },
  })
);

// function valuetext(value) {
//     return `${value} columns`;
// }
  

export default ({clearGrid, updateColumns, columns, updateRows, rows}) => {

    const classes = useStyles();

    // const handleClick = (event) => {
    //     console.log(event.currentTarget)
    //     html2canvas(document.getElementById('grid'))
    //         .then(canvas => {
    //             const link = document.getElementById('link')
    //             link.href = canvas.toDataURL();
    //             link.download = "mypainting.png";
    //         });
    // }

    return (
        <AppBar position="static" >
        <Toolbar>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            User Here
          </Typography>

          <Toolbar>
              <Typography variant="h6">
                  Change rows
              </Typography>
              <input type="number" min="10" max="40" onChange={updateRows} value={rows}></input>
          </Toolbar>

          <Toolbar>
              <Typography variant="h6">
                  Change columns
              </Typography>
              <input type="number" min="10" max="40" onChange={updateColumns} value={columns}></input>
            </Toolbar>

          <Button color="inherit" onClick={clearGrid}>Clear</Button>
          <Button color="inherit" onClick={clearGrid}>Clear</Button>

        </Toolbar>
      </AppBar>


        // <header>
        //     <h1>Welcome User!</h1>
        //     <nav>
        //         <button onClick={clearGrid}>Clear</button>
        //         <h2>Save</h2>
        //         <h2 onClick={handleClick} ><a id='link' href='/'>Take pic</a></h2>
        //         <h2>Logout</h2>
        //     </nav>
        // </header>
    )

}