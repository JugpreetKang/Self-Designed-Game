var bg, backgroundIMG;
var player, playerImg;
var alien, alienImg;
var UFOGroup, UFOImg;
var bulletGroup, bulletImg;
var coinGroup, coinImg;
var edges;
var gameStates="start";
var score=0;
var fCount=60;

function preload() {
  backgroundIMG=loadImage("bckg.jpg");
  alienImg=loadImage("alien_PNG41.png");
  playerImg=loadImage("astronaut.png");
  UFOImg = loadImage("UFO.png");
  bulletImg = loadImage("laser.png");
  coinImg = loadImage("Dollar-Gold-Coin.png");
}

function setup(){
  createCanvas(600,600);

  bg = createSprite(300,300,600,600);
  bg.addImage("bgIMG", backgroundIMG);
  bg.velocityX = 1;
  bg.scale = 0.3;
  
  alien = createSprite(500,400,20,20);
  alien.addImage("alI", alienImg)
  alien.scale = 0.08;

  player = createSprite(100,400,20,20);
  player.addImage("astroI", playerImg);
  player.scale = 0.08;

  edges = createEdgeSprites();

  
  
  UFOGroup = new Group();
  bulletGroup = new Group();
  coinGroup = new Group();
  
}

function draw(){
  background(backgroundIMG);
  drawSprites()

  //Create Infinity background
  if(bg.x>500){
    bg.x = 300
  }

  spawnCoins();

  if(coinGroup.isTouching(player)){
    coinGroup[0].destroy();
    score = score + 25;
  }

  //Applying game states
  if(gameStates==="start"){
    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }

    spawnUFOS();

    fill("white");
    rect(10, 45, 500, 20);
    fill("#f50057");
    rect(10, 45, score, 20);
    noStroke();

    if(score >= 500){
      gameStates = "level2"
      swal({
        title:"LEVEL 2",
        text : "Dodge the bullets",
        imageUrl:"",
        imageSize:"150*150",
        confirmButtonText:"OK"
      })
    }
    
  }
  
  if(gameStates=="level2"){

    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }

    spawnBullets();

    if(score >= 1500){
      gameStates = "level3"
      swal({
        title:"LEVEL 3",
        text : "Avoid all obstacles",
        imageUrl:"",
        imageSize:"150*150",
        confirmButtonText:"OK"
      })
    }

   
  }

  if(gameStates=="level3"){

    if(keyDown("down")){
      player.y = player.y+3;
    }
    if(keyDown("up")){
      player.y = player.y-3;
    }
    if(keyDown("right")){
      player.x = player.x+3;
    }
    if(keyDown("left")){
      player.x = player.x-3;
    }

    spawnBullets();
    spawnUFOS();

    
  }

  player.collide(edges)

  fill("white");
  textSize(20);
  text("score: "+score, 20,20);
  
}

function spawnUFOS(){

  //if(score<100){
   fCount = frameCount
   if (frameCount % 150 === 0) {
    var UFO = createSprite(600,300,40,10);
    UFO.y = Math.round(random(10,590));
    UFO.addImage(UFOImg);
    UFO.scale = 0.04;
    //UFO.velocityX=-(2+score/100);
    UFO.velocityX=-(2)
    UFOGroup.add(UFO);
   }
 //}

//   if(score%100 == 0) {
//     fCount = fCount - 10
//     console.log(frameCount % 80)
//     if ( fCount>0 && frameCount % 80 ===0 ) {
//       console.log("working")
//       var UFO = createSprite(600,300,40,10);
//       UFO.y = Math.round(random(10,590));
//       UFO.addImage(UFOImg);
//       UFO.scale = 0.04;
//       //UFO.velocityX=-(2+score/100);
//       UFO.velocityX=-(2)
//       UFOGroup.add(UFO);
//     }
//  }

}

function spawnBullets(){

  if(score > 500){
   if ( frameCount % 100 == 0) {
    var bullet = createSprite(600,0,40,10);
    bullet.x = Math.round(random(10,590));
    bullet.addImage(bulletImg);
    bullet.scale = 0.7;

    bullet.velocityY=+(1)
    bulletGroup.add(bullet);
   }
  }

}

function spawnCoins(){

  if(frameCount % 30 == 0){
    var coin = createSprite(0,0,10,10);
    coin.addImage(coinImg);
    coin.scale = 0.07
    coin.x =  Math.round(random(10,590));
    coin.y =  Math.round(random(10,590));
    coinGroup.add(coin);
  }
  
}


