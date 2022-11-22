Perceptron brain;
Point[] points = new Point[100];
int trainingIndex = 0;
void setup(){
   size(800, 800);
   brain = new Perceptron();
   
   for(int i=0; i<points.length;i++){
     points[i] = new Point();
   }
   
   
   float[] ip = {-1, 0.5};
   int guess = brain.guess(ip);
  println(guess);
}
void draw(){
  background(255);
  stroke(0);
  line(0, 0, width, height);
  for(Point pt : points){
    pt.show();
  }
  for(Point pt : points){
    float[] inputs = { pt.x,  pt.y};
    if(brain.guess(inputs)==pt.label)
      fill(0,255,0);
    else
      fill(255,0,0);
    noStroke();
    ellipse(pt.x, pt.y, 16, 16);
  }
  Point trainpt = points[trainingIndex];
  float[] inputs = { trainpt.x,  trainpt.y};
  brain.train(inputs,trainpt.label);
  trainingIndex++;
  if(trainingIndex==points.length)
    trainingIndex = 0;
}
void mousePressed(){
  float[] inputs = { mouseX,  mouseY};
  int op = brain.guess(inputs);
  println(op);
}
