
var brain;
function setup() {
    let nn = new NeuralNetwork(2, 2, 1);
    let inputs = [0, 1];
    let tragets = [1];

    nn.train(inputs, tragets);

    //let output = nn.feedForward(inputs);
    //console.log(output);

}
function draw() {
}