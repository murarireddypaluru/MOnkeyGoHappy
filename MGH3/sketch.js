var survivalTime, BC, SH, monkey
var ground, bground

function preload(){
  bananaImage = loadImage("banana.png")
  stoneImage = loadImage("stone.png")
//   monkeyAnimation = loadImage("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
// }
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png")
  bgroundImage = loadImage("jungle.jpg")
}


function setup() {
  createCanvas(400, 400);
  suvivalTime = 0
  BC = 0
  SH = 0
  monkey = createSprite(100, 200, 20, 50)
  monkey.addAnimation("monkey", monkeyAnimation)
  monkey.scale = 0.1
  ground = createSprite(400, 350, 800, 90)
  ground.velocityX = -4
  ground.x=ground.width/2
  ground.visible = true
  bground = createSprite(0, 400, 800, 400)
  bground.velocityX = -4
  bground.x=bground.width/2
  bground.addImage("background", bgroundImage)
  var bananaGroup = createGroup()
  var obstaclesGroup = createGroup()
}

function draw() {
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (bground.x < 0){
    bground.x = bground.width/2;
  }
  if(keyDown("space")&& monkey.y >= 270){
    monkey.velocityY = -12
  }
  if(monkey.isTouching(bananaGroup)){
    BC += 1
    bananaGroup.destroyEach()
  }
  if(monkey.isTouching(obstaclesGroup)){
    SH += 1
    obstaclesGroup.destroyEach()
  }
  monkey.velocityY = monkey.velocityY + 0.8
  background("white")
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100, 50)
  text("Bananas Gotten: " + BC, 100, 70)
  text("Stones Hit: " + SH, 100, 90)
  monkey.collide(ground)
  drawSprites()
  Banana()
  Obstacle()
}
function Banana(){
  if(World.frameCount% 150===0){
    var banana = createSprite(390, 200, 20, 20)
    banana.addImage("Banana", bananaImage)
    banana.scale = 0.05
    banana.y = Math.round(randomNumber(145, 200))
    banana.velocityX = -2
    banana.lifetime = 200
    bananaGroup.add(banana)
  }
}
function Obstacle() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,300,10,40);
    obstacle.velocityX = -6
    obstacle.addImage("Stone", stoneImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
  }
}
