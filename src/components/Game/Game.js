import React, { Component } from 'react'
import _ from 'lodash'
import GameCanvas from './GameCanvas.js'
import {getBase64} from './js/fileReader.js'
import './css/materialize.min.css'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state={image:null};
        this.fileId = 'file_'+_.random(10,1000).toString(16);
    }

    imageChange = (e) => {
        getBase64(e.target.files[0],(base64) => {
            this.setState({image:base64});
        });
    }

    getFile = (e) => {
        document.getElementById(this.fileId).click();
    }

    renderGame() {
        if (this.state.image) {
            return <GameCanvas image={this.state.image}/>
        }
    }

    render() { 
        return (
            <div>
            <div className='row' style={{marginTop:'10px'}}>
                <div className='col s12 center-align'>
                    <input type='file' id={this.fileId} onChange={this.imageChange} accept='image/*' style={{display:'none'}}/>
                    <a className="waves-effect waves-light btn green lighten-1" onClick={this.getFile}>Выбрать изображение</a>
                </div>
            </div>
            <div className='row' style={{height:'100%'}}>
                <div className='col s12 center-align'>
                    {this.renderGame()}
                </div>
            </div>
            </div>
        );
    }
}

export default Game;