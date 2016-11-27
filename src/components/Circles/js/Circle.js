let ctx;
let avgRgb;
export const circles = [];

export function initCircle(_ctx,_avgRgb) {
    ctx = _ctx;
    avgRgb = _avgRgb;
}

export function Circle(x,y,r) {

    this.mouseOver = (_x,_y) => (Math.sqrt(Math.pow(_x-x,2) + Math.pow(_y-y,2))<=r);

    this.fill = () => {
        ctx.beginPath();
        ctx.fillStyle="#ffffff";
        ctx.fillRect(x-r,y-r,2*r,2*r);
        ctx.closePath();
        ctx.arc(x,y,r,2*Math.PI,false);
        ctx.fillStyle=avgRgb.getAvgRGB(x-r,y-r,2*r,2*r);
        ctx.fill();
        return this;
    }

    this.push = () => {
        if (2*r>10) circles.push(this);
    }

    this.split = () => {
        new Circle(x-0.5*r,y-0.5*r,0.5*r).fill().push();
        new Circle(x-0.5*r,y+0.5*r,0.5*r).fill().push();
        new Circle(x+0.5*r,y-0.5*r,0.5*r).fill().push();
        new Circle(x+0.5*r,y+0.5*r,0.5*r).fill().push();
        del(circles,this);
    }
}

function del(arr, obj) {
    if(arr.indexOf(obj)!==-1) arr.splice(arr.indexOf(obj),1);
}