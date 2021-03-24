import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHARACTER } from "../queries";
import CharacterTopBar from "./character-top-bar";
import CharacterDescription from "./character-description";
import ComicList from "./comic-list";
export interface CharacterDetailProps { }

const CharacterDetail: React.SFC<CharacterDetailProps> = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id },
    });
    return (
        <div>
            {data && (
                <div>
                    <CharacterTopBar name={ data.character.name } thumbnail={ data.character.thumbnail } />
                    <CharacterDescription description={ data.character.description } />
                    <ComicList comics={ data.character.comics } />
                </div>
            )}
        </div>
    );
};

export default CharacterDetail;
