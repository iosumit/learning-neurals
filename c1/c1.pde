Perceptron brain;
Point[] points = new Point[100];
int trainingIndex = 0;
void setup(){
   size(800, 800);
   brain = new Perceptron(3);
   
   for(int i=0; i<points.length;i++){
     points[i] = new Point();
   }
  
}
void draw(){
  background(255);
  stroke(0);
  
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  Point p3 = new Point(-1, brain.guessY(-1));
  Point p4 = new Point(1, brain.guessY(1));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());
  
  //stroke(0, 0, 255);
  //line(0, height, width, 0);
  
  for(Point pt : points){
    pt.show();
  }
  for(Point pt : points){
    float[] inputs = { pt.x,  pt.y, pt.bias};
    if(brain.guess(inputs)==pt.label)
      fill(0,255,0);
    else
      fill(255,0,0);
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 16, 16);
  }
  Point trainpt = points[trainingIndex];
  float[] inputs = { trainpt.x,  trainpt.y, trainpt.bias};
  brain.train(inputs,trainpt.label);
  trainingIndex++;
  if(trainingIndex==points.length)
    trainingIndex = 0;
}
void mousePressed(){
  Point pt = new Point(true);
  float[] inputs = { pt.x,  pt.y, pt.bias};
  int op = brain.guess(inputs);
  println(op);
}
