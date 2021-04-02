import { createStyles, makeStyles, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { avatar } from "../util";
export interface EventDetailProps {
    event: any;
}
 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      display: 'flex'
    },
    modalImage: {
      width: 500,
      height: 450
    },
    modalImageSmall: {
      width: 335,
      height: 375
    },
    modalContent: {
      margin: theme.spacing(2),
      '& .MuiTypography-body1': {
        maxWidth: 300,
        display: 'block',
        fontStyle: 'italic',
        margin: `${theme.spacing(2)}px 0`
      }
    }
  }),
);


const EventDetail: React.SFC<EventDetailProps> = ({ event }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = () => matchesSmall || matchesXSmall;
    const getFullYear = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.getFullYear();
    }
    return (
        <div className={classes.paper} style={{ flexDirection: isSmallScreen() ? 'column' : 'row' }}>
        <img src={avatar(event.thumbnail)} alt="" className={isSmallScreen() ? classes.modalImageSmall : classes.modalImage} />
        <div className={classes.modalContent}>
          <Typography variant={isSmallScreen() ? 'h5' : 'h3'} component="h2">{event.title}</Typography>
          <Typography variant="body2" component="div" color="primary">
            {getFullYear(event.start)} - {getFullYear(event.end)}
          </Typography>
          <Typography variant="body1" component="div" color="textSecondary">
            {event.description}
          </Typography>
          <div>
            <Typography variant="subtitle2" component="span" color="primary">
              Event happen previously:
          </Typography>
            <Typography variant="caption" component="span" color="textSecondary">
              {event.previous.name}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" component="span" color="primary">
              Event happen next:
            </Typography>
            <Typography variant="caption" component="span" color="textSecondary">
              {event.next.name}
            </Typography>
          </div>
        </div>
      </div>
    );
}
 
export default EventDetail;