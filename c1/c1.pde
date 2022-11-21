Perceptron brain;
Point[] points = new Point[100];

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
    brain.train(inputs,pt.label);
    if(brain.guess(inputs)==pt.label)
      fill(0,255,0);
    else
      fill(255,0,0);
    noStroke();
    ellipse(pt.x, pt.y, 16, 16);
  }
}
