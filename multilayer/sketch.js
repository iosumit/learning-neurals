
var brain;
function setup() {
    let a = new Matrix(2, 3);
    let b = new Matrix(3, 2);
    a.randomize();
    // console.table(a.data);
    // console.table(a.transpose().data);
    b.randomize();
    a.print();
    b.print();
    // a.multiply(2)
    let m3 = Matrix.multiply(a, b);
    m3.print();
    let m4 = Matrix.transpose(m3)
    m4.print()

    // a.print()

    // console.table(a.matrix);
    // console.table(b.matrix);
    // console.table(a.multiply(b).matrix);
    // createCanvas(400, 400);

}
function draw() {
}