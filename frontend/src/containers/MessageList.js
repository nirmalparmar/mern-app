import React, {Component} from 'react';
import {fetchMessages, removeMessage} from '../store/actions/messages';
import {authUser} from '../store/actions/auth';
import messages from '../store/reducers/messages';
import MessageItem from '../components/MessageItem';
import {connect} from 'react-redux';

class MessageList extends Component {
    componentDidMount(){
        this.props.fetchMessages(this.props.currentUser.user.id);
    }

    render(){
        const {messages, currentUser, removeMessage} = this.props;
        let messagelist = messages.map(m => (
            <MessageItem 
                key ={m._id}
                createAt={m.createdAt}
                text={m.text}
                username={m.user.username}
                userid={m.user._id}
                removeMessage ={removeMessage.bind(this, m._id)}
            />))
        return messagelist;
    }
}

function mapStateToProps(state){
    return{
        currentUser:state.currentUser,
        messages:state.messages
    }
}    

export default connect(mapStateToProps, {authUser, fetchMessages, removeMessage}) (MessageList);