const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 700;

window.onload = function(){
    setInterval(mainloop, 1000/ gamespeed);
}

var score = 1;
var gamespeed = 50;

const asteroid = {
    width: 100,
    height: 100,
    speed: 5,
};
var asteroidX = Math.floor(Math.random()*(canvas.width - asteroid.width));
var asteroidY = 0;

const asteroid2 = {
    width: 100,
    height: 100,
    speed: 5,
};
var asteroidX2 = Math.floor(Math.random()*(canvas.width - asteroid2.width));
var asteroidY2 = 0;

const asteroid3 = {
    width: 100,
    height: 100,
    speed: 5,
};
var asteroidX3 = Math.floor(Math.random()*(canvas.width - asteroid3.width));
var asteroidY3 = 0;

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
const asteroidjedna = new Image();
asteroidjedna.src = "img/asteroid.png";
const asteroiddva = new Image();
asteroiddva.src = "img/asteroid.png";
const asteroidtri = new Image();
asteroidtri.src = "img/asteroid.png";
const speedPotion = new Image();
speedPotion.src = "img/speed.png";
const gameover = new Image();
gameover.src = "img/gameover.png";

function mainloop(){
    let result = isGameOver();
    if (result) {
    return;
    }

    ctx.drawImage(speedPotion, speedPotX, speedPotY, speedPot.width, speedPot.height);
    ctx.drawImage(asteroidjedna, asteroidX, asteroidY, asteroid.width, asteroid.height);
    ctx.drawImage(asteroiddva, asteroidX2, asteroidY2, asteroid2.width, asteroid2.height);
    ctx.drawImage(asteroidtri, asteroidX3, asteroidY3, asteroid3.width, asteroid3.height);
    
    moveSpeedPot();
    moveAsteroid();
}

function moveAsteroid(){
    asteroidY += asteroid.speed;
    asteroidY2 += asteroid2.speed;
    asteroidY3 += asteroid3.speed;


    if(asteroidY > canvas.height){
        asteroidY = 0 - asteroid.height;
        asteroidX = Math.floor(Math.random()*(canvas.width - asteroid.width));
        asteroid.speed = Math.floor(Math.random()*(12 - 4) + 4);
    }
    if(asteroidY2 > canvas.height){
        asteroidY2 = 0 - asteroid2.height;
        asteroidX2 = Math.floor(Math.random()*(canvas.width - asteroid2.width));
        asteroid2.speed = Math.floor(Math.random()*(12 - 4) + 4);
    }
    if(asteroidY3 > canvas.height){
        asteroidY3 = 0 - asteroid3.height;
        asteroidX3 = Math.floor(Math.random()*(canvas.width - asteroid3.width));
        asteroid3.speed = Math.floor(Math.random()*(12 - 4) + 4);

    }
}

function asteroidCollisionHealth(){
    
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText(" " + score, 700, 50);
    if(asteroidY + asteroid.height > player.y && asteroidY < player.y + player.height && asteroidX + asteroid.width > player.x && 
        asteroidX < player.x + player.width){
            player.x = 0;
            player.y = canvas.height - player.height -100;
            score--;
    }
    if( asteroidY3 + asteroid3.height > player.y && asteroidY3 < player.y + player.height && asteroidX3 + asteroid.width > player.x && 
        asteroidX3 < player.x + player.width){
            player.x = 0;
            player.y = canvas.height - player.height -100;
            score--;
    }
    if(asteroidY2 + asteroid2.height > player.y && asteroidY2 < player.y + player.height && asteroidX2 + asteroid.width > player.x && 
        asteroidX2 < player.x + player.width){
            player.x = 0;
            player.y = canvas.height - player.height -100;
            score--;
    }
}

function moveSpeedPot(){
    speedPotY += speedPot.speed;

    if(speedPotY > canvas.height){
        speedPotY = 0 - speedPot.height;
        speedPotX = Math.floor(Math.random()*(canvas.width - speedPot.width));

    }
    if(speedPotY + speedPot.height > player.y && speedPotY < player.y + player.height && speedPotX+ asteroid.width > player.x && 
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
    ctx.drawImage(speedPotion, speedPotX, speedPotY, speedPot.width, speedPot.height);
    ctx.drawImage(asteroidjedna, asteroidX, asteroidY, asteroid.width, asteroid.height);
    ctx.drawImage(asteroiddva, asteroidX2, asteroidY2, asteroid2.width, asteroid2.height);
    ctx.drawImage(asteroiddva, asteroidX3, asteroidY3, asteroid3.width, asteroid3.height);
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