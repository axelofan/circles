import React, { Component } from 'react'
import {init} from './js/init.js'
import {getBase64} from './js/fileReader.js'
import './css/materialize.min.css'

class Circles extends Component {
    constructor(props) {
        super(props);
        this.state={image:null};
    }

    imageChange = (e) => getBase64(e.target.files[0],(base64) => this.setState({image:base64}));

    getFile = (e) => document.getElementById('imageInput').click();

    render() { 
        return (
            <div>
            <div className='row' style={{marginTop:'10px'}}>
                <div className='col s12 center-align'>
                    <input type='file' id='imageInput' onChange={this.imageChange} accept='image/*' style={{display:'none'}}/>
                    <a className="btn green lighten-1" onClick={this.getFile}>Выбрать изображение</a>
                </div>
            </div>
            <div className='row' style={{height:'100%'}}>
                <div className='col s12 center-align' id='circlesCanvas'>
                    {init(this.state.image)}
                </div>
            </div>
            </div>
        );
    }
}

export default Circles;