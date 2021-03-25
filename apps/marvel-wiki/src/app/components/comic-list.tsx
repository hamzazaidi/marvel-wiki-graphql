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
        maxWidth: 150,
    },
    media: {
        height: 250,
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
                            <Typography gutterBottom variant="caption">
                                { comic.title }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
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