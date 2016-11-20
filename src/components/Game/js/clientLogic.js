import _ from 'lodash';

export const ID = 'game'+_.random(10,1000).toString(16);

const backGame = document.createElement('canvas'); 
const backctx = backGame.getContext('2d');

let game, gamectx, circles;

function mouseMove(e) {
    circles.forEach((el) => {if (el.mouseOver(e)) el.split()});
}

export function init(src) {
    circles=[];
    let img = new Image();
    img.src = src;
    img.onload = () => {
        let SIZE = window.innerHeight-70;
        console.log(SIZE);
        let snip = (img.width - img.height)/2;
        game = document.getElementById(ID);
        gamectx=game.getContext('2d');
        game.width = game.height = backGame.width = backGame.height = SIZE;
        game.onmousemove = _.throttle(mouseMove,50);
        gamectx.drawImage(img,snip,0,img.width-2*snip,img.height,0,0,game.width,game.height);
        backctx.drawImage(game,0,0);
        circles.push(new Circle(game.width/2,game.height/2,game.width/2,1).fill());
    }
}

function Circle(x,y,r,i) {

    this.mouseOver = (e) => {
        const _x = e.pageX - game.offsetLeft;
        const _y = e.pageY - game.offsetTop;
        return (Math.sqrt(Math.pow(_x-x,2) + Math.pow(_y-y,2))<=r) ? true : false;
    }

    this.fill = () => {
        gamectx.beginPath();
        gamectx.fillStyle="#ffffff";
        gamectx.fillRect(x-r,y-r,2*r,2*r);
        gamectx.closePath();
        gamectx.arc(x,y,r,2*Math.PI,false);
        gamectx.fillStyle=getAvgRGB(x-r,y-r,2*r,2*r);
        gamectx.fill();
        return this;
    }

    this.push = () => {
        if (i<=7) circles.push(this);
    }

    this.split = () => {
        new Circle(x-0.5*r,y-0.5*r,0.5*r,i+1).fill().push();
        new Circle(x-0.5*r,y+0.5*r,0.5*r,i+1).fill().push();
        new Circle(x+0.5*r,y-0.5*r,0.5*r,i+1).fill().push();
        new Circle(x+0.5*r,y+0.5*r,0.5*r,i+1).fill().push();
        del(circles,this);
    }
}

//копипаст с доработкой из JsFiddle
function getAvgRGB(x,y,w,h) {
    
    const blockSize = 5; // only visit every 5 pixels
    let data;
    let i = 0;
    const rgb = {r:0,g:0,b:0};
    let count = 0;

    data = backctx.getImageData(x,y,w,h);

    while (i<data.data.length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
        i += blockSize * 4;
    }
    
    // ~~ used to floor values
    return rgbToHex(~~(rgb.r/count), ~~(rgb.g/count), ~~(rgb.b/count));
}

function componentToHex(c) {
    const hex = c.toString(16)
    return (hex.length===1) ? '0'+hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function del(arr, obj) {
    if(arr.indexOf(obj)!==-1) arr.splice(arr.indexOf(obj),1);
}