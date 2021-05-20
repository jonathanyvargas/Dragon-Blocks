class Projectile {
  constructor(){
    this.r = 15
    this.x = player.x - player.r / 3;
    this.y = player.y - player.r / 4;
    this.speed = 5;
  }

display(){
  rect(this.x, this.y, this.r, this.r);
  // rect(this.x, this.y, this.r, this.r);

}

move(){
  this.x -= this.speed;

}

}
