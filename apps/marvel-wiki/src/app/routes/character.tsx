import { useQuery } from "@apollo/client";
import React from "react";
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import CharacterTopBar from "../components/character-top-bar";
import { GET_CHARACTER } from "../queries";
import CharacterDetail from "./character-detail";
import Comic from "./comic";
import Event from "./event";

export interface CharacterProps { }
const Character: React.SFC<CharacterProps> = () => {
    const { id } = useParams();
    let match = useRouteMatch();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id },
    });
    return (
        <div>
            { data && 
                <div>
                    <CharacterTopBar name={data.character.name} thumbnail={data.character.thumbnail} />
                    <div className="content">
                        <Switch>
                            <Route path={`${match.path}/details`}>
                                <CharacterDetail character={data}/>
                            </Route>
                            <Route path={`${match.path}/event/:eventId`}>
                                <Event events={ data.character.events } />
                            </Route>
                            <Route path={`${match.path}/comic/:comicId`}>
                                <Comic comics={ data.character.comics } />
                            </Route>
                        </Switch>
                    </div>
                </div>
            }
        </div>
    );
}

export default Character;