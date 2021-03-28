import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';
import CharacterAutocomplete from './character-autocomplete';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            display: 'block',
            width: 150,
            height: 30
        },
        search: {
            position: 'relative',
            backgroundColor: 'inherit',
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
    }),
);


const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <img className={classes.title} src={logo} />
                    <div className={classes.search}>    
                        <CharacterAutocomplete />                   
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;