//копипаст с доработкой из JsFiddle
class AvgRGB {
    constructor(ctx) {
        this.ctx=ctx;
    }
    
    getAvgRGB(x,y,w,h) {
        const blockSize = 5; // only visit every 5 pixels
        let data;
        let i = 0;
        const rgb = {r:0,g:0,b:0};
        let count = 0;

        data = this.ctx.getImageData(x,y,w,h);

        while (i<data.data.length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
            i += blockSize * 4;
        }
    
        // ~~ used to floor values
        return this.rgbToHex(~~(rgb.r/count), ~~(rgb.g/count), ~~(rgb.b/count));
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    componentToHex(c) {
        const hex = c.toString(16)
        return (hex.length===1) ? '0'+hex : hex;
    }
}

export default AvgRGB;