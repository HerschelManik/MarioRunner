var bg,bgImg,mario,marioImg,ground,ob,ob1,ob2,ob3,marioStand
var play = 1
var end = 0 
var gamestate=play
function preload(){
marioImg=loadAnimation("mario-1.png","mario-2.png","mario-3.png","mario-4.png")
  marioStand=loadAnimation("mario-1.png")
  bgImage=loadImage("bg.png")
  ob1=loadImage("enemy-1.jpg")
  ob2=loadImage("enemy-2.png")
  ob3=loadImage("enemy-3.png")
}

function setup() {
  createCanvas(500,800)

  bg=createSprite(200,200,400,400)
  bg.addImage(bgImage)
  bg.scale=1.3
   mario=createSprite(50,330,50,50)
  mario.addAnimation("running",marioImg)
  mario.addAnimation("standing",marioStand)
  mario.scale=0.3
  ground=createSprite(50,385,300,20)
  ground.visible=false
  obGroup=new Group()
}

function draw() {
 background(255)
  if(gamestate===play){
     bg.velocityX=-2
  if(bg.x<200){
    bg.x=400
  }
  if(keyDown("space") && mario.y>320){
    mario.velocityY=-12
  }
      mario.velocityY=mario.velocityY+0.8
  mario.collide(ground)
  obstacles() 
    if(obGroup.isTouching(mario)){
      mario.velocityY=0
      gamestate=end
    }
  }
  else if(gamestate===end){
    bg.velocityX=0
    obGroup.setVelocityXEach(0)
    mario.changeAnimation("standing",marioStand)
    bg.visible=false
    mario.visible=false
    obGroup.destroyEach()
    textSize(50)
    text("GAME OVER",150,150) 
 
  }
 
  drawSprites()
}

function obstacles(){
  if(frameCount%70===0){
    ob=createSprite(500,330,30,30)
    ob.velocityX=-4
    rand=Math.round(random(1,3))
    switch(rand){
  case 1:ob.addImage(ob1)
        break;
   case 2:ob.addImage(ob2)
        break;
   case 3:ob.addImage(ob3)
        break;
    }
    ob.scale=0.1
    obGroup.add(ob)   
}
  
  
}