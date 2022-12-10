let video;
let detector;
let objects = [];

function modelLoaded() {
    console.log('Model Loaded!');
}
function preload() {
    detector = ml5.objectDetector('cocossd', modelLoaded);
}
function gotDetections(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    objects = results;
    detector.detect(video, gotDetections);
}
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    // background(0);

    detector.detect(video, gotDetections);
}
function draw() {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
        const ob = objects[i];
        noFill();
        stroke(0, 255, 0);
        rect(ob.x, ob.y, ob.width, ob.height);
        stroke(255);
        textSize(16);
        strokeWeight(1);
        text(ob.label, ob.x + 10, ob.y + 20);
    }
}