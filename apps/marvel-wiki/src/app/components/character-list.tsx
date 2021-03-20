import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { useQuery } from '@apollo/client';
import { Avatar } from '@marvel-wiki/api-interfaces';
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
export interface CharacterListProps {

}

const CharacterList: React.SFC<CharacterListProps> = () => {
    const classes = useStyles();
    const { loading, error, data: characterList } = useQuery(GET_CHARACTERS);
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    return (
        <div className={classes.root}>
            <GridList cellHeight={300} spacing={0} cols={5}>
                {characterList?.characters.map((character) => (
                    <GridListTile key={character.od}>
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