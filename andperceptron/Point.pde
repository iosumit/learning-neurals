class Point{
  int x;
  int y;
  int bais = 1;
  int label;
  
  Point(int x, int y){
    this.x = x;
    this.y = y;
    label = x&y;
  }
  int coX(){
   return x==1?width-20:20;
  }
  int coY(){
   return y==1?height-20:20;
  }
  
  Point(){
    x = round(random(1));
    y = round(random(1));
    label = x&y;
  }
  void show(){
    stroke(0);
    if(label==1)
      fill(255);
    else
      fill(0);
      
    ellipse(coX(), coY(), 32, 32);
  }
}
