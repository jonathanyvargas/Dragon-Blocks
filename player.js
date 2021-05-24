
class Player{

  constructor(){
    this.r = 60;  //this is diameter, not radius
    this.x = width / 2;
    this.y = height - this.r;

    this.speed = 2;
    this.direction = 'still';

  }

display(){

// circle(this.x, this.y, this.r);
// image(playerImg, this.x, this.y, this.r, this.r);
image(playerAnimation[frameCount % playerAnimation.length], this.x, this.y, this.r, this.r);
}

move(){

  switch (this.direction){
    case 'still':

    break;
    case 'up':
    if (this.y - this.r / 2 > 0) {
    this.y -= this.speed;
    }
    break;
    case 'down':
    if (this.y < height - this.r / 2) {
    this.y += this.speed;
    }
    break;
    case 'right':
    if (this.x < height - this.r / 2) {
    this.x += this.speed;
    }
    break;
    case 'left':
    if (this.x -this.r / 2 > 0) {
    this.x -= this.speed;
    }

    default:
    break;



  }


}


}
