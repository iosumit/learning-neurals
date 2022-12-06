let r;
let g;
let b;
let brain;
let which = "black";
function pickColor() {
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}
function setup() {
    createCanvas(640, 360);
    brain = new NeuralNetwork(3, 4, 2);
    // brain = NeuralNetwork.deserialize(ss);
    for (let i = 0; i < 10000; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        let targets = trainColor(r, g, b);
        let inputs = [r / 255, g / 255, b / 255];
        brain.train(inputs, targets);
    }

    pickColor();
    noLoop();
}
function mousePressed() {
    // let targets;
    // if (mouseX > width / 2) {
    //     targets = [0, 1];
    // } else {
    //     targets = [1, 0];
    // }
    // console.log(targets);
    // let inputs = [r / 255, g / 255, b / 255];
    // brain.train(inputs, targets);
    pickColor();
}

function colorPredictor(r, g, b) {
    console.log(floor(r + g + b));
    let inputs = [r / 255, g / 255, b / 255];
    let outputs = brain.predict(inputs);
    // console.log(outputs);

    if (outputs[0] > outputs[1])
        return "black";
    return "white";

}
function trainColor(r, g, b) {
    if (r + g + b > 500) {
        return [1, 0];
    }
    return [0, 1];
}

function draw() {
    background(r, g, b);
    strokeWeight(4);
    stroke(0);
    line(width / 2, 0, width / 2, height);

    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    text("black", 200, 100);
    fill(255);
    text("white", 450, 100);
    which = colorPredictor(r, g, b);
    if (which == "black") {
        fill(0);
        ellipse(200, 200, 60);
    } else {
        fill(255);
        ellipse(450, 200, 60);
    }
}
let ss = '{"input_nodes":3,"hidden_nodes":3,"output_nodes":2,"weights_ih":{"rows":3,"cols":3,"data":[[-0.556673026441648,0.8750888633502922,-0.6623057652403133],[-0.2851034942791854,-0.5802972108390749,-0.9443509844892392],[-0.4305070246649826,-0.7347545348284461,0.410444285517221]]},"weights_ho":{"rows":2,"cols":3,"data":[[0.8555676173785044,-0.4434169824391551,-0.19375075119987215],[0.7505232860878192,-0.7170105045362312,1.0117689484946424]]},"bias_h":{"rows":3,"cols":1,"data":[[0.08958248481469447],[-0.736804251895878],[0.5332519308938195]]},"bias_o":{"rows":2,"cols":1,"data":[[-0.5805806737885747],[-0.4422501668139081]]},"learning_rate":0.1,"activation_function":{}}';