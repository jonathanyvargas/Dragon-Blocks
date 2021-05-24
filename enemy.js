class Enemy {
  constructor(){
    this.r = 60
    this.x = 0 - this.r
    this.y = random(width);
    this.speed = 2;
  }

display(){
  image(enemyImg, this.x, this.y, this.r, this.r);
  // rect(this.x, this.y, this.r, this.r);

}

move(){
  this.x += this.speed;


}

}
