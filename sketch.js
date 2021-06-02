var dog,sadDog,happyDog, database;
var foodS,foodStock;
var feedTime,timeS;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastfed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("Feed Food");
  feedFood.position(900,95);
  feedFood.mousePressed(feedDog);
   
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('FeedTime');
  feedTime.on("value",readTime);

  function readTime(data){
    timeS=data.val();
    lastFed.updatefeedTime(timeS);
  }
  
  //write code to display text lastFed time here
  if(lastfed>=12){
    fill("Red");
    text("Last Fed : 12 Pm",350,30)
  }
  else if(lastfed==0){
    fill("Red");
    text("Last Fed : 12 Am",350,30);
  }
  else{
    fill("Red");
    text("Last Fed : 12 Am",350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

