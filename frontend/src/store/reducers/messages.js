import {LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE} from '../actionTypes';

const messages = (state=[], action) => {
    switch(action.type){
        case LOAD_MESSAGES:
            return [...action.messages];
        
        case ADD_MESSAGE:
            return[...state, action.message];

        case REMOVE_MESSAGE:
            return state.filter(message => message._id !== action.id);    

        default:
            return state;    
    }
}

export default messages;