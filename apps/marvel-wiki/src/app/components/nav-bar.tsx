import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/logo.png';
import { Autocomplete } from '@material-ui/lab';
import { Avatar as AvatarMaterial, CircularProgress, TextField } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries';
import { Avatar } from '@marvel-wiki/api-interfaces';
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
        medium: {
            width: theme.spacing(5),
            height: theme.spacing(5),
            marginRight: theme.spacing(2),
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
        inputRoot: {
            color: 'white',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);
const Navbar = () => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const [loadCharacters, { called, loading, data }] = useLazyQuery(
        GET_CHARACTERS,
        { variables: { nameStartsWith: searchText } }
    );
    useEffect(() => {
        if (searchText) {
            loadCharacters();
        }
    }, [searchText]);

    const handleChange = (searchText: string) => {
        setSearchText(searchText);
    }
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <img className={classes.title} src={logo} />
                    <div className={classes.search}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={data?.characters || []}
                            getOptionLabel={(option: any) => option && option.name}
                            style={{ width: 300 }}
                            renderOption={(option) => (
                                <React.Fragment>
                                    <span>
                                        <AvatarMaterial src={avatar(option.thumbnail)} className={classes.medium} />
                                    </span>
                                    { option.name}
                                </React.Fragment>
                            )}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    onChange={(e) => handleChange(e.target.value)}
                                    label="Search"
                                    variant="outlined"
                                    margin="dense"
                                    color="secondary"
                                    classes={{
                                        root: classes.inputRoot
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="secondary" size={20} /> : null}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                            onChange={(event, value) =>
                                history.push(`/character/${value.id}`)
                            }
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;