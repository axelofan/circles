export function getBase64(file,cb) {
    var reader = new FileReader();
        reader.onload = (ev) => cb(ev.target.result);
        reader.readAsDataURL(file);
}