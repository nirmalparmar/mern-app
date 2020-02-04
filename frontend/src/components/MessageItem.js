import React from 'react';
// import {Moment} from 'react-moment';
import {Link} from 'react-router-dom';
import {List, Card} from 'semantic-ui-react';
const MessageItem = ({key, createAt, text, userid, username, removeMessage}) => {
    return(
        <div className='message-item'>
            <List divided verticalAlign='middle'>
                <List.Item>
                    <List.Content floated='right'>
                        <i onClick={removeMessage} aria-hidden="true" class="close link icon"></i>
                        {/* <i  aria-hidden="true" class="pencil alternate link icon"></i> */}
                    </List.Content>
                    <List.Content>{text}</List.Content>
                </List.Item>
            </List>
        </div>
    )
}

export default MessageItem;