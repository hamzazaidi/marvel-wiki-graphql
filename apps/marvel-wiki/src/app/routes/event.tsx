import { useQuery } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../components/event-detail';
import { GET_EVENT_BY_ID } from '../queries';
export interface EventProps {}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            margin: '0 auto',
            width: '80%'
        },
    }),
);

 
const Event: React.SFC<EventProps> = () => {
    const classes = useStyles();
    const { eventId } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
        variables: { id: eventId },
    });
    return (
        <div className={ classes.content }>
            { data && <EventDetail event={ data.event } inModal={false} nextEvent={()=>{}} previousEvent={() => {}}/> }
        </div>
    );
}
 
export default Event;