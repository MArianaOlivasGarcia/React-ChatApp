

import { date } from '../helpers/date'

export const MyMessage = ({ message }) => {

    
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ message.mensaje }</p>
                <span className="time_date">{ date( message.createdAt ) }</span>
            </div>
        </div>
    )
}
