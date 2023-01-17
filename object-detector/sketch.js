let img;
let detector;
let objects = [];

function modelLoaded() {
    console.log('Model Loaded!');
}
function preload() {
    img = loadImage('image/dog-cat.jpg');
    detector = ml5.objectDetector('cocossd', modelLoaded);
}
function gotDetections(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    objects = results;
    console.log(results);
}
function setup() {
    createCanvas(640, 480);
    background(0);
    // console.log(640, 480);
    img.resize(640, 480)
    detector.detect(img, gotDetections);
}
function draw() {
    image(img, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
        const ob = objects[i];
        noFill()

        rect(ob.x, ob.y, ob.width, ob.height);
        stroke(0);
        // strokeWeight(20);
        // point(obj.x + 40, obj.y);
        textSize(16);
        strokeWeight(1);
        text(ob.label, ob.x + 10, ob.y + 20);
    }
}