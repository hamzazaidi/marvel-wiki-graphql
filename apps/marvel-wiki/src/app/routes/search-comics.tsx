import { useQuery } from "@apollo/client";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ComicList from "../components/comic-list";
import { GET_COMICS } from "../queries";
export interface SearchComicsProps {

}
const useStyles = makeStyles((theme) => ({
    pagination: {
        margin: theme.spacing(2),
        '& .MuiPagination-ul': {
            justifyContent: 'center'
        }
    }
}));

const LIMIT = 18;
const SearchComics: React.SFC<SearchComicsProps> = () => {
    const { id } = useParams();
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    const [params, setParams] = useState({
        id: parseInt(id),
        offset: 0,
        limit: LIMIT
    });
    const [page, setPage] = useState(1)
    const [metaData, setMetaData] = useState(null);
    const { loading, error, data, refetch } = useQuery(GET_COMICS, {
        variables: { ...params },
        onCompleted: () => {
            const metaDataInLocalStorage = JSON.parse(localStorage.getItem('meta-data-comics'));
            setMetaData(metaDataInLocalStorage);
        }
    });
    const handleOnChange = (event, page) => {
        const newParams = { ...metaData, offset: (page === 1) ? 0 : metaData.offset + metaData.count };
        const args = { ...params, ...newParams };
        setPage(page);
        setParams({ ...args });
        refetch({ ...args });
    }
    const calcPages = (): number => {
        return metaData ? Math.ceil(metaData.total / LIMIT) : 0
    }
    return (
        <div>
            <div className={classes.pagination}>
                <Pagination page={page} size={isSmallScreen() ? 'small' : 'large'} disabled={loading} count={calcPages()} variant="outlined" color="secondary" onChange={handleOnChange} />
            </div>
            <div>
                {data && <ComicList comics={data.comics} showHeader={ false } />}
            </div>
        </div>
    );
}

export default SearchComics;