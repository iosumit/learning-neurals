class Point{
  float x, y;
  int label;
  Point(){
    x = random(-1, 1);
    y = random(-1, 1);
    if(x>y){
      label =1;
    } else 
      label =-1;
  }
  float pixelX(){
    return map(x, -1, 1, 0, width);
  }
  float pixelY(){
    return map(y, -1, 1, height, 0);
  }
  void show(){
    stroke(0);
    if(label==1){
      fill(255);
    } else {
      fill(0);
    }
    float px = pixelX();
    float py = pixelY();
    ellipse(px, py, 32, 32);
  }
}
