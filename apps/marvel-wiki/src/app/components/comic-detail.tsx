import { createStyles, IconButton, makeStyles, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { avatar, getIdFromUri } from "../utils";
import CharactersChips from "./characters-chips";
import CreatorsChips from "./creators-chips";
import Description from "./description";
export interface ComicDetailProps {
    comic: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            margin: '0 auto',
            width: '80%',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        content: {
            display: 'flex'
        },
        mainImage: {
            width: 300,
            height: 450,
            boxShadow: theme.shadows[5]
        },
        smallImage: {
            width: 100,
            height: 150,
            margin: `0 ${theme.spacing(1)}px`,
            boxShadow: theme.shadows[5]
        },
        addtionalImages: {
            width: 300,
            display: 'flex',
            overflowX: 'auto',
            backgroundColor: '#ededed',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        comicDetails: {
            margin: `0 ${theme.spacing(4)}px`
        },
        displayImageContainer: {
            position: 'relative',
            '&:hover': {
                '& .MuiIconButton-root': {
                    opacity: 1,
                    transform: 'translateY(-50%)',
                }
            }
        },
        buttonLeft: {
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-35%)',
            transition: 'all 500ms ease',
            opacity: 0
        },
        buttonRight: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-35%)',
            transition: 'all 500ms ease',
            opacity: 0
        },
    }),
);

const ComicDetail: React.SFC<ComicDetailProps> = ({ comic }) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const images = [comic.thumbnail, ...comic.images]
    const [displayImage, setDisplayImage] = useState(comic.thumbnail)
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    const handleCharacterClick = (character) => {
        const id = getIdFromUri(character.resourceURI);
        history.push(`/character/${id}/details`)
    }
    const comicDetailsStyles = () => {
        return isSmallScreen() ? {
            margin: `${theme.spacing(4)}px 0`
        } : {
            margin: `0 ${theme.spacing(4)}px`
        }
    }
    const nextImage = () => {
        const index = images.indexOf(displayImage);
        const newImage = images[index + 1];
        if (newImage) {
            setDisplayImage(newImage);
        } else {
            setDisplayImage(images[0]);
        }
    }
    const previousImage = () => {
        const index = images.indexOf(displayImage);
        const newImage = images[index - 1];
        if (newImage) {
            setDisplayImage(newImage);
        } else {
            setDisplayImage(images[images.length - 1]);
        }
    }
    return (
        <div className={classes.root}>
            <Typography variant={isSmallScreen() ? 'h6' : 'h3'} component="h2" gutterBottom>{comic.title}</Typography>
            <div className={classes.content} style={{ flexDirection: isSmallScreen() ? 'column' : 'row' }}>
                <div>
                    <div className={classes.displayImageContainer} >
                        <img src={avatar(displayImage)} alt="" className={classes.mainImage} />
                        <IconButton
                            color="secondary"
                            className={classes.buttonLeft}
                            onClick={() => nextImage()}
                        >
                            <ChevronLeft fontSize="large" />
                        </IconButton>
                        <IconButton
                            color="secondary"
                            className={classes.buttonRight}
                            onClick={() => previousImage()}
                        >
                            <ChevronRight fontSize="large" />
                        </IconButton>
                    </div>
                    <div className={classes.addtionalImages}>
                        {
                            comic.images.map((image, i) => (
                                <img key={i} src={avatar(image)} alt="" className={classes.smallImage} />
                            ))
                        }
                    </div>
                </div>
                <div className={classes.comicDetails} style={{ ...comicDetailsStyles() }}>
                    <Description description={comic.description} justifyContent="flex-start" />
                    <CharactersChips
                        characters={comic.characters}
                        handleCharacterClick={handleCharacterClick}
                        type="Comic"
                    />
                    <CreatorsChips
                        creators={comic.creators}
                        type="Comic"
                    />
                </div>
            </div>
        </div>
    );
}

export default ComicDetail;