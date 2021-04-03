import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../components/event-detail';
export interface EventProps {
    events: any[]
}
 
const Event: React.SFC<EventProps> = ({ events }) => {
    const { eventId } = useParams();
    const event = events.find(e => e.id === eventId)
    return (
        <div>
            <EventDetail event={ event } inModal={false} />
        </div>
    );
}
 
export default Event;