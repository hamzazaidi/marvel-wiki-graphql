import { Avatar, Chip, createStyles, Divider, makeStyles, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
export interface CharactersChipsProps {
    characters: {
        available: number;
        items: any[];
    }
    handleCharacterClick: Function,
    type: string
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemList: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    listContainer: {
      marginTop: theme.spacing(3),
      '& .MuiTypography-h4': {
        marginTop: theme.spacing(2),
      },
      '& .MuiTypography-h5': {
        marginTop: theme.spacing(2),
      },
      '& .MuiTypography-h6': {
        marginTop: theme.spacing(2),
      }
    },
  }),
);


const CharactersChips: React.SFC<CharactersChipsProps> = ({ characters, handleCharacterClick, type }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    return (
        <div className={classes.listContainer}>
            <Divider />
            <Typography variant={isSmallScreen() ? 'h6' : 'h5'} component="h2">Other characters involved in the {type}</Typography>
            <div className={classes.itemList}>
                {
                    characters.items.map((character, index) => (
                        <Chip
                            key={index}
                            avatar={<Avatar>{character.name.charAt(0)}</Avatar>}
                            label={character.name}
                            onClick={() => handleCharacterClick(character)}
                            variant="outlined"
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default CharactersChips;