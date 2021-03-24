import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";

export interface ComicListProps {
    comics: any[];
}

const useStyles = makeStyles((theme) => ({
    comic: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    comicCard: {
        maxWidth: 250,
    },
    media: {
        height: 450,
    }
}));
 
const ComicList: React.SFC<ComicListProps> = ({ comics }) => {
    const classes = useStyles();
    const avatar = (thumbnail: Avatar): string =>
    `${thumbnail.path}.${thumbnail.extension}`;
    return (
        <div className={ classes.comic }>
        {
            comics.map(comic => (
                <Card className={classes.comicCard} key={ comic.id }>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={ avatar(comic.thumbnail) }
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                { comic.title }
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                { comic.description }
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
            ))
        }
    </div>
    );
}
 
export default ComicList;