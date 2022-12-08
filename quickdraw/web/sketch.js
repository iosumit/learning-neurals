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
        let inputs = data.map(e => e / 255);
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
        let inputs = data.map(e => e / 255);
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
    let per = correct / testing.length;
    return per;
}
function setup() {
    createCanvas(280, 280);
    background(0);
    prepareData(cats, cats_data, CAT);
    prepareData(trains, trains_data, TRAIN);
    prepareData(rainbows, rainbows_data, RAINBOW);

    nn = new NeuralNetwork(784, 64, 3);

    let training = [];
    training = training.concat(cats.training);
    training = training.concat(rainbows.training);
    training = training.concat(trains.training);

    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(rainbows.testing);
    testing = testing.concat(trains.testing);
    for (let i = 0; i < 6; i++) {
        trainEpoch(training);
        console.log("TRAINING  EPOCH", i + 1);

        console.log("TESTING");
        let score = testAll(testing);
        console.log("Correct : ", score)
    }


    // let total = 100;
    // for (let n = 0; n < total; n++) {
    //     let img = createImage(28, 28);
    //     img.loadPixels();
    //     let offset = n * 784;
    //     for (let i = 0; i < 784; i++) {
    //         let val = 255 - cats_data.bytes[i + offset];
    //         img.pixels[i * 4 + 0] = val;
    //         img.pixels[i * 4 + 1] = val;
    //         img.pixels[i * 4 + 2] = val;
    //         img.pixels[i * 4 + 3] = 255;
    //     }
    //     img.updatePixels();
    //     let x = (n % 10) * 28;
    //     let y = floor(n / 10) * 28;
    //     image(img, x, y);

    // }
}
function draw() {

}