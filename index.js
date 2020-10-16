var isGameOver;
var player;
var playerImage;
var enemy;
var enemyImage;
var backgroundImage;
var gameOverImage;
var score;
var block;
var fruit, fruitImage;
var coin,coinImage;
var backgroundImg;
var player1Image,player1;
function preload() {
  getBackgroundImg();
  playerImage = loadImage("monkey.png");
  enemyImage = loadImage("enemy.png");
  //backgroundImage = loadImage("background.jpg");
  gameOverImage = loadImage("gameover.jpg");
  fruitImage = loadImage("Fruit.png");
  coinImage = loadImage("stone.png");
  player1Image = loadImage("Monkey1.png");
}

function setup() {
  isGameOver = false;
  createCanvas(1200, 780);
  player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0);
  player.addImage(playerImage);
  player.scale=0.5;
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.rotationSpeed = 4.0;
  enemy.scale=0.1;

  fruit = createSprite(width/5,0,0,0);
  fruit.addImage(fruitImage);
  fruit.rotationSpeed= 3.0;
  fruit.scale = 0.1;
  
  player1 = createSprite(width / 2, height - (playerImage.height / 2), 0, 0)
  player1.addImage(player1Image);
  player1.visible=false;

  coin = createSprite(width/2+150,0,0,0);
  coin.addImage(coinImage);
  coin.scale = 0.1;
  score=0;
  block = createSprite(200,600,400,10);
  block.visible=false;

 
}

function draw() {
  if(backgroundImg)
    background(backgroundImg)

  //console.log(mouseX,mouseY);
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
    if (fruit.overlap(player)) {
      player.scale+=0.0005;
    }
    if (coin.overlap(player)) {
      player.scale-=0.0005;
    }
    
    //background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - 40)) {
      player.position.x += 5;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (40)) {
      player.position.x -= 5;
    }
    enemy.position.y = enemy.position.y + (10+score);
    fruit.position.y = fruit.position.y + (3+score/2);
    //player.position.y = player.position.y+2;
    coin.position.y = coin.position.y + (2+score/2);
    if (enemy.position.y > height) {
      score = score+1;
      enemy.position.y = 0;
      enemy.position.x = random(5, width - 5);
    }

    if (fruit.position.y > height) {
      //score = score+1;
      fruit.position.y = 0;
      fruit.position.x = random(5, width - 5);
    }

    if (coin.position.y > height) {
      //score = score+1;
      coin.position.y = 0;
      coin.position.x = random(5, width - 5);
    }
    
    if(keyDown("space")){
      player.velocityY=-3; 
        
    }
   // console.log(player.y);
    
    drawSprites();
  }
  textSize(18);
  fill("yellow");
  text("Score: "+score,50,20);
}

function gameOver() {
  background(backgroundImg)
 
  textAlign(CENTER);
  fill("orange");
  //text("Game Over!", width / 2, height / 2);
  textSize(35);
  strokeWeight(1);
  stroke("orange");
  text("Click anywhere to try again", width/2,100);
  
  player1.visible=true;
  //player.visible=true;
}

function mouseClicked() {
  if(isGameOver === true){
  isGameOver = false;
  player.position.x = width / 2;
  player.position.y = height - (playerImage.height / 2);
  enemy.position.x = width / 2;
  enemy.position.y = 0;
  score = 0;
  player.scale = 0.5;
  }
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19 ){
      bg = "background1.jpg";
  }
  else{
      bg = "background.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}