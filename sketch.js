let wingFlap;
let mouthFlap;
let mic;
let jawDrop = 0;
let mouthRawr = 0;

let cloud1
let cloud2
let cloud3
let cloud4

let state = 'title';
let cnv;
let points = 0;
let health = 10;

let player = 10;
let projectiles = [];
let enemies = [];
let playerImg;
let enemyImg;

function preload(){
playerImg = loadImage('assets/DRAGON.png')
enemyImg = loadImage('assets/DRAGON_RED.png')

}

function setup() {
  cnv = createCanvas(400, 400);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);


  mic = new p5.AudioIn()
  mic.start()



  cloud1 = new Cloud(width * .8, height * 1.9, 10, 1);
  cloud2 = new Cloud(width * .6, height * .8, -20, .6);
  cloud3 = new Cloud(width * .46, height * .76, -10, .6);
  cloud4 = new Cloud(width * .1, height * .1, 20, 1);

  player = new Player();
  enemies[0] = new Enemy();
  projectiles.push(new Projectile);
  // console.log(projectiles);
  // projectiles.push(new Projectile());

}

function draw() {

  if (state === 'title'){
    title();
    cnv.mouseClicked(titleMouseClicked);
  } else if (state === 'level 1'){
    level1();
   cnv.mouseClicked(level1MouseClicked);
 } else if (state === 'you lose'){
   youLose();
   cnv.mouseClicked(youLoseMouseClicked);
 } else if (state === 'you win'){
   youWin();
   cnv.mouseClicked(youWinMouseClicked);
 }

}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW){
    player.direction = 'right'
  } else if (keyCode == UP_ARROW){
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW){
    player.direction = 'down'
  } else if (key = ' '){
    projectiles.push(new Projectile);
  }

// console.log(projectiles);
}

function keyReleased(){
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }
  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }

  if (numberKeysPressed == 0){
   player.direction = 'still';
}
}

function titleMouseClicked(){
state = 'level 1';
points = 0;
health = 10;
enemies = [];
projectiles = [];

}

function level1MouseClicked(){
// points++;

// if (points >= 10){
//   state = 'you win';
// }

}

function youLoseMouseClicked(){
state = 'level 1';
points = 0;
health = 10;
enemies = [];
projectiles = [];
}

function youWinMouseClicked(){
state = 'title';

}

function title(){

background(0);
textSize(40);
text('DRAGON BLOCKS', width/14, height/6)

wingFlap = map(mouseY, 0, 400, 350, 370)
mouthFlap = map(mic.getLevel(), 0, 1, 360,460)

cloud1.display();
cloud2.display();
cloud3.display();
cloud4.display();

cloud1.move();
cloud2.move();
cloud3.move();
cloud4.move();

translate(p5.Vector.fromAngle(millis() / 1000, 40))

drawBody();
drawJaw(jawDrop);
drawHead(mouthFlap);
drawHead(mouthRawr);
drawEye();
drawTail();
drawWing(mouseY);
drawArm();
drawLeg();

textSize(30);
text('click here to start', width/4, height * 9/10)

}

function level1(){
background(0);

if (random(1) <= 0.01){
  enemies.push(new Enemy());
}

for (let i = 0; i < projectiles.length; i++){
  projectiles[i].display();
  projectiles[i].move();
}

player.display();
player.move();

for (let j = 0; j < enemies.length; j++){
  enemies[j].display();
  enemies[j].move();
}



for (let i = projectiles.length - 1; i >= 0; i--){
for (let j = enemies.length - 1; j >= 0; j--){
// if (player && dist(player.x, player.y, enemies[j].x, enemies[j].y) <= (player.r + enemies[j].r) / 2){
//     health--;
//     enemies.splice(j, 1);
//     console.log(health);
//   }
if (projectiles[i] && dist(projectiles[i].x, projectiles[i].y, enemies[j].x, enemies[j].y) <= (projectiles[i].r + enemies[j].r) / 2) {
  points++;
  enemies.splice(j, 1);
  projectiles.splice(i, 1);

} else if (enemies[j].y > height){
  enemies.splice(j, 1);
}
}

}


text('points: ' + points, width / 20, height * 9.5/10);
if (points >= 10){
state = 'you win'
}

text('health: ' + health, width / 1.60, height / 10);
if (health <= 0){
state = 'you lose'
}

}

function youWin(){
  background(0);
  textSize(80)
  text('YOU WIN', width/24, height/6)
  textSize(25)
  text('click here to play again', width/6, height * 9/10);
}

function youLose(){
  background(0);
  textSize(60)
  text('GAME OVER', width/24, height/6)
  textSize(30)
  text('click here to restart', width/6, height * 9/10);
}

function drawBody(){

  // Body
  // arc(x, y, w, h, start, stop, [mode], [detail])
  fill(255, 255, 0)
  arc(width * .575, width * .625, width * .375, width * .375,
  67, 247, CHORD);

}

function drawJaw(){

  // Jaw
  fill(192, 192, 192)
  push()
  translate(width * .55, height * .35)
  rotate(jawDrop)
  beginShape();
  vertex(width * -.40, height * .15);
  vertex(width * -.40, height * 0);
  vertex(width * -.35, height * .10);
  vertex(width * -.30, height * .0);
  vertex(width * -.25, height * .10);
  vertex(width * -.20, height * 0);
  vertex(width * 0, height * 0);
  vertex(width * 0, height * .15);
  endShape(CLOSE)
  pop()


}

function drawHead(){

    // Head
  fill(192, 192, 192)
  push()
  translate(width * .55, height * .35)
  rotate(mouthFlap)
  rotate(mouthRawr)
  beginShape();
  vertex(width * -.4, height * .0);
  vertex(width * -.4, height * -.15);
  vertex(width * .0, height * -.15);
  vertex(width * .0, height * .0);
  vertex(width * -.2, height * .0);
  vertex(width * -.25, height * .1);
  vertex(width * -.3, height * .0);
  vertex(width * -.35, height * .1);
  endShape(CLOSE)
  pop()

}

function drawEye(){

  // Eye
  fill(0)
  push()
  translate(width * .55, height * .35)
  rotate(mouthFlap)
  rotate(mouthRawr)
  circle(width * -.1, width * -.05, width * .02)
  pop()

}

function drawTail(){

  // Tail
  fill(0, 0, 255)
  beginShape();
  vertex(width * .648, height * .798);
  vertex(width * .585, height * .65);
  vertex(width * .80, height * .65);
  endShape(CLOSE)

}

function drawWing(){

  // Wing
  fill(255, 0, 0)
  push()
  translate (width * .50, height * .55)
  rotate(wingFlap)
  beginShape();
  vertex(width * 0, height * 0);
  vertex(width * .25, height * -.25);
  vertex(width * .3, height * -.05);
  vertex(width * .15, height * -.05);
  vertex(width * .15, height * .05);
  endShape(CLOSE)
  pop()


}

function drawArm(){

  // Arm
  fill(255, 165, 0)
  beginShape();
  vertex(width * .43, height * .57);
  vertex(width * .48, height * .57);
  vertex(width * .48, height * .67);
  vertex(width * .43, height * .67);
  endShape(CLOSE)

}

function drawLeg(){

  // Leg
  fill(0, 255, 0)
  beginShape();
  vertex(width * .47, height * .70);
  vertex(width * .57, height * .70);
  vertex(width * .57, height * .85);
  vertex(width * .47, height * .85);
  endShape(CLOSE)

}
