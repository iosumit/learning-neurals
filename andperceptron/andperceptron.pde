Point[] points = new Point[4];
Neuron brain;
void setup(){
  size(300, 300);
  points[0] = new Point(1, 1);
  points[1] = new Point(1, 0);
  points[2] = new Point(0, 1);
  points[3] = new Point(0, 0);
  
  brain = new Neuron();
  int[] ip = {1, 1, 1};
  int x = brain.guess(ip);
  println(x);
  
} 
void draw(){
  background(255);
  for(int i=0; i<points.length; i++){
    points[i].show();
  }
  for(int i=0; i<points.length; i++){
    int[] ip = {points[i].x, points[i].y, points[i].bais};
    int guess = brain.guess(ip);
    noStroke();
    if(guess==points[i].label)
      fill(0,255,0);
    else
      fill(255,0,0);
    
    ellipse(points[i].coX(), points[i].coY(), 16, 16);
  }
  stroke(0);
  //line(pixelX(-1), pixelY(brain.guessY(-1)), 
  //  pixelX(1), pixelY(brain.guessY(1)));
  //brain.train()
  for(int i=0; i<points.length; i++){
    int[] ip = {points[i].x, points[i].y, points[i].bais};
    brain.train(ip, points[i].label);
  }
}
void mousePressed(){
  //for(int i=0; i<points.length; i++){
  //  int[] ip = {points[i].x, points[i].y, points[i].bais};
  //  brain.train(ip, points[i].label);
  //}
  //print(1+" "+brain.guessY(1));
  int x = mouseX>width/2?1:0;
  int y = mouseY>height/2?1:0;
  int[] inputs = { x,  y, 1};
  int op = brain.guess(inputs);
  println(op);
}
