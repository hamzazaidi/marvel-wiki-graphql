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
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: 'calc(100vh - 48px)',
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
    const { loading, error, data: characterList } = useQuery(GET_CHARACTERS);
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    const getCols = () => {
        if (matchesXSmall) { return 2; }
        if (matchesSmall) { return 3; }
        if (matchesMedium) { return 5; }
        return 6;
    }
    const smallScreen = () => matchesSmall || matchesXSmall;
    const handleClick = (character) => {
        history.push(`/character/${character.id}`);
    }
    const handleQuery = (searchText: string) => {
        console.log(searchText)
    }
    return (
        <Grid container spacing={0} justify="center">
            {
                !smallScreen() && <Grid item sm={12} md={3} lg={3}>
                    <SearchPanel handleQuery={ handleQuery }/>
                </Grid>
            }
            <Grid item sm={12} md={9} lg={9}>
                <Box boxShadow={3}>
                <div className={classes.root}>
                    <GridList cellHeight={300} spacing={0} cols={getCols()} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={getCols()} style={{ height: 'auto' }}></GridListTile>
                        {characterList?.characters.map((character) => (
                                <GridListTile onClick={() => handleClick(character)} key={ character.id }>
                                    <img src={avatar(character.thumbnail)} />
                                    <GridListTileBar
                                        title={character.name}
                                    />
                                </GridListTile>
                            
                        ))}
                    </GridList>
                </div >
                </Box>
            </Grid>
        </Grid>
    );
}

export default CharacterList;