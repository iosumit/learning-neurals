const len = 784;
const total_data = 1000;
let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let nn;

function preload() {
    cats_data = loadBytes('../data/cat1000.bin');
    trains_data = loadBytes('../data/train1000.bin');
    rainbows_data = loadBytes('../data/rainbow1000.bin');
    console.log(cats_data.length);
}
function prepareData(categories, data, label) {
    categories.training = [];
    categories.testing = [];
    for (let i = 0; i < total_data; i++) {
        let offset = i * len;
        let threshold = floor(0.8 * total_data);
        if (i < threshold) {
            categories.training[i] = data.bytes.subarray(offset, offset + len);
            categories.training[i].label = label;
        } else {
            categories.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
            categories.testing[i - threshold].label = label;
        }
    }
}
function trainEpoch(training) {
    shuffle(training, true);
    for (let i = 0; i < training.length; i++) {
        let data = training[i];
        let inputs = Array.from(data).map(e => e / 255);
        let label = training[i].label;
        let targets = [0, 0, 0];
        targets[label] = 1;
        nn.train(inputs, targets);
    }
}
function testAll(testing) {
    let correct = 0;
    for (let i = 0; i < testing.length; i++) {
        let data = testing[i];
        let inputs = Array.from(data).map(e => e / 255);
        let label = testing[i].label;
        let targets = [0, 0, 0];
        targets[label] = 1;
        let guess = nn.predict(inputs);
        let m = max(guess);
        let classfication = guess.indexOf(m);
        // console.log(guess);
        // console.log(classfication);
        // console.log(label);
        if (label === classfication)
            correct++;
    }
    let per = 100 * correct / testing.length;
    return per;
}
function setup() {
    createCanvas(280, 280);
    background(255);
    prepareData(cats, cats_data, CAT);
    prepareData(trains, trains_data, TRAIN);
    prepareData(rainbows, rainbows_data, RAINBOW);

    nn = new NeuralNetwork(784, 64, 3);
    // 88.33 % 784, 64, 3
    // fetch('../data/model.json').then((res) => {
    //     return res.json()
    // }).then((data) => {
    //     nn = NeuralNetwork.deserialize(data);
    // });
    // nn.setLearningRate(0.01)


    let training = [];
    training = training.concat(cats.training);
    training = training.concat(rainbows.training);
    training = training.concat(trains.training);

    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(rainbows.testing);
    testing = testing.concat(trains.testing);

    let epochCounter = 0;
    let trainButton = select("#train");
    trainButton.mousePressed(() => {
        let lr = parseFloat(select("#learningrate").value());
        nn.setLearningRate(lr);
        trainEpoch(training);
        epochCounter++;
        console.log("TRAINING  EPOCH", epochCounter);
    });
    let testButton = select("#test");
    testButton.mousePressed(() => {
        let score = testAll(testing);
        console.log("Percent : ", nf(score, 2, 2) + "%")
    })

    let clearButton = select("#clearB");
    clearButton.mousePressed(() => {
        background(255);
    })

    let guessButton = select("#guess");
    guessButton.mousePressed(() => {
        let inputs = [];
        let img = get();
        img.resize(28, 28);
        img.loadPixels();
        // console.log(img);
        // img.pixels.length => 3136 RGBA
        for (let i = 0; i < len; i++) {
            let brightness = 255 - img.pixels[i * 4];
            inputs[i] = brightness / 255;
        }
        let guess = nn.predict(inputs);
        let m = max(guess);
        let classfication = guess.indexOf(m);
        if (classfication === CAT) {
            print("CAT");
        } else if (classfication === TRAIN) {
            print("TRAIN");
        } else {
            print("RAINBOW");
        }
        //image(img, 0, 0);
    })
}
function draw() {
    strokeWeight(16);
    stroke(0);
    if (mouseIsPressed)
        line(pmouseX, pmouseY, mouseX, mouseY);
}