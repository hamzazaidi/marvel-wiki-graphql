import React from "react";
import { Avatar as AvatarImg, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { primaryColor } from "../colors";
import { Avatar } from "@marvel-wiki/api-interfaces";
import Banner from '../../assets/marvel_banner.jpeg';
import { avatar } from "../utils";
export interface CharacterTopBarProps {
    name: string;
    thumbnail: Avatar;
}
const useStyles = makeStyles((theme) => ({
    topbar: {
        position: 'relative',
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: theme.spacing(15),               
    },
    background: {
        backgroundImage: `url(${Banner})`,
        height: 250,
        filter: 'grayscale(.7)',
        transition: 'filter 1s ease',
        boxShadow: '0px 0px 25px -10px #FFF',
        '&:hover': {
            filter: 'grayscale(0)'
        }
    },
    profile: {
        position: 'absolute',
        bottom: '-38%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto'
    },
    avatar: {
        alignSelf: "center",
        width: 250,
        height: 250,
        border: '2px solid #FFF',
        boxShadow: '0px 0px 25px -10px #FFF',
        margin: 'auto'
    },
}));
const CharacterTopBar: React.SFC<CharacterTopBarProps> = ({ name, thumbnail }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = () => matchesSmall || matchesXSmall; 
    const smallScreen = () => isSmallScreen() ? {
        width: 200, height: 200
    }: {};  
    return (
        <div className={classes.topbar}>
            <div className={classes.background}></div>
            <div className={classes.profile}>
                <AvatarImg
                    alt={name}
                    src={avatar(thumbnail)}
                    style={{ ...smallScreen() }}
                    className={classes.avatar}
                />
                <Typography align="center" variant={ isSmallScreen() ? 'h6' : 'h3' } component="h1" color="primary">
                    {name}
                </Typography>
            </div>
        </div>
    );
}

export default CharacterTopBar;