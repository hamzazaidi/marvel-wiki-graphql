import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHARACTER } from "../queries";
import CharacterTopBar from "./character-top-bar";
import CharacterDescription from "./character-description";
import ComicList from "./comic-list";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
export interface CharacterDetailProps { }
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }),
);

const CharacterDetail: React.SFC<CharacterDetailProps> = () => {
    const { id } = useParams();
    const classes = useStyles();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id },
    });
    return (
        <div>
            {data && (
                <div>
                    <CharacterTopBar name={data.character.name} thumbnail={data.character.thumbnail} />
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CharacterDescription description={data.character.description} />            
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ComicList comics={data.character.comics} />      
                            </Grid>                            
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterDetail;
