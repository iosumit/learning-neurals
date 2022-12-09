let mobilenet;
let penguin;

function modelReady() {
    console.log("Model is ready");
    mobilenet.predict(penguin, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        let label = results[0].label;
        let prob = results[0].confidence;
        fill(0);
        textSize(64);
        text(label, 10, height - 100);
        createP(label);
        createP(prob);
    }
}
function imageReady() {
    console.log("Image is ready");
    image(penguin, 0, 0, width, height);
}
function setup() {
    createCanvas(400, 400);
    penguin = createImg("image/penguino.jpg", imageReady);
    penguin.hide();
    background(0);
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}
function draw() {

}