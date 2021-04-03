import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { avatar } from "../utils";

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
    const history = useHistory();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const handleComicClick = (comic) => {
        history.push(`comic/${comic.id}`);
    }
    const imageSize = () => {
        if(matchesXSmall || matchesSmall) {
            return { width: 100, height: 150 };
        }
        return {width: 200, height: 250 }
    }
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    return (
        <div className={ classes.root }>
            {
                !!comics.length && <div className={ classes.comicHeader }>
                    <Typography variant={ isSmallScreen() ? 'h5' : 'h3' } component="h2">Featured</Typography>
                    <Typography variant="body1" component="h2" color="textSecondary">comic books we love</Typography>
                </div>
            }   
            {    
                !!comics.length && <Grid container wrap="nowrap" className={ classes.container }>
                    {
                        comics.map(comic => (
                            <Grid item key={comic.id} onClick={ () => handleComicClick(comic) }>
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