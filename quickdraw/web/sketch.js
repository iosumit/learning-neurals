let cats_data;
let trains_data;
let rainbows_data;

let cats_training;
let trains_training;
let rainbows_training;

function preload() {
    cats_data = loadBytes('../data/cat1000.bin');
    trains_data = loadBytes('../data/train1000.bin');
    rainbows_data = loadBytes('../data/rainbow1000.bin');
    console.log(cats_data.length);
}
function setup() {
    createCanvas(280, 280);
    background(0)
    let total = 100;
    for (let n = 0; n < total; n++) {
        let img = createImage(28, 28);
        img.loadPixels();
        let offset = n * 784;
        for (let i = 0; i < 784; i++) {
            let val = 255 - cats_data.bytes[i + offset];
            img.pixels[i * 4 + 0] = val;
            img.pixels[i * 4 + 1] = val;
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;
        }
        img.updatePixels();
        let x = (n % 10) * 28;
        let y = floor(n / 10) * 28;
        image(img, x, y);

    }
}
function draw() {

}