import { Box, Button, createStyles, Divider, IconButton, makeStyles, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { useHistory } from "react-router-dom";
import { avatar, getIdFromUri } from "../utils";
import CharactersChips from "./characters-chips";
import CreatorsChips from "./creators-chips";
export interface EventDetailProps {
  event: any;
  inModal: boolean;
  nextEvent: Function;
  previousEvent: Function;
}

const useStyles = (inModal) => makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      display: 'flex',
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
    modalContent: {
      margin: theme.spacing(2),
      '& .MuiTypography-body1': {
        maxWidth: inModal ? 300 : '100%',
        display: 'block',
        fontStyle: 'italic',
        margin: `${theme.spacing(2)}px 0`
      }
    }
  }),
);


const EventDetail: React.SFC<EventDetailProps> = ({ event, inModal, nextEvent, previousEvent }) => {
  const classes = useStyles(inModal)();
  const theme = useTheme();
  const history = useHistory();
  const matchesXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = () => matchesSmall || matchesXSmall;
  const getFullYear = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getFullYear();
  }
  const handleDetailsClick = (id) => {
    history.push(`event/${id}`);
  }
  const paperStyles = () => {
    return inModal ? {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5]
    } : {}
  }
  const thumbnailImage = () => {
    const baseStyle = {
      boxShadow: theme.shadows[5]
    }
    if (inModal && isSmallScreen()) {
      return { ...baseStyle, width: 335, height: 375 }
    }
    if (inModal && !isSmallScreen()) {
      return { ...baseStyle, width: 500, height: 'auto' }
    }
    return { ...baseStyle };
  }
  const handleCharacterClick = (character) => {
    const id = getIdFromUri(character.resourceURI);
    history.push(`/character/${id}/details`)
  }
  return (
    <div className={classes.paper}
      style={{
        flexDirection: isSmallScreen() ? 'column' : 'row',
        ...paperStyles()
      }}>
      { inModal && <IconButton
        color="secondary"
        className={classes.buttonLeft}
        onClick={() => nextEvent()}
      >
        <ChevronLeft fontSize="large" />
      </IconButton>
      }
      { inModal && <IconButton
        color="secondary"
        className={classes.buttonRight}
        onClick={() => previousEvent()}
      >
        <ChevronRight fontSize="large" />
      </IconButton>
      }
      <img src={avatar(event.thumbnail)} alt="" style={{ ...thumbnailImage() }} />
      <div className={classes.modalContent}>
        <Typography variant={isSmallScreen() ? 'h6' : 'h3'} component="h2">{event.title}</Typography>
        <Typography variant="body2" component="div" color="primary">
          {getFullYear(event.start)} - {getFullYear(event.end)}
        </Typography>
        <Divider />
        <Typography variant="body1" component="div" color="textSecondary">
          {event.description}
        </Typography>
        <div>
          <Typography variant="subtitle2" component="span" color="primary">
            Event happen previously:
          </Typography>
          <Typography variant="caption" component="span" color="textSecondary">
            <Box component="span" ml={1}>{event.previous.name}</Box>
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" component="span" color="primary">
            Event happen next:
            </Typography>
          <Typography variant="caption" component="span" color="textSecondary">
            <Box component="span" ml={1}>{event.next.name}</Box>
          </Typography>
        </div>
        {
          !inModal && <CharactersChips type="Event" characters={ event.characters } handleCharacterClick={ handleCharacterClick }/>
        }
        {
          !inModal && <CreatorsChips type="Event" creators={ event.creators }  />
        }
        {
          inModal && <Button color="secondary" onClick={() => handleDetailsClick(event.id)}>
            Details
            </Button>
        }
      </div>
    </div>
  );
}

export default EventDetail;