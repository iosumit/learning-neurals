class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    static transpose(m1) {
        let result = new Matrix(m1.cols, m1.rows);
        for (let i = 0; i < m1.rows; i++) {
            for (let j = 0; j < m1.cols; j++) {
                result.data[j][i] = m1.data[i][j];
            }
        }
        return result;
    }
    static multiply(m1, m2) {
        if (m1.cols != m2.rows) {
            console.log("Columns of A must be Rows of B")
            return undefined;
        }
        let a = m1.data;
        let b = m2.data;
        let result = new Matrix(m1.rows, m2.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < m1.cols; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }
    multiply(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }
    print() {
        console.table(this.data);
    }
}
