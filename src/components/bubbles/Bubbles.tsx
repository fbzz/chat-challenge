import React from 'react';
import './Bubbles.scss';
import moment from 'moment';
export interface BubblesProps {
    message: string;
    sender?: string;
    date?: string;
    dateFormat?: number
}


const formatDate = (date: any, format?: any) => {
    console.log(format);
    if (format === 0) {
        return moment(date).format('hh:mm')
    }
    return moment(date).format('HH:mm')
}

/**
 * This components is responsible to render chat messages on the screen
 * Based on sender it will be colored
 * @param message
 * @param sender
 * @param date 
 */

const Bubbles: React.FC<BubblesProps> = ({ message, sender, date, dateFormat }) => {
    return (
        <div className={!sender ? 'from-me' : 'from-they'}>
            {sender ? (<div className='user'>  {sender} on {formatDate(date, dateFormat)}</div>) : <div className='user'>  You on {formatDate(date, dateFormat)}</div>}

            <div className="fill animated fadeInLeft" >
                <div className="message-padding">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default Bubbles;
