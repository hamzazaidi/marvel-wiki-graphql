import { Avatar } from "@marvel-wiki/api-interfaces";
import { createStyles, GridList, GridListTile, makeStyles, Theme } from "@material-ui/core";
import React from "react";
export interface EventListProps {
  events: any[];
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
      width: '90%',
      margin: '0 auto'
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
    }
  }),
);

const EventList: React.SFC<EventListProps> = ({ events }) => {
  const classes = useStyles();
  const avatar = (thumbnail: Avatar): string =>
    `${thumbnail.path}.${thumbnail.extension}`;
  return (
    <article className={classes.root}>
      <div className={ classes.gridContiner }>
        {
          events.map(event => (
            <div className={classes.panel} key={event.id}>
              <img className={ classes.image } src={ avatar(event.thumbnail) } alt=""/>
              <p className={ classes.paragraph }>{ event.title }</p>
            </div>
          ))
        }
      </div>
    </article>
  );
}

export default EventList;



{/* <article className={classes.comic}>
      <div className={classes.panel}>
        <p className={`${classes.text} ${classes.topLeft}`}>Suddenly...</p>
        <p className={`${classes.text} ${classes.bottomRight}`}>...something amazing happened</p>
      </div>
      <div className={classes.panel}>
        <p className={`${classes.text} ${classes.topLeft}`}>Try resizing...</p>
        <p className={`${classes.text} ${classes.bottomRight}`}>...it's responsive</p>
      </div>
      <div className={classes.panel}>
        <p className={ classes.speech }>A speech bubble</p>
      </div>
      <div className={classes.panel}></div>
      <div className={classes.panel}></div>
      <div className={classes.panel}></div>
      <div className={classes.panel}></div>
      <div className={classes.panel}></div>
      <div className={classes.panel}>
        <p className={`${classes.text} ${classes.bottomRight}`}>THE END</p>
      </div>
    </article> */}