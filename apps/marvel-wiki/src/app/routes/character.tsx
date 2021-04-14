import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import CharacterTopBar from "../components/character-top-bar";
import { GET_CHARACTER } from "../queries";
import CharacterDetail from "./character-detail";
import Comic from "./comic";
import Event from "./event";
import SearchComics from "./search-comics";
import SearchEvents from "./search.events";

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
                    <div>
                        <Switch>
                            <Route path={`${match.path}/details`}>
                                <CharacterDetail character={data}/>
                            </Route>
                            <Route path={`${match.path}/search-comics`}>
                                <SearchComics />
                            </Route>
                            <Route path={`${match.path}/search-events`}>
                                <SearchEvents />
                            </Route>
                            <Route path={`${match.path}/event/:eventId`}>
                                <Event />
                            </Route>
                            <Route path={`${match.path}/comic/:comicId`}>
                                <Comic />
                            </Route>
                        </Switch>
                    </div>
                </div>
            }
        </div>
    );
}

export default Character;