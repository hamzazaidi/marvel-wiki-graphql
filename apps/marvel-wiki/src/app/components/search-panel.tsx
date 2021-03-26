import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ButtonGroup, createStyles, debounce, Fab, makeStyles, Theme } from '@material-ui/core';
export interface SearchPanelProps {
    handleQuery: Function
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column'
        },
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);
const SearchPanel: React.SFC<SearchPanelProps> = ({ handleQuery }) => {
    const classes = useStyles();
    const getCharacters = () => {
        const charArray = []
        for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {  
            charArray.push(String.fromCharCode(i))
        }  
        return charArray;
    }
    const handleCharacterClick = (char: string) => {
        handleQuery(char)
    }
    const handleChange = (string: string) => {
        debounce(() => handleQuery(string), 500)()        
    }
    return (
        <form noValidate autoComplete="off" className={ classes.root }>
             <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical contained primary button group"
                variant="text"
            >
            {
                getCharacters().map(c => (
                    <Button key={c} onClick={ () => handleCharacterClick(c) }>{ c }</Button>
                ))
            }      
            </ButtonGroup>      
        </form>
    );
}

export default SearchPanel;