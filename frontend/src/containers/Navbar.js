import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from '../store/actions/auth';
import { Feed, Image, Icon } from 'semantic-ui-react'



class Navbar extends Component {
  logout = e => {
      e.preventDefault();
      this.props.logout();
  }
  render() {
    const {currentUser} = this.props;
    const {username, profileUrl, email} = currentUser.user;
    return (
      <nav >
        <div className='Navbar'>
          {currentUser.isAuthenticated ? (
           <>
           <div className='Username'>
            <Feed>
              <Feed.Event>
                <Feed.Label><Image avatar src={profileUrl} /></Feed.Label>
                <Feed.Content>
                  <Feed.Date content={email} />
                  <Feed.Summary>
                    @{username}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
             </Feed> 
            </div>

            <div> 
              <button onClick={this.logout} className='logout'><Icon name='sign-out'/>Logout</button>
            </div>
          </>  
           ):
           (
             <div className='nav-item'>
               <Link className='ui primary button' to="/signup"><Icon name='signup' />Sign Up</Link>
               <Link className='ui secondary button' to="/signin"><Icon name='sign in' />Log in</Link>
             </div>
           )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(Navbar);
