// ----- Create Canvas -----
var canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 640;
document.getElementById("game-container").appendChild(canvas);

// - Get canvas context
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// ----- Create Game Objects -----

// Background
var backgroundScroll = 0;
var backgroundSpeed = 3;
var backgroundHeight = 640;

// ----- Set Up Game -----

// Set game variables
var gameActive = false;
var gameStartTime = 0;

var score = 0;
var power = 0;
var lives = 3;

var powerTimer = 0;
var respawnTimer = 0;
var levelWinTimer = 0;
var levelStartTimer = 0;
var gameOver = false;

// ----- Update the Game -----

var frames = 0;
var targetFPS = 60;

var time = 0;
var deltaTime = 1/targetFPS;

var levelFrame = 0;
var levelIndex = 1;
var levelUpdates = [];

var randomOffset = 134;
function random() {
    randomOffset += frames;
    return ((frames + randomOffset)**3%1000)/1000;
}


function startGame() {
    gameActive = true;
    gameStartTime = performance.now()/1000;
    frames = 0;
    score = 0;
    lives = 1;
}

function startLevel(li) {
    inGame = true;

    levelFrame = frames;
    levelIndex = li;

    power = 0;
    
    powerTimer = 0;
    respawnTimer = 0;
    levelWinTimer = 0;
    levelStartTimer = 120;
    gameOver = false;

    player = {
        x: 240,
        y: 720,
        w: 40,
        h: 40,
        
        hasShot: false,
    
        vx: 0,
        vy: 0
    };
    bullets = [];
    enemies = [];
    particles = [];
}

// Everything in this "animate" function will be run every frame.
function animate() {
    // If the game isn't active, don't run the rest of the code
    if(!gameActive) {
        gameStartTime += 1/200;
        return;
    }

    // This code smoothens the frame rate.
    time = performance.now()/1000;
    if(time - gameStartTime > frames/targetFPS) {
        frames++;
    } else {
        return;
    }


    backgroundScroll += backgroundSpeed;
    if(backgroundScroll > backgroundHeight) {
        backgroundScroll = 0;
    }

    if(levelStartTimer > 1) {
        player.immune = true;
    } else if(levelStartTimer == 1) {
        player.immune = false;
    }

    if(levelWinTimer > 1) {
        player.immune = true;
    }


    if(levelIndex != 0) {
        levelUpdates[levelIndex - 1]();
    }
    
    updatePlayer();
    updateBullets();
    updateEnemies();
    updateParticles();
    updateHUD();

    if(levelStartTimer > 0 && levelStartTimer <= 120) {
        ctx.fillStyle = "#000000" + (Math.floor(levelStartTimer/120*255)+256).toString(16).slice(1);
        ctx.fillRect(0, 0, 480, 640);
    }

    if(levelWinTimer > 0 && levelWinTimer <= 60) {
        ctx.fillStyle = "#000000" + (Math.floor((60 - levelWinTimer)/60*255)+256).toString(16).slice(1);
        ctx.fillRect(0, 0, 480, 640);
    }
}

// In order for the animate funtion to start in the first place,
// We need to call it outside the function.
setInterval(animate, 5);