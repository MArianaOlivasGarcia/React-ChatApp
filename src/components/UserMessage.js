


import { date } from '../helpers/date'

export const UserMessage = ({ message }) => {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://digitalmgs.com/foro/ext/dark1/memberavatarstatus/image/avatar.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ message.mensaje }</p>
                    <span className="time_date">{ date( message.createdAt ) }</span>
                </div>
            </div>
        </div>
    )
}
