let mobilenet;
let video;
let label;

let speakerButton;
let airpodButton;
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
        classifier.classify(gotResults);
    } else
        console.log(loss);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        label = results[0].label;
        classifier.classify(gotResults);

    }
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    speakerButton = createButton("happy");
    speakerButton.mousePressed(() => {
        classifier.addImage("happy");
    });

    airpodButton = createButton("sad");
    airpodButton.mousePressed(() => {
        classifier.addImage("sad");
    });

    trainButton = createButton("train");
    trainButton.mousePressed(() => {
        classifier.train(whileTraining);
    });
}
function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height - 20);
}