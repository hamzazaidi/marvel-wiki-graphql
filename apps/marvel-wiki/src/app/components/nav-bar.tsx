import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';
import CharacterAutocomplete from './character-autocomplete';
import { CssBaseline, Slide, useScrollTrigger } from '@material-ui/core';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        title: {
            display: 'block',
            width: 150,
            height: 30,
            marginRight: theme.spacing(3)
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
        customizeToolbar: {
            minHeight: 64
        }
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children?: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar >
                    <Toolbar className={classes.customizeToolbar}>
                        <Link to="/">
                            <img className={classes.title} src={logo} />
                        </Link>
                        <div className={classes.search}>
                            <CharacterAutocomplete />
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}

export default Navbar;