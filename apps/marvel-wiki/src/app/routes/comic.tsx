import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import ComicDetail from '../components/comic-detail';
export interface ComicProps {
    comics: any[]
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            margin: '0 auto',
            width: '80%'
        },
    }),
);


const Comic: React.SFC<ComicProps> = ({ comics }) => {
    const classes = useStyles();
    const { comicId } = useParams();
    const comic = comics.find(c => c.id === comicId)
    return (
        <div className={ classes.content }>
            <ComicDetail comic={ comic } />
        </div>
    );
}
 
export default Comic;