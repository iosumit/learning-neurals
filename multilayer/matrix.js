class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }

    }

    transpose() {
        let result = new Matrix(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.matrix[j][i] = this.matrix[i][j];
            }
        }
        return result;
    }
    multiply(n) {
        if (n instanceof Matrix) {
            if (this.cols != n.rows) {
                console.log("Columns of A must be Rows of B")
                return undefined;
            }
            let a = this.matrix;
            let b = n.matrix;
            let result = new Matrix(this.rows, n.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.cols; k++) {
                        sum += a[i][k] * b[k][j];
                    }
                    result.matrix[i][j] = sum;
                }
            }
            return result;
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n;
                }
            }
        }

    }
}
