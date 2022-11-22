float f(float x){
  return -0.3 * x - 0.2;
}
class Point{
  float x, y, bias=1;
  int label;
  Point(float x_, float y_){
    x = x_;
    y = y_;
  }
  Point(boolean ismouse){
    x = cartCoX(mouseX);
    y = cartCoX(mouseY);
  }
  Point(){
    x = random(-1, 1);
    y = random(-1, 1);
    float yL = f(x);
    if(y>yL){
      label =1;
    } else 
      label =-1;
  }
  float cartCoX(float i){
    return map(i, 0, width, -1, 1);
  }
  float cartCoY(float i){
    return map(i, 0, height, -1, 1);
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
