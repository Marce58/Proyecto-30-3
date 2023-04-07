var player, back;
var points = 0;
var backImg;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "START";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;

function preload() {
  backImg = loadImage("Imagenes/pixel-minecraft-style-land-background-vector.jpg");
  leftPlayerImg = loadAnimation("Imagenes/willyLeft.png");
  rightPlayerImg = loadAnimation("Imagenes/willyRight.png");
  baseImg = loadImage("Imagenes/base.png");
  goodImg = loadImage("Imagenes/goodthing.png");
  badImg = loadImage("Imagenes/badthing.png");
}

function setup() {
  createCanvas(450,800);
  back = createSprite(225,400,20,20);
  back.addImage(backImg);
  back.scale = 1;
  player = createSprite(225,420,20,20);
  player.addAnimation("left",leftPlayerImg);
  player.addAnimation("right",rightPlayerImg);
  player.scale = 0.07;
  baseGroup = new Group;
  goodThingsGroup = new Group;
  badThingsGroup = new Group;
}

function draw() {
  background(220);
  
  drawSprites();
  
  textSize(20);
  fill("#A2A5E6");
  text("puntos: "+points, 50, 100);
  textSize(50);
  
  if(gameState==="START" && keyDown("down_arrow")){
         gameState = "PLAY";
  }
  
  if(gameState==="PLAY"){
    back.velocityY = 1;
    if(back.y > 485){
      back.y = 400;
  }
    
  if(keyDown("right_arrow")){
    player.x = player.x + 3;
    player.changeAnimation("right", rightPlayerImg);
  }
  
  if(keyDown("left_arrow")){
    player.x = player.x - 3;
    player.changeAnimation("left", leftPlayerImg);
  }
  
  if(keyDown("up_arrow")){
    player.velocityY = -4;
  }
  
  player.velocityY = player.velocityY + 0.8;
    
  createBases();
    
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
    }
    
    if(player.isTouching(goodThingsGroup,removeGoodThings)){
      points = points +10
    }

    createBadThings();

    if(player.isTouching(badThingsGroup)){
      gameState = "GAMEOVER";
    }
  }
  
   if(gameState==="GAMEOVER"){
     back.velocityY = 0;
     player.remove();
     text("Game Over D;",70,300);
   }
  }

function createBases(){
   if(frameCount % 100 === 0){
     var base = createSprite(random(50,450),0,70,20);
     base.velocityY = 2;   
     base.addImage(baseImg);
     base.scale = 0.25;
     baseGroup.add(base);
     var good = createSprite(base.x, base.y -21, 70, 20);
     good.velocityY = 2;
     good.addImage(goodImg);
     good.scale = 0.12;
     goodThingsGroup.add(good);
   }
}

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
    var bad = createSprite(random(40, 450), 0, 70, 20);
    bad.velocityY = 1.5;
    bad.addImage(badImg);
    bad.scale = 0.12;
    badThingsGroup.add(bad);
  }
}

function removeGoodThings(sprite,goodThingsGroup ){
 goodThingsGroup.remove();
}

