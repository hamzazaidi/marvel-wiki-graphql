import React from 'react';
import { Button, ButtonGroup, createStyles, makeStyles, Theme } from '@material-ui/core';
export interface SearchPanelProps {
    handleQuery: Function;
    loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
            height: '100%'
        },
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);
const SearchPanel: React.SFC<SearchPanelProps> = ({ handleQuery, loading }) => {
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
    return (
        <form noValidate autoComplete="off" className={ classes.root }>
             <ButtonGroup
                orientation="vertical"
                color="secondary"                
                variant="text"
                size="small"
                disabled={ loading }
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