import React, {Component} from 'react';
import {postNewMessage} from '../store/actions/messages';
import { connect } from 'react-redux';

class MessageForm extends Component{
    constructor(props){
        super(props);
        this.state={
            message:""
        }
    }

    handleNewMessage = e =>{
        e.preventDefault();
        console.log(this.state.message);
        this.props.postNewMessage(this.state.message);
        this.setState({message:""});
    }

    render(){
        return(
            <form className='ui fluid form' onSubmit={this.handleNewMessage}>
                {this.props.error && 
                <div className="error">
                    {this.props.error.message}
                </div>}
                <div className='inline fields'>
                    <input className='ui input' value={this.state.message} onChange={e => this.setState({message:e.target.value})} />
                    <button type='submit' className='msg-btn'><i aria-hidden="true" className="add link icon"></i></button>
                </div>
            </form>

        )
    }
}

function mapStateToProps (state) {
    return {
        error:state.error,
    }
}

export default connect(mapStateToProps, {postNewMessage}) (MessageForm);