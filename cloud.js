class Cloud {
  constructor(_xPos, _yPos, _rotation, _size){
    this.xPos = _xPos;
    this.yPos = _yPos;
    this.rotation = _rotation;
    this.size = _size;

  }

  display(){
    fill(100);

    push();
    noStroke();
    translate(this.xPos, this.yPos);
    // rotate(this.rotation);
    scale(this.size)
    circle(10, 40, 70);
    circle(40, 60, 50);
    circle(40, 20, 40);
    circle(70,20, 50);
    circle(70, 50, 50);
    circle(100, 40, 40);
    pop()

  }

  move(){
    if (this.yPos <= height * 1.3){
    this.yPos +=2;
    } else {
      this.yPos = -height * .3;


    }

  }
}
