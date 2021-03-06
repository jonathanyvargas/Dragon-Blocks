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
let bossEnemies = [];
let playerImg;
// let enemyImg;
let enemyImg = [];
let randomEnemyImg = [];

let logo;

// sprite sheets and animations
let playerSS;
// let enemySS;
let playerJSON;
// let enemyJSON
let playerAnimation = [];
// let enemyAnimation = [];

function preload(){

// randomizer
  for (let i = 0; i <= 4; i++){
  randomEnemyImg[i] = loadImage("assets/DRAGON_" + i + ".png");

}


  // Still images
  playerImg = loadImage('assets/DRAGON.png')
  // enemyImg = loadImage('assets/DRAGON_RED.png')

  // spritesheets
  playerSS = loadImage('assets/spritesheet.png')
  playerJSON = loadJSON('assets/spritesheet.json')
  // enemySS = loadImage('assets/...')
  // enemyJSON = loadJSON('assets/...')

  // logo
  logo = loadImage('assets/DRAGON-BLOCKS.png')

}

function setup() {
  cnv = createCanvas(400, 400);
  angleMode(DEGREES);
  imageMode(CENTER);
  rectMode(CENTER);
  // frameRate(15);

  // console.log(enemies[int(random(enemies.length))].name);

  let playerFrames = playerJSON.frames;
  for (let i = 0; i < playerFrames.length; i++){
    let pos = playerFrames[i].frame;
    let img = playerSS.get(pos.x, pos.y, pos.w, pos.h);
    playerAnimation.push(img);
  // console.log(playerFrames[i]);
  }


  mic = new p5.AudioIn()
  mic.start()



  cloud1 = new Cloud(width * .8, height * 1.9, 10, 1);
  cloud2 = new Cloud(width * .6, height * .8, -20, .6);
  cloud3 = new Cloud(width * .46, height * .76, -10, .6);
  cloud4 = new Cloud(width * .1, height * .1, 20, 1);

  player = new Player();
  enemies[0] = new Enemy();
  projectiles.push(new Projectile);
  bossEnemies[0] = new Boss();
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
 } else if (state === 'level 2'){
   level2();
  cnv.mouseClicked(level2MouseClicked);
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

function level2MouseClicked(){
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
textSize(30);
// text('DRAGON BLOCKS', width/14, height/6)



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

push();
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

text('click here to start', width/4, height * 9/10)
pop();

// push();
translate(p5.Vector.fromAngle(millis() / 500, 5))
image(logo, width * 5/10, height/10, 340, 70);
pop();

push();
textSize(20);
fill(0, 255, 0);
text('Arrows = move', width / 1.60, height / 4);
text('Any key = fire', width / 1.60, height / 3);
pop();

}

function level1(){
background(0);
// fill(100);

cloudOne();
cloudTwo();
cloudThree();


if (random(1) <= 0.06){
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
// state = 'you lose'
//   }

if (dist(player.x, player.y, enemies[j].x, enemies[j].y) <= (player.r + enemies[j].r) / 2){
  state = 'you lose'
}

if (projectiles[i] && dist(projectiles[i].x, projectiles[i].y, enemies[j].x, enemies[j].y) <= (projectiles[i].r + enemies[j].r) / 2) {
  points++;
  enemies.splice(j, 1);
  projectiles.splice(i, 1);

} else if (enemies[j].y > height){
  enemies.splice(j, 1);
}
}

}



fill(0,255, 0);
text('points: ' + points, width / 20, height * 9.5/10);
text('/10', width / 2.9, height * 9.5/10);
if (points >= 10){
state = 'level 2'
}

// if (dist(Player.x, Player.y, Enemy.x, Enemy.y) <= (Player.r + Enemy.r) / 2){
//   state = 'you lose'
// }

text('Level 1', width / 1.40, height / 10);

// text('health: ' + health, width / 1.60, height / 10);
// if (health <= 0){
// state = 'you lose'
// }

}

function level2(){
background(0);

cloudOne();
cloudTwo();
cloudThree();


if (random(1) <= 0.03){
  bossEnemies.push(new Boss());
}

for (let i = 0; i < projectiles.length; i++){
  projectiles[i].display();
  projectiles[i].move();
}

player.display();
player.move();

for (let j = 0; j < bossEnemies.length; j++){
  bossEnemies[j].display();
  bossEnemies[j].move();
}



for (let i = projectiles.length - 1; i >= 0; i--){
for (let j = bossEnemies.length - 1; j >= 0; j--){
// if (player && dist(player.x, player.y, enemies[j].x, enemies[j].y) <= (player.r + enemies[j].r) / 2){
//     health--;
//     enemies.splice(j, 1);
//     console.log(health);
//   }

if (dist(player.x, player.y, bossEnemies[j].x, bossEnemies[j].y) <= (player.r + bossEnemies[j].r) / 2){
  state = 'you lose'
}

if (projectiles[i] && dist(projectiles[i].x, projectiles[i].y, bossEnemies[j].x, bossEnemies[j].y) <= (projectiles[i].r + bossEnemies[j].r) / 2) {
  points += 5;
  bossEnemies.splice(j, 1);
  projectiles.splice(i, 1);

} else if (bossEnemies[j].y > height){
  bossEnemies.splice(j, 1);
}
}

}


text('points: ' + points, width / 20, height * 9.5/10);
text('/100', width / 2.6, height * 9.5/10);
if (points >= 100){
state = 'you win'
}

text('Boss fight', width / 1.60, height / 10);

// text('health: ' + health, width / 1.60, height / 10);
// if (health <= 0){
// state = 'you lose'
// }

}

function youWin(){
  background(0);
  textSize(80)
  text('YOU WIN!', width/30, height/5.3)
  textSize(25)
  text('click here to play again', width/6, height * 9.5/10);
  player.display();
  player.move();
}

function youLose(){
  background(0);
  textSize(70)
  text('YOU LOSE!', width/30, height/5.7)
  textSize(30)
  text('click here to restart', width/6, height * 9.5/10);
  player.display();
  player.move();
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

function cloudOne(){
  push();
  fill(100);
  noStroke();
  circle(5, 20, 35);
  circle(20, 30, 25);
  circle(20, 10, 20);
  circle(35, 10, 25);
  circle(35, 25, 25);
  circle(50, 20, 20);
  pop();

}

function cloudTwo(){
  push();
  fill(100);
  noStroke();
  circle(105, 120, 35);
  circle(120, 130, 25);
  circle(120, 110, 20);
  circle(135, 110, 25);
  circle(135, 125, 25);
  circle(150, 120, 20);
  pop();
}

function cloudThree(){
  push();
  fill(100);
  noStroke();
  circle(305, 370, 35);
  circle(320, 380, 25);
  circle(320, 360, 20);
  circle(335, 360, 25);
  circle(335, 375, 25);
  circle(350, 370, 20);
  pop();
}
