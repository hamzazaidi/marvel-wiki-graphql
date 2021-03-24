import React from "react";
import { Avatar as AvatarImg, makeStyles, Typography } from "@material-ui/core";
import { primaryColor } from "../colors";
import { Avatar } from "@marvel-wiki/api-interfaces";
export interface CharacterTopBarProps {
    name: string;
    thumbnail: Avatar;
}
const useStyles = makeStyles((theme) => ({
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
const CharacterTopBar: React.SFC<CharacterTopBarProps> = ({ name, thumbnail }) => {
    const classes = useStyles();
    const avatar = (thumbnail: Avatar): string =>
    `${thumbnail.path}.${thumbnail.extension}`;
    return (
        <div className={classes.topbar}>
            <AvatarImg
                alt={name}
                src={avatar(thumbnail)}
                className={classes.avatar}
            />
            <Typography align="center" component="h2" color="textPrimary">
                {name}
            </Typography>
        </div>
    );
}
 
export default CharacterTopBar;