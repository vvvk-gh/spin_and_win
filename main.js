//when ever you create a game you need give a config having 
//like width , height , scences present in the game

let config = {
  width: 1400,
  height: 600,
  //whenever you define a scene you need to define 3 main things 
  //1)preloader : loads my assets 
  //2)Create our game : which will be a function
  //3)update it : will be a function() 
  scene : {
      preload:preload,
      create: create,
      update: update,
  }
};

let game = new Phaser.Game(config);

function preload(){
  //to load a image we use load.image(key,url)
  //key is the name or id with which you want to refer the image
  //url is the location of the image
  //once the image is loaded you need to create that in 
  this.load.image('bgi',"./assets/back.png");
  this.load.image('wheel',"./assets/wheel.png");
  this.load.image('pin',"./assets/pin.png");
  this.load.image('stand',"./assets/stand.png");
}

function create(){

let W = game.config.width; //width of the canvas
let H = game.config.height; //height of the canvas
//create background image
this.add.sprite(0,0,"bgi");

//Create a stand
this.add.sprite(W/2,H-30,"stand").setScale(0.25);

//creating a pin 
let pin = this.add.sprite(W/2,H/2-250,"pin").setScale(0.25);
pin.depth = 1; // Changes its index 

//create wheel image
//this.add.sprite(0,0,"wheel") or let wheel = this.add.sprite(0,0,"wheel")
// to make this wheel accessible to the remaining functions and to avoid scope limitations of let
// we will make this as a property to the object game by adding this keyword 
this.wheel = this.add.sprite(W/2,H/2,"wheel").setScale(0.25);

//adding a onclick event in phaser
//need to pass the object using this keyword as spinwheel is not defined in scene
this.input.on("pointerdown",spinwheel,this);

}

function update(){
//everytime update gets called its the wheel angle changes by 1 degree
//this.wheel.angle += 1;
}

function spinwheel(){
  console.log("Spin the Wheel")

//random factor 
//phaser.math.between is just like math.random
let rounds =  Phaser.Math.Between(2,4);
console.log(rounds);
let extra_degree = Phaser.Math.Between(0,11)*30;
console.log(extra_degree);
let total_angle = rounds*360 + extra_degree;
  //create a tween (animation in phaser)
  let tween = this.tweens.add({
    targets: this.wheel,
    angle: total_angle,
    ease: "Cubic.easeOut",
    duration: 6000

  })
}