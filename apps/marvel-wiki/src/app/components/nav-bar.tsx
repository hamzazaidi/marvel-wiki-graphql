import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logo.png';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    img: {
        width: 150,
        height: 30
    }
}));

const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={ logo } alt="" className={ classes.img }/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;