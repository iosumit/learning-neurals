int act(float val){
  return val<0?0:1;
}
float pixelX(float x){
    return map(x, -1, 1, 0, width);
}
float pixelY(float y){
  return map(y, -1, 1, 0, height);
}
class Neuron{
  float[] weights;
  float lr = 0.01;
  
  Neuron(){
    weights = new float[3];
    for(int i=0; i<weights.length; i++){
      weights[i] = random(-1, 1);
      println(weights[i]);
    }
  }
  int guess(int[] ip){
    float sum = 0;
    for(int i=0; i<weights.length;i++){
      sum += weights[i]*ip[i];
    }
    return act(sum);
  }
  void train(int[] ip, int target){
    int error = target - guess(ip);
    
    for(int i=0; i<weights.length;i++){
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
