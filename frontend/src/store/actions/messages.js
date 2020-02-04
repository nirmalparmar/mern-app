import {apiCall} from '../../services/api';
import {addError} from '../actions/error';
import {LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE} from '../actionTypes';

export const loadMessages = messages => {
    return {
        type:LOAD_MESSAGES,
        messages
    };
}

export const addMessage = message => {
    return{
        type:ADD_MESSAGE,
        message
    };
}

export const remove = id => {
    return{
        type:REMOVE_MESSAGE,
        id
    };
}

export function fetchMessages(id){
    return dispatch => {
        let url = `http://localhost:3001/api/user/${id}/messages`
        apiCall('get', url).then(res=>
            dispatch(loadMessages(res))).catch(err => dispatch(addError(err.message)))
    }
}

export const postNewMessage = text => (dispatch, getState) => {
        let {currentUser} = getState();
        let url = `http://localhost:3001/api/user/${currentUser.user.id}/message`
        apiCall('post', url, {text}).then(res=>
            dispatch(addMessage(res))).catch(err => dispatch(addError(err.message)))
    }

export const removeMessage = message_id => dispatch => {
    console.log(message_id);
    let url =`http://localhost:3001/api/message/${message_id}`;
    apiCall('delete', url).then(res => 
        dispatch(remove(res._id))).catch(err => dispatch(addError(err.messages)))
}