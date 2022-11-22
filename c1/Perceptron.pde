int sign(float n){
  return n<0? -1:1;
}
 
class Perceptron{
  float[] weights;
  float lr = 0.01;
  
  Perceptron(int n){
    weights = new float[n];
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
  void train(float[] ip, int target){
    int guess = guess(ip);
    int error = target - guess;
    for(int i=0; i<weights.length; i++){
      weights[i] += error * lr * ip[i];
    }
  }
  float guessY(float x){
    // w0.x + w1.y + w2.b = 0;
    // w1.y  = - w0.x - w2.b
    // y =  - (w0.x + w2.b)/w1;
    float w0 = weights[0];
    float w1 = weights[1];
    float w2 = weights[2];
    
    return -(w0*x+w2)/w1;
  }
}
