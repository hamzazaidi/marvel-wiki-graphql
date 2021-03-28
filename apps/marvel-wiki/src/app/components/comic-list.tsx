import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";
import { CompassCalibration } from "@material-ui/icons";

export interface ComicListProps {
    comics: any[];
}

const useStyles = makeStyles((theme) => ({
    comic: {
        display: 'flex',
    },
    image: {
        width: 175,
        height: 250,
        boxShadow: '0px 0px 25px -10px #000',
        marginRight: theme.spacing(5)
    },    
}));

const ComicList: React.SFC<ComicListProps> = ({ comics }) => {
    const classes = useStyles();
    const avatar = (thumbnail: Avatar): string =>
        `${thumbnail.path}.${thumbnail.extension}`;
    const top3 = () => comics.slice(0, 3)
    const rest =() => comics.slice(3, comics.length)
    return (
        <Grid container>
            {
                top3().map(comic => (
                    <Grid item xs={12} md={4} key={comic.id}>
                        <div className={ classes.comic }>
                            <img className={ classes.image } src={ avatar(comic.thumbnail) } alt=""/>
                            <Typography variant="h3" component="h2">
                                { comic.title }
                            </Typography>
                        </div>
                    </Grid>
                ))
            }
             {
                rest().map(comic => (
                    <Grid item xs={1} md={1} key={comic.id}>
                        <div className={ classes.comic }>
                            <img className={ classes.image } src={ avatar(comic.thumbnail) } alt=""/>
                            <Typography variant="h3" component="h2">
                                { comic.title }
                            </Typography>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default ComicList;