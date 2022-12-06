function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function dsigmoid(y) {
    return y * (1 - y);
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        this.weight_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weight_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weight_ih.randomize();
        this.weight_ho.randomize();
        this.bais_h = new Matrix(this.hidden_nodes, 1);
        this.bais_o = new Matrix(this.output_nodes, 1);
        this.bais_h.randomize();
        this.bais_o.randomize();
        this.learning_rate = 0.1;
    }
    feedForward(input_arr) {
        // Hidden Outputs
        let inputs = Matrix.fromArray(input_arr);
        let hidden = Matrix.multiply(this.weight_ih, inputs);
        hidden.add(this.bais_h);
        hidden.map(sigmoid);

        // Output Layer
        let outputs = Matrix.multiply(this.weight_ho, hidden);
        outputs.add(this.bais_o);
        outputs.map(sigmoid);
        return outputs.toArray();
    }
    train(inputs_arr, targets_arr) {
        // Hidden Outputs
        let inputs = Matrix.fromArray(inputs_arr);
        let hidden = Matrix.multiply(this.weight_ih, inputs);
        hidden.add(this.bais_h);
        hidden.map(sigmoid);

        // Output Layer
        let outputs = Matrix.multiply(this.weight_ho, hidden);
        outputs.add(this.bais_o);
        outputs.map(sigmoid);

        let targets = Matrix.fromArray(targets_arr);

        // ERROR = TARGET - OUTPUTS
        let output_error = Matrix.subtract(targets, outputs);

        // delta Wo
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_error);
        gradients.multiply(this.learning_rate);

        let hidden_t = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_t);

        this.weight_ho.add(weight_ho_deltas);
        this.bais_o.add(gradients);

        // Hidden Layer errors
        let who_t = Matrix.transpose(this.weight_ho);
        let hidden_errors = Matrix.multiply(who_t, output_error);

        // Hidden Gradient delta Wh
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        this.weight_ih.add(weights_ih_deltas);
        this.bais_h.add(hidden_gradient);
    }
} 
