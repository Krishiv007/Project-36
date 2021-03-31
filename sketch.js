var database;
var dog, happyDog;
var foodS, foodStock;
var dogI, dogI2;

function preload()
{
  dogI = loadImage("images/dogImg.png");
  dogI1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

	createCanvas(500, 500);
  
  dog = createSprite(250,350,20,20);
  dog.addImage("dog1",dogI);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(foodS !== undefined)
  {
    if(keyWentDown(UP_ARROW))
    {
      writeStock(foodS);
      dog.addImage("dog2",dogI1);
      dog.changeImage("dog2");
    }
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Food left = "+foodS,160,50);
  text("Press the UP_ARROW key to feed the dog",50,485);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }
  else
  {
    x--;
  }

  database.ref('/').update({
     Food:x
  })
}