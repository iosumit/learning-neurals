
var brain;
function setup() {
    let nn = new NeuralNetwork(2, 2, 1);
    let input = [0, 1];
    let output = nn.feedForward(input);
    console.log(output);

}
function draw() {
}