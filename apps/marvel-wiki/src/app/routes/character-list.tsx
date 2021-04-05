import React, { useEffect, useState } from 'react';
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
import { Pagination } from '@material-ui/lab';
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
    pagination: {
        margin: theme.spacing(2),
        '& .MuiPagination-ul': {
            justifyContent: 'center'
        }
    }
}));
export interface CharacterListProps { }
const LIMIT = 12;
const CharacterList: React.SFC<CharacterListProps> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [ params, setParams ] = useState({
        nameStartsWith: '',
        offset: 0,
        limit: LIMIT
    });
    const [ metaData, setMetaData ] = useState(null);
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    const { loading, error, data: characterList, refetch } = useQuery(GET_CHARACTERS, {
        variables: { ...params },
        onCompleted: () => {
            const metaDataInLocalStorage = JSON.parse(localStorage.getItem('meta-data'));
            setMetaData(metaDataInLocalStorage);
        }
    });
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
        localStorage.setItem('topbarSearch', 'false');
        setParams({ ...params, nameStartsWith })
        refetch({ ...params, nameStartsWith })
    }
    const handleOnChange = (event, page) => {
        const newParams = { ...metaData, offset: (page === 1) ? 0 : metaData.limit * page };
        setParams({ ...params, ...newParams })
        refetch({ ...params, ...newParams })
    }

    const calcPages = (): number => {
        return metaData ? Math.floor(metaData.total/LIMIT) : 0
    }

    localStorage.setItem('topbarSearch', 'false');
    return (
        <div className={classes.root}>
            <div>
                <SearchPanel handleQuery={ handleQuery } loading={ loading }/>
            </div>
            <div className={classes.gridList}>
                <div className={ classes.pagination }>
                    <Pagination size={ isSmallScreen() ? 'small' : 'large' } disabled={loading} count={calcPages()} variant="outlined" color="secondary" onChange={ handleOnChange } />
                </div>
                <GridList cellHeight={400} spacing={0} cols={getCols()}>
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
            </div>
        </div >
    );
}

export default CharacterList;