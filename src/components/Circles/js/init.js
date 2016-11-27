import _ from 'lodash';
import AvgRGB from './AvgRGB.js'
import {Circle, circles, initCircle} from './Circle.js'

const back = document.createElement('canvas');
const front = document.createElement('canvas');

const fctx = front.getContext('2d');
const bctx = back.getContext('2d');
const avgRgb = new AvgRGB(bctx);
initCircle(fctx,avgRgb);

function mouseMove(e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    circles.forEach((el) => {if (el.mouseOver(x,y)) el.split()});
}
front.onmousemove = _.throttle(mouseMove,50);

export function init(src) {
    front.width = front.height = back.width = back.height = window.innerHeight-70;
    circles.length=0;
    const img = new Image();
    img.src = src;
    img.onload = () => {
        const snip = (img.width - img.height)/2;
        fctx.drawImage(img,snip,0,img.width-2*snip,img.height,0,0,front.width,front.height);
        bctx.drawImage(front,0,0);
        circles.push(new Circle(front.width/2,front.height/2,front.width/2).fill());
        document.getElementById('circlesCanvas').appendChild(front);
    }
}