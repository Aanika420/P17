var gameState = "play";
var monkey , monkey_running
var bananaImage,obstacleImage
var FoodGroup, obstaclesGroup, bananaGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup=createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background("white");
  if(gameState === "play"){
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  food();
  spawnObstacles();
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.collide(ground);
  
  score = score + Math.round(getFrameRate()/60);
  var survivalTime = 0;
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survivalTime,100,50);
  
  if(monkey.isTouching(obstaclesGroup)){
    gameState = "end";
  }
  drawSprites();
  }
  if(gameState === "end"){
    background(0);
    fill("yellow");
    text("Game Over",200,200);
  }
}

function food() {
  if (frameCount % 80 === 0){
      var banana=createSprite(200,200,20,20);
      banana.y = Math.round(random(120,200));
      banana.addImage("banana", bananaImage);
      banana.velocityX = -5;
      banana.lifetime=300;
      banana.scale = 0.1;
      bananaGroup.add(banana);
      }
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
  var obstacle = createSprite(400,350,10,40);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.velocityX = -3;
  obstacle.lifetime = 300;
  obstacle.scale = 0.1;
  obstaclesGroup.add(obstacle);
 }
}



