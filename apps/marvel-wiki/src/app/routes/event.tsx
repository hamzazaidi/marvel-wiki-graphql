import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../components/event-detail';
export interface EventProps {
    events: any[]
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            margin: '0 auto',
            width: '80%'
        },
    }),
);

 
const Event: React.SFC<EventProps> = ({ events }) => {
    const classes = useStyles();
    const { eventId } = useParams();
    const event = events.find(e => e.id === eventId)
    return (
        <div className={ classes.content }>
            <EventDetail event={ event } inModal={false} nextEvent={()=>{}} previousEvent={() => {}}/>
        </div>
    );
}
 
export default Event;