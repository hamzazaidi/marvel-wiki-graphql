import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useQuery } from '@apollo/client';
import { Avatar } from '@marvel-wiki/api-interfaces';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GET_CHARACTERS } from '../queries'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
export interface CharacterListProps {}

const CharacterList: React.SFC<CharacterListProps> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.down('md'));    
    const { loading, error, data: characterList } = useQuery(GET_CHARACTERS);
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    const getCols = () => {
        if(matchesXSmall) { return 2; }
        if(matchesSmall) { return 3; }
        if(matchesMedium) { return 6; }
        return 8;
    }
    return (
        <div className={classes.root}>
            <GridList cellHeight={300} spacing={0} cols={ getCols() }>
                <GridListTile key="Subheader" cols={ getCols()} style={{ height: 'auto' }}></GridListTile>
                {characterList?.characters.map((character) => (
                    <GridListTile key={character.id}>
                        <img src={ avatar(character.thumbnail) } />
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