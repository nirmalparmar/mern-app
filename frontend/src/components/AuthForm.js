import React, { Component } from "react";
import Recaptcha from 'react-recaptcha';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileUrl: "",
      isVerified:false,
      error:""
    };
    this.onloadCallback = this.onloadCallback.bind(this);
    this.verifyRecaptcha = this.verifyRecaptcha.bind(this);
  }
  
  handleSubmit = e => {
    e.preventDefault();
    if(this.state.isVerified){
      const authType = this.props.signUp ? "signup" : "signin";
      this.props.onAuth(authType, this.state).then(() => {
        this.props.history.push('/');
      }).catch( ()=>{
        return;
      });
      this.setState({
        email: "",
        username: "",
        password: "",
        profileUrl: "",
        isVerified:false,
        error:""
      });
    }else{
      this.setState({
        error:"Please check Recaptcha"
      })
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onloadCallback(){
    console.log('recaptcha loaded');
    
  }

  verifyRecaptcha(response){
    if(response){
      this.setState({isVerified:true})
      this.setState({error:""})
    }
  }


  render() {
    const { email, username, password, profileUrl } = this.state;
    const { signUp, heading, buttonText, history, errors, removeError } = this.props;

    history.listen(()=>{
      removeError();
    });

    return (
      <div className="container ui">
          
          <form className='ui form auth' onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            {errors.message && <div className='error'>{errors.message}</div>}

            <label  htmlFor="email">E-mail</label>
            <input className='ui fluid input'
              autoComplete="off"
              id="email"
              name="email"
              onChange={this.handleChange}
              type="text"
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input className='ui fluid input'
              autoComplete="off"
              id="password"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={password}
            />
            {signUp && (
              <div>
                <label htmlFor="username">Username</label>
                <input className='ui fluid input'
                  autoComplete="off"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  type="text"
                  value={username}
                />
                <div className='field'>
                    <label htmlFor="image-url">Image URL</label>
                  <input className='ui fluid input'
                    autoComplete="off"
                    id="image-url"
                    name="profileUrl"
                    onChange={this.handleChange}
                    type="text"
                    value={profileUrl}
                  />
                </div>
                
              </div>
            )}
            <div className='Recaptcha'>
              <Recaptcha
                sitekey='6LfeJ8gUAAAAABpja3BAPCmv6bG8z1hWgDbyjKvL'
                render="explicit"
                onloadCallback={this.onloadCallback}
                verifyCallback={this.verifyRecaptcha}
              />
              <p className='error'>{this.state.error}</p>
            </div>
              
              
            <div className='submit-btn'>
              <button className='ui button'
                type="submit"
              >
                {buttonText}
              </button>
            </div>
            
          </form>
            
      </div>
    );
  }
}

export default AuthForm;
