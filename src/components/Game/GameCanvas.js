import React, { Component } from 'react';
import {init, ID} from './js/clientLogic.js'

class GameCanvas extends Component {

    render() {
        init(this.props.image);
        return <canvas id={ID}/>;
    }
}
export default GameCanvas;