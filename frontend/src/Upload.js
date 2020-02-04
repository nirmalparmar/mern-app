import React, {Component} from 'react';
import {storage} from './firebase/index';


class Uploader extends Component {
    constructor(props){
        super(props);
        this.state={
            image:''
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleUpload = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            const uploadImg = storage.ref(`images/${image.name}`).put(image);
            uploadImg.on('state_changed',
            (snapshot)=> {
                console.log(snapshot);
            },
            (error) => {
                console.log(error);
            });
        }
    }

    render(){
        return(
            <div>
                <input type='file' onChange={this.handleUpload}></input>
            </div>
        )
    }
}

export default Uploader;