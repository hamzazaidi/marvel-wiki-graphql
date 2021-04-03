import React from 'react';
export interface ComicProps {
    comics: any[]
}
 
const Comic: React.SFC<ComicProps> = () => {
    return (
        <div>Comic</div>
    );
}
 
export default Comic;