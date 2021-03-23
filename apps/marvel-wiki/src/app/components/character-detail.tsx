import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHARACTER } from "../queries";
import { Avatar as AvatarImg, makeStyles } from "@material-ui/core";
import { Avatar } from "@marvel-wiki/api-interfaces";
export interface CharacterDetailProps { }
const useStyles = makeStyles((theme) => ({
    topbar: {

    },
    large: {
        width: 200,
        height: 200,
    }
}));

const CharacterDetail: React.SFC<CharacterDetailProps> = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id }
    });
    const avatar = (thumbnail: Avatar): string => `${thumbnail.path}.${thumbnail.extension}`
    return (
        <div>
            {
                data && <div>
                    <div className={classes.topbar}>
                        <AvatarImg alt={ data.character.name } src={ avatar(data.character.thumbnail) } className={classes.large} />
                    </div>
                </div>
            }
        </div>

    );
}

export default CharacterDetail;