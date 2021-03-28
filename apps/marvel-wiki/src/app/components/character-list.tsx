import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { useQuery } from '@apollo/client';
import { Avatar } from '@marvel-wiki/api-interfaces';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GET_CHARACTERS } from '../queries'
import SearchPanel from './search-panel';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
export interface CharacterListProps { }

const CharacterList: React.SFC<CharacterListProps> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.down('md'));
    const { loading, error, data: characterList, refetch } = useQuery(GET_CHARACTERS);
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    const getCols = () => {
        if (matchesXSmall) { return 2; }
        if (matchesSmall) { return 3; }
        if (matchesMedium) { return 5; }
        return 6;
    }
    const handleClick = (character) => {
        history.push(`/character/${character.id}`);
    }
    const handleQuery = (nameStartsWith: string) => {
        localStorage.setItem('topbarSearch', 'false')
        refetch({ nameStartsWith })
    }
    localStorage.setItem('topbarSearch', 'false');
    return (
        <div className={classes.root}>
            <div>
                <SearchPanel handleQuery={ handleQuery }/>
            </div>
            <GridList cellHeight={300} spacing={0} cols={getCols()} className={classes.gridList}>
                <GridListTile key="Subheader" cols={getCols()} style={{ height: 'auto' }}></GridListTile>
                {characterList?.characters.map((character) => (
                    <GridListTile onClick={() => handleClick(character)} key={character.id}>
                        <img src={avatar(character.thumbnail)} />
                        <GridListTileBar
                            title={character.name}
                        />
                    </GridListTile>

                ))}
            </GridList>
        </div >
    );
}

export default CharacterList;