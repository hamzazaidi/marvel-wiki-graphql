import { Chip, createStyles, Divider, makeStyles, Theme, Tooltip, Typography } from "@material-ui/core";
import React from "react";
export interface CreatorsChipsProps {
    creators: {
        available: number;
        items: any[];
    }
    type:string
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

 
const CreatorsChips: React.SFC<CreatorsChipsProps> = ({ creators, type }) => {
    const classes = useStyles();
    return (
        <div className={classes.listContainer}>
            <Divider />
            <Typography variant="h6" component="h2" color="textSecondary">Creator's of {type}</Typography>
            <div className={classes.itemList}>
            {
                creators.items.map((creator, index) => (
                <Tooltip title={creator.role} key={index}>
                    <Chip variant="outlined" size="small" label={creator.name} />
                </Tooltip>
                ))
            }
            </div>
        </div>
    );
}
 
export default CreatorsChips;