
class Player{

  constructor(){
    this.r = 60;
    this.x = width / 2;
    this.y = height - this.r;

    this.speed = 2;
    this.direction = 'still';

  }

display(){
// circle(this.x, this.y, this.r);
image(playerImg, this.x, this.y, this.r, this.r);


// drawBody(this.x, this.y, this.r, this.r);
// drawJaw(this.x, this.y, this.r, this.r);
// drawHead(this.x, this.y, this.r, this.r);
// drawHead(this.x, this.y, this.r, this.r);
// drawEye(this.x, this.y, this.r, this.r);
// drawTail(this.x, this.y, this.r, this.r);
// drawWing(this.x, this.y, this.r, this.r);
// drawArm(this.x, this.y, this.r, this.r);
// drawLeg(this.x, this.y, this.r, this.r);

  // drawBody();
  // drawJaw(jawDrop);
  // drawHead(mouthFlap);
  // drawHead(mouthRawr);
  // drawEye();
  // drawTail();
  // drawWing(mouseY);
  // drawArm();
  // drawLeg();

}

move(){

  switch (this.direction){
    case 'still':

    break;
    case 'up':
    if (this.y > 0) {
    this.y -= this.speed;
    }
    break;
    case 'down':
    if (this.y < height - this.r) {
    this.y += this.speed;
    }
    break;
    case 'right':
    if (this.x < height - this.r) {
    this.x += this.speed;
    }
    break;
    case 'left':
    if (this.x > 0) {
    this.x -= this.speed;
    }

    default:
    break;



  }


}


}
