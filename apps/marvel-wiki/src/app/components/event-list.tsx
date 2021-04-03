import {createStyles, makeStyles, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState } from "react";
import { avatar } from "../utils";
import EventDetail from "./event-detail";
export interface EventListProps {
  events: any[];
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    gridContiner: {
      columns: '7 200px',
      columnGap: '1.5rem',
      margin: `0 ${theme.spacing(5)}px`
    },
    eventHeader: {
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(1)
    },
    panel: {
      margin: '0 1.5rem 1.5rem 0',
      display: 'inline-block',
      width: '100%',
      border: '2px solid black',
      padding: 5,
      boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
      transition: 'all .25s ease-in-out'
    },
    image: {
      width: '100%',
    },
    paragraph: {
      margin: '5px 0',
      padding: 0,
      textAlign: 'center',
      fontStyle: 'italic'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),
);

const EventList: React.SFC<EventListProps> = ({ events, name }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedEvent(events.find(e => e.id === id))
  };
  const theme = useTheme();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };
  const isSmallScreen = () => matchesSmall || matchesXSmall;
  const nextEvent = () => {
    const index = events.indexOf(selectedEvent);
    const newEvent = events[index + 1];
    if(newEvent) {
      setSelectedEvent(newEvent);
    } else {
      setSelectedEvent(events[0]);
    }
  }
  const previousEvent = () => {
    const index = events.indexOf(selectedEvent);
    const newEvent = events[index - 1];
    if(newEvent) {
      setSelectedEvent(newEvent);
    } else {
      setSelectedEvent(events[events.length - 1]);
    }
  }
  return (
    <div>
      {
        !!events.length && <div className={classes.eventHeader}>
          <Typography variant={isSmallScreen() ? 'h5' : 'h3'} component="h2">
            Major events <Typography variant={isSmallScreen() ? 'h5' : 'h3'} component="span" color="textSecondary">{name}</Typography> was part of...
          </Typography>
          <Typography variant="body1" component="h2" color="textSecondary">how this marvel character involved in the event</Typography>
        </div>
      }
      <article className={classes.root}>
        <div className={classes.gridContiner} style={{ columnWidth: isSmallScreen() ? '100px' : '200px' }}>
          {
            events.map(event => (
              <div className={classes.panel} key={event.id} onClick={() => handleOpen(event.id)}>
                <img
                  className={classes.image}
                  src={avatar(event.thumbnail)}
                  alt=""
                />
                <p className={classes.paragraph}>{event.title}</p>
              </div>
            ))
          }
        </div>
      </article>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          { 
            selectedEvent && 
              <EventDetail 
                event={ selectedEvent } 
                inModal={ true }
                nextEvent={ nextEvent }
                previousEvent={ previousEvent }
              /> 
          }
        </div>
      </Modal>
    </div>
  );
}

export default EventList;


