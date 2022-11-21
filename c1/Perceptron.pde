int sign(float n){
  return n<0? -1:1;
}

class Perceptron{
  float[] weights = new float[2];
  
  Perceptron(){
    for(int i=0; i<weights.length; i++){
      weights[i] = random(-1, 1);
    }
  }
  int guess(float[] ip){
    float sum = 0;
    for(int i=0; i<weights.length; i++){
      sum += weights[i] * ip[i];
    }
    int op = sign(sum);
    return op;
  }
}
