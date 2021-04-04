import React from "react";
import Description from "../components/description";
import ComicList from "../components/comic-list";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import EventList from "../components/event-list";
export interface CharacterDetailProps {
    character: any;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        }
    }),
);

const CharacterDetail: React.SFC<CharacterDetailProps> = ({ character }) => {
    const classes = useStyles();
    return (
        <div>
            {character && (
                <div>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Description description={character.character.description} justifyContent="center" />            
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <EventList events={ character.character.events } name={ character.character.name }/>
                            </Grid>                            
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ComicList comics={character.character.comics} />      
                            </Grid>                            
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterDetail;
