import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHARACTER } from "../queries";
import { Avatar as AvatarImg, makeStyles } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { primaryColor } from "../colors";
export interface CharacterDetailProps { }
const useStyles = makeStyles((theme) => ({
    description: {
        display: "flex",
        justifyContent: "center",
    },
    descriptionCard: {
        maxWidth: 500,
    },
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
    },
    topbar: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: primaryColor,
    },
    avatar: {
        alignSelf: "center",
        width: 150,
        height: 150,
    },
}));

const CharacterDetail: React.SFC<CharacterDetailProps> = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id },
    });
    const avatar = (thumbnail: Avatar): string =>
        `${thumbnail.path}.${thumbnail.extension}`;
    return (
        <div>
            {data && (
                <div>
                    <div className={classes.topbar}>
                        <AvatarImg
                            alt={data.character.name}
                            src={avatar(data.character.thumbnail)}
                            className={classes.avatar}
                        />
                        <Typography align="center" component="h2" color="textPrimary">
                            {data.character.name}
                        </Typography>
                    </div>
                    <div className={classes.description}>
                        <Card className={classes.descriptionCard} variant="outlined">
                            <CardContent>
                                <Typography align="center" component="h2" color="textPrimary">
                                    {data.character.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={ classes.comic }>
                        {
                            data.character.comics.map(comic => (
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
                </div>
            )}
        </div>
    );
};

export default CharacterDetail;
