import { Avatar } from "@marvel-wiki/api-interfaces";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { useState } from "react";
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
      flexDirection: 'column'
    },
    gridContiner: {
      columns: '5 200px',
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
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      display: 'flex',
      '& img': {
        width: 500,
        height: 450
      }
    },
    modalContent: {
      margin: theme.spacing(2),
      '& .MuiTypography-body1': {
        maxWidth: 300,
        display: 'inline-block'
      }
    },
    modalContentDesription: {
      
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

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };
  const avatar = (thumbnail: Avatar): string =>
    `${thumbnail.path}.${thumbnail.extension}`;
  return (
    <div>
      {
        !!events.length && <div className={classes.eventHeader}>
          <Typography variant="h3" component="h2">Major events { name } was part of...</Typography>
          <Typography variant="body1" component="h2" color="textSecondary">how this marvel character involved in the event</Typography>
        </div>
      }
      <article className={classes.root}>
        <div className={classes.gridContiner}>
          {
            events.map(event => (
              <div className={classes.panel} key={event.id} onClick={ () => handleOpen(event.id) }>
                <img className={classes.image} src={avatar(event.thumbnail)} alt="" />
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
            <div className={classes.paper}>
              <img src={avatar(selectedEvent.thumbnail)} alt="" />
              <div className={ classes.modalContent }>
                <Typography variant="h3" component="h2">{ selectedEvent.title }</Typography>
                <Typography variant="body1" component="span" color="textSecondary">
                  { selectedEvent.description }
                </Typography>
              </div>
            </div>
          }
        </div>
      </Modal>
    </div>
  );
}

export default EventList;


