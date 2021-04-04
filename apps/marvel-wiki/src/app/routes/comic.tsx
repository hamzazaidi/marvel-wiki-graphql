import React from 'react';
import { useParams } from 'react-router-dom';
import ComicDetail from '../components/comic-detail';
export interface ComicProps {
    comics: any[]
}
 
const Comic: React.SFC<ComicProps> = ({ comics }) => {
    const { comicId } = useParams();
    const comic = comics.find(c => c.id === comicId)
    return (
        <div>
            <ComicDetail comic={ comic } />
        </div>
    );
}
 
export default Comic;