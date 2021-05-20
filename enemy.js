class Enemy {
  constructor(){
    this.r = 50
    this.x = 0 - this.r
    this.y = random(width);
  }

display(){
  image(enemyImg, this.x, this.y, this.r, this.r);
  // rect(this.x, this.y, this.r, this.r);

}

move(){
  this.x ++;


}

}
