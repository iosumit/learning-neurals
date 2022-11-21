int sign(float n){
  return n<0? -1:1;
}
 
class Perceptron{
  float[] weights = new float[2];
  float lr = 0.1;
  
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
  void train(float[] ip, int target){
    int guess = guess(ip);
    int error = target - guess;
    for(int i=0; i<weights.length; i++){
      weights[i] += error * lr * ip[i];
    }
  }
}
