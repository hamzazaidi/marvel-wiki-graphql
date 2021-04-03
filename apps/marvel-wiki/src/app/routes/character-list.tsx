import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Zoom from '@material-ui/core/Zoom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { useQuery } from '@apollo/client';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GET_CHARACTERS } from '../queries'
import SearchPanel from '../components/search-panel';
import { avatar } from '../utils';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',        
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
    const getCols = () => {
        if (matchesXSmall) { return 2; }
        if (matchesSmall) { return 3; }
        if (matchesMedium) { return 5; }
        return 6;
    }
    const handleClick = (character) => {
        history.push(`/character/${character.id}/details`);
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
                    <Zoom in={!!character} key={character.id}>
                        <GridListTile onClick={() => handleClick(character)} >                            
                                <img src={avatar(character.thumbnail)} />
                                <GridListTileBar
                                    title={character.name}
                                />                        
                        </GridListTile>
                    </Zoom>
                ))}
            </GridList>
        </div >
    );
}

export default CharacterList;