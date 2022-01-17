const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;

window.onload = function(){
    setInterval(mainloop, 1000/ gamespeed);
}

var score = 10;
var gamespeed = 50;


var asteroidyPole = [];

class Asteroidy{
    constructor(){
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.speed = 5;
        this.x = Math.floor(Math.random()*(canvas.width - this.w));
    }
}

for(var i = 0; i < 3; i ++){
    asteroidyPole.push(new Asteroidy());
} 

const speedPot = {
    width: 50,
    height: 100,
    speed: 15,
};
var speedPotX = Math.floor(Math.random()*(canvas.width - speedPot.width));
var speedPotY = 0;

const player = {
    x: Math.floor(Math.random() * 800),
    y: 400,
    width: 66.5,
    height: 100,
    frameX: 0,
    frameY: 0,
    speed: 0.5,
    moving: false,
};

const playerSprite = new Image();
playerSprite.src = "img/hulk.png";
const background = new Image();
background.src = "img/background1.png";
const asteroidImage = new Image();
asteroidImage.src = "img/asteroid.png";
const speedPotion = new Image();
speedPotion.src = "img/speed.png";
const gameover = new Image();
gameover.src = "img/gameover.png";

function mainloop(){
    let result = isGameOver();
    if (result) {
    return;
    }
    
    for(var i = 0; i < 3; i ++){
       ctx.drawImage(asteroidImage, asteroidyPole[i].x, asteroidyPole[i].y, asteroidyPole[i].w, asteroidyPole[i].h);
    }

    ctx.drawImage(speedPotion, speedPotX, speedPotY, speedPot.width, speedPot.height);

    
    moveSpeedPot();
    moveAsteroid();
}

function moveAsteroid(){
    for(var i = 0; i < 3; i ++){
    asteroidyPole[i].y += asteroidyPole[i].speed;
    
      if(asteroidyPole[i].y > canvas.height){
        asteroidyPole[i].y = 0 - asteroidyPole[i].h;
        asteroidyPole[i].x = Math.floor(Math.random()*(canvas.width - asteroidyPole[i].w));
        asteroidyPole[i].speed = Math.floor(Math.random()*(12 - 4) + 4);
      }
    }
}

function asteroidCollisionHealth(){
    
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText(" " + score, 700, 50);

    for(var i = 0; i < 3; i ++){
        if(asteroidyPole[i].y + asteroidyPole[i].h > player.y && asteroidyPole[i].y < player.y + player.height && asteroidyPole[i].x + asteroidyPole[i].w > player.x && 
            asteroidyPole[i].x < player.x + player.width){
                player.x = 0;
                player.y = canvas.height - player.height -100;
                score--;
        }
    }
}

function moveSpeedPot(){
    speedPotY += speedPot.speed;

    if(speedPotY > canvas.height){
        speedPotY = 0 - speedPot.height;
        speedPotX = Math.floor(Math.random()*(canvas.width - speedPot.width));

    }
    if(speedPotY + speedPot.height > player.y && speedPotY < player.y + player.height && speedPotX + speedPot.width > player.x && 
        speedPotX < player.x + player.width){ 
        player.speed = 1;
        speedPotX = 822;
        speedPotY = 15;
        speedPot.speed = 0;
    }
}


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

setInterval(function(){
    let result = isGameOver();
    if (result) {
    return;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background, 0 ,0 ,canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, 
        player.x, player.y, player.width, player.height);

    for(var i = 0; i < 3; i ++){
            ctx.drawImage(asteroidImage, asteroidyPole[i].x, asteroidyPole[i].y, asteroidyPole[i].w, asteroidyPole[i].h);
    };
    ctx.drawImage(speedPotion, speedPotX, speedPotY, speedPot.width, speedPot.height);
    asteroidCollisionHealth();
    movePlayer();
    pohybPlayerFrame();
}, 1);

const keys = [];

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    player.moving = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer(){
    if (keys[87] && player.y > 130){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[65] && player.x > 5){
       player.x -= player.speed;
       player.frameY = 1
       player.moving = true;
    }
    if (keys[83] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[68] && player.x < canvas.width - player.width){
       player.x += player.speed;
       player.frameY = 2;
       player.moving = true;
    }
}

function pohybPlayerFrame(){
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}

function isGameOver(){
    let gameOver = false;

    if(score <= -1 ){
        gameOver = true;
    }
    if (gameOver) {
        ctx.drawImage(gameover, canvas.width / 3 -88, canvas.height / 2 - 116, 500, 200);
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 3, canvas.height / 2);
        }
    
    return gameOver;
}
