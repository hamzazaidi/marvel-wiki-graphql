import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Avatar as AvatarMateial, Box, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";
import { CompassCalibration } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";

export interface ComicListProps {
    comics: any[];
}

const useStyles = makeStyles((theme) => ({
    root: {},
    container: {
        overflowX: 'auto',        
        padding: theme.spacing(5),
        backgroundColor: '#ededed'
    },
    comicHeader: {
        paddingLeft: theme.spacing(5),
        marginBottom: theme.spacing(1)
    },
    comic: {
        display: 'flex',        
        width: 300,
        marginRight: theme.spacing(5)
    },
    image: {
        boxShadow: '0px 0px 25px -10px #000',
        marginRight: theme.spacing(2)
    },    
}));

const ComicList: React.SFC<ComicListProps> = ({ comics }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const avatar = (thumbnail: Avatar): string =>
        `${thumbnail.path}.${thumbnail.extension}`;
    const imageSize = () => {
        if(matchesXSmall || matchesSmall) {
            return { width: 100, height: 150 };
        }
        return {width: 200, height: 250 }
    }
    return (
        <div className={ classes.root }>
            {
                !!comics.length && <div className={ classes.comicHeader }>
                    <Typography variant="h3" component="h2">Featured</Typography>
                    <Typography variant="body1" component="h2" color="textSecondary">comic books we love</Typography>
                </div>
            }   
            {    
                !!comics.length && <Grid container wrap="nowrap" className={ classes.container }>
                    {
                        comics.map(comic => (
                            <Grid item key={comic.id}>
                                <div className={ classes.comic }>
                                    <img className={ classes.image } style={{ ...imageSize() }} src={ avatar(comic.thumbnail) } alt=""/>
                                    <Typography variant="h6" component="h2">
                                        { comic.title }                                    
                                    </Typography>                                
                                </div>
                            </Grid>
                        ))
                    }             
                </Grid>
            }
        </div>
    );
}

export default ComicList;