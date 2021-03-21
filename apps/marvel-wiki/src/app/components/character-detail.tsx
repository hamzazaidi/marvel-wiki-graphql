import React from "react";
import { useParams } from "react-router-dom";
export interface CharacterDetailProps {
    
}
 
const CharacterDetail: React.SFC<CharacterDetailProps> = () => {
    const { id } = useParams();
    return (
        <div>Details: { id }</div>
    );
}
 
export default CharacterDetail;