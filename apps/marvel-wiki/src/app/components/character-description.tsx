import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Typography } from "@material-ui/core";
export interface CharacterDescriptionProps {
    description: string;
}
const useStyles = makeStyles((theme) => ({
    description: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2)
    },
    descriptionCard: {
        maxWidth: 500,
    },
}));
const CharacterDescription: React.SFC<CharacterDescriptionProps> = ({ description }) => {
    const classes = useStyles();
    if (!description) { return <div></div> }
    return (
        <div className={classes.description}>
            <Card className={classes.descriptionCard} variant="outlined">
                <CardContent>
                    <Typography align="center" component="h2" color="textPrimary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default CharacterDescription;