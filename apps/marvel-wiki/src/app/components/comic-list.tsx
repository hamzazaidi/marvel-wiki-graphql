import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";

export interface ComicListProps {
    comics: any[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 245,
        maxHeight: 350,
        minHeight: 350
    },
}));

const ComicList: React.SFC<ComicListProps> = ({ comics }) => {
    const classes = useStyles();
    const avatar = (thumbnail: Avatar): string =>
        `${thumbnail.path}.${thumbnail.extension}`;
    return (

        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
        >
            {
                comics.map(comic => (
                    <Grid item xs={12} md={4} key={comic.id}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="180"
                                    image={ avatar(comic.thumbnail) }
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle2" component="h2">
                                        { comic.title }
                                    </Typography>                                    
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default ComicList;