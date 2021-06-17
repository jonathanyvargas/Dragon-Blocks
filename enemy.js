class Enemy {
  constructor(){
    this.r = 60
    this.x = 0 - this.r
    this.y = random(width);
    this.speed = 2;

  }

display(){
  // background();

  image(randomEnemyImg[int(random(4))], this.x, this.y, this.r, this.r);

  // randomEnemyImg.splice(int(random(4)), 1);

  // rect(this.x, this.y, this.r, this.r);

}

move(){
  this.x += this.speed;


}

}
