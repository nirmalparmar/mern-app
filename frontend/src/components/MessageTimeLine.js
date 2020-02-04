import React from 'react';
import MessageList from '../containers/MessageList';
import {List} from 'semantic-ui-react';


const MessageTimeLine = props => {
    return(
        <List divided verticalAlign='middle'>
            <MessageList />
        </List>
    );
}

export default MessageTimeLine;
