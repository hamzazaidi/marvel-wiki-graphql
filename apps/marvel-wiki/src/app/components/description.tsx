import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Typography } from "@material-ui/core";
export interface DescriptionProps {
    description: string;
    justifyContent: string;
}
const useStyles = makeStyles((theme) => ({
    description: {
        display: "flex"
    },
    descriptionCard: {
        maxWidth: 500,
    },
}));
const Description: React.SFC<DescriptionProps> = ({ description, justifyContent }) => {
    const classes = useStyles();
    if (!description) { return <div></div> }
    return (
        <div className={classes.description} style={{ justifyContent }}>
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
 
export default Description;