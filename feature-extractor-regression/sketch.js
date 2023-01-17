let mobilenet;
let video;
let label;
let predictor;

let slider;
let addImageButton;
let trainButton;

function modelReady() {
    console.log("Model is ready");
}
function videoReady() {
    console.log("Video is ready");
}
function whileTraining(loss) {
    if (loss == null) {
        console.log("Traing Complete");
        predictor.predict(gotResults);
    } else
        console.log(loss);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results.value);
        label = results.value;
        predictor.predict(gotResults);

    }
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    predictor = mobilenet.regression(video, videoReady);

    slider = createSlider(0, 1, 0.5, 0.01);
    slider.input(() => {
        console.log(slider.value());
    })
    addImageButton = createButton("Add to Train Set");
    addImageButton.mousePressed(() => {
        predictor.addImage(slider.value());
    });

    trainButton = createButton("train");
    trainButton.mousePressed(() => {
        predictor.train(whileTraining);
    });
}
function draw() {
    background(0);
    image(video, 0, 0);
    rectMode(CENTER);
    fill(255, 0, 200);
    rect(label * width, height / 2, 50, 50)
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}