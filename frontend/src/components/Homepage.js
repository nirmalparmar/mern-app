import React from "react";
import { Link } from "react-router-dom";
import MessageTimeLine from './MessageTimeLine';
import MessageForm from '../containers/MessageForm';
import { createMessage } from "../store/actions/messages";

const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return (
    <div>
      <h4>Sign Up Below</h4>
      <Link to="/signup">
        Click here to Sign up
      </Link>
    </div>
  )}else{
    return(
      <div className='container ui'>
        <div className='msg-form'>
          <MessageForm />
        </div>
        <div className='msg-line'>
          <MessageTimeLine />
        </div>
        
      </div>
    )
  }
  
};

export default Homepage;
