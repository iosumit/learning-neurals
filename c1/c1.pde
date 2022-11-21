Perceptron p;
void setup(){
  size(200, 200);
  p = new Perceptron();
  float[] ip = {-1, 0.5};
  int guess = p.guess(ip);
  println(guess);
}
void loop(){
  
}
