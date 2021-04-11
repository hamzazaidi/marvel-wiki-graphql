import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import ComicDetail from '../components/comic-detail';
import { GET_COMIC_BY_ID } from '../queries';
export interface ComicProps {}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            margin: '0 auto',
            width: '80%'
        },
    }),
);


const Comic: React.SFC<ComicProps> = () => {
    const classes = useStyles();
    const { comicId } = useParams();
    const { loading, error, data } = useQuery(GET_COMIC_BY_ID, {
        variables: { id: comicId },
    });
    return (
        <div className={ classes.content }>
            { data && <ComicDetail comic={ data.comic } /> }
        </div>
    );
}
 
export default Comic;