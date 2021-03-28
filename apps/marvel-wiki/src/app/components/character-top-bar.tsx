import React from "react";
import { Avatar as AvatarImg, makeStyles, Typography } from "@material-ui/core";
import { primaryColor } from "../colors";
import { Avatar } from "@marvel-wiki/api-interfaces";
import Banner from '../../assets/marvel_banner.jpeg';
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
    },
    background: {
        backgroundImage: `url(${Banner})`,
        height: 250,
        filter: 'grayscale(.7)'
    },
    profile: {
        position: 'absolute',
        bottom: '-38%',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    avatar: {
        alignSelf: "center",
        width: 300,
        height: 300,
    },
}));
const CharacterTopBar: React.SFC<CharacterTopBarProps> = ({ name, thumbnail }) => {
    const classes = useStyles();
    const avatar = (thumbnail: Avatar): string =>
        `${thumbnail.path}.${thumbnail.extension}`;
    return (
        <div className={classes.topbar}>
            <div className={classes.background}></div>
            <div className={classes.profile}>
                <AvatarImg
                    alt={name}
                    src={avatar(thumbnail)}
                    className={classes.avatar}
                />
                <Typography align="center" component="h2" color="textPrimary">
                    {name}
                </Typography>
            </div>
        </div>
    );
}

export default CharacterTopBar;