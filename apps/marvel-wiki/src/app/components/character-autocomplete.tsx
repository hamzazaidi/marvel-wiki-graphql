import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Avatar as AvatarMaterial, CircularProgress, debounce, TextField, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries';
import { Avatar } from '@marvel-wiki/api-interfaces';
export interface CharacterAutocompleteProps {

}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        medium: {
            width: theme.spacing(5),
            height: theme.spacing(5),
            marginRight: theme.spacing(3),
        },        
        multilineColor: {
            color: 'white'
        }
    }),
);

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'white'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInputBase-root': {
            paddingRight: '10px !important'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white'                
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    }, 
})(TextField);

const CharacterAutocomplete: React.SFC<CharacterAutocompleteProps> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [loadCharacters, { loading, data }] = useLazyQuery(
        GET_CHARACTERS,
        { variables: { nameStartsWith: searchText } }
    );
    useEffect(() => {
        if (searchText) {
            localStorage.setItem('topbarSearch', 'true');
            loadCharacters();
        }
    }, [searchText]);
    const isSmallScreen = () => matchesSmall || matchesXSmall;    
    const handleChange = (searchText: string) => {
        debounce(() => setSearchText(searchText), 1000)();        
    }
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    
    return (
        <Autocomplete
            id="combo-box-demo"
            options={data?.characters || []}
            getOptionLabel={(option: any) => option && option.name}
            style={{ width: isSmallScreen() ? 170 : 300 }}
            loading={loading}
            clearOnBlur
            renderOption={(option) => (
                <React.Fragment>
                    <span>
                        <AvatarMaterial src={avatar(option.thumbnail)} className={classes.medium} />
                    </span>
                    { option.name}
                </React.Fragment>
            )}
            renderInput={params => (
                <CssTextField
                    {...params}
                    onChange={(e) => handleChange(e.target.value)}
                    label="Search"
                    variant="outlined"
                    margin="dense"
                    InputProps={{
                        ...params.InputProps,
                        classes: {
                            input: classes.multilineColor,
                        },
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="primary" size={20} /> : null}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            onChange={(event, value) =>
                history.push(`/character/${value.id}`)
            }
        />
    );
}

export default CharacterAutocomplete;