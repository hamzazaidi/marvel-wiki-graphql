import React from 'react';
import { useParams } from 'react-router-dom';
export interface ComicProps {
    comics: any[]
}
 
const Comic: React.SFC<ComicProps> = ({ comics }) => {
    const { comicId } = useParams();
    const comic = comics.find(c => c.id === comicId)
    return (
        <div>
            { JSON.stringify(comic) }
        </div>
    );
}
 
export default Comic;