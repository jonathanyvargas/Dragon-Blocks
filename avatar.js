let wingFlap;
let mouthFlap;
let mic;
let jawDrop = 0;
let mouthRawr = 0;

function setup() {
  angleMode(DEGREES)



  mic = new p5.AudioIn()
  mic.start()

}

function draw(){
  wingFlap = map(mouseY, 0, 400, 350, 370)
  mouthFlap = map(mic.getLevel(), 0, 1, 360,460)

  drawBody();
  drawJaw(jawDrop);
  drawHead(mouthFlap);
  drawHead(mouthRawr);
  drawEye();
  drawTail();
  drawWing(mouseY);
  drawArm();
  drawLeg();

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
