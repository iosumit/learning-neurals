
var brain;
function setup() {
    let a = new Matrix(2, 3);
    let b = new Matrix(3, 2);
    a.randomize();
    console.table(a.matrix);
    console.table(a.transpose().matrix);
    // b.randomize();
    // console.table(a.matrix);
    // console.table(b.matrix);
    // console.table(a.multiply(b).matrix);
    // createCanvas(400, 400);

}
function draw() {
}