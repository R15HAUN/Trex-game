var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup
var obstacleGroup
var play = 1;
var end = 2;
var gamestate = play;
var gameOverImg
var restartImg
var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(300,120)
  restart.addImage(restartImg)
  restart.scale = 0.3;
  
  cloudGroup = createGroup();
  obstacleGroup = createGroup();
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  text("Score: "+ score, 500,50);
  if(gamestate == play){
    ground.velocityX = -(4 + 3 * score/100)
    score = score + Math.round(getFrameRate()/60);
    gameOver.visible = false;
    restart.visible = false;
     if(keyDown("space") && trex.y > 161) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  
  spawnObstacles();
  
    if(obstacleGroup.isTouching (trex)){
      gamestate = end;
    }
    
  }else if(gamestate == end){
    ground.velocityX = 0;
    trex.velocityY = 0; 
    obstacleGroup.setVelocityXEach(0); 
    cloudGroup.setVelocityXEach(0); 
    //change the trex animation 
    trex.changeAnimation("collided",trex_collided);
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1); cloudGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver (restart)){
      score = 0;
      gamestate = play;
      gameOver.visible = false;
      restart.visible = false;
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
    }
  }
 
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if (frameCount%60 == 0){
  var cloud = createSprite(600, Math.round(random(30, 110)));
  cloud.velocityX = -5
    cloud.addImage(cloudImage);
    cloud.scale = 0.7;
    cloud.lifetime = 120;
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloudGroup.add(cloud)
  }
}

function spawnObstacles(){
  if (frameCount%100 == 0){
    var obstacle = createSprite(600, 170);
    obstacle.velocityX = -(4 + 3 * score/100)
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
        break
        
        case 2:obstacle.addImage(obstacle2)
        break
        
        case 3:obstacle.addImage(obstacle4)
        break
        
        case 4:obstacle.addImage(obstacle5)
        break
        
        case 5:obstacle.addImage(obstacle6)
        break
        
        case 6:obstacle.addImage(obstacle6)
        break
        default:break
        
    }
        obstacle.scale = 0.5;
        obstacle.lifetime = 120;
        obstacleGroup.add(obstacle)
  }
}