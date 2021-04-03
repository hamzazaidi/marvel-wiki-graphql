import { Avatar, Button, Card, CardContent, Chip, createStyles, Divider, List, ListItem, ListItemText, makeStyles, Theme, Tooltip, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { avatar, getIdFromUri } from "../utils";
export interface EventDetailProps {
  event: any;
  inModal: boolean
}

const useStyles = (inModal) => makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex'
    },
    modalContent: {
      margin: theme.spacing(2),
      '& .MuiTypography-body1': {
        maxWidth: inModal ? 300 : '100%',
        display: 'block',
        fontStyle: 'italic',
        margin: `${theme.spacing(2)}px 0`
      }
    },
    itemList: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(2),
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


const EventDetail: React.SFC<EventDetailProps> = ({ event, inModal }) => {
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
      <img src={avatar(event.thumbnail)} alt="" style={{ ...thumbnailImage() }} />
      <div className={classes.modalContent}>
        <Typography variant={isSmallScreen() ? 'h5' : 'h3'} component="h2">{event.title}</Typography>
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
        {
          !inModal &&
          <div className={classes.listContainer}>
            <Divider />
            <Typography variant={isSmallScreen() ? 'h5' : 'h4'} component="h2">Other characters involved in the event</Typography>
            <div className={classes.itemList}>
              {
                event.characters.items.map((character, index) => (
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
        }
        {
          !inModal &&
          <div className={classes.listContainer}>
            <Divider />
            <Typography variant="h6" component="h2" color="textSecondary">Creator's of events</Typography>
            <div className={classes.itemList}>
              {
                event.creators.items.map((creator, index) => (
                  <Tooltip title={ creator.role } key={index}>
                    <Chip variant="outlined" size="small" label={creator.name} />
                  </Tooltip>
                ))
              }
            </div>
          </div>
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