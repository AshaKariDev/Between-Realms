// Get the Key Inputs
var keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    x: false,
    enter: false
};

var keyString = [];

// Key Down Event
document.addEventListener("keydown", function(e) {
    if(e.key == "ArrowUp") { keys.up = true; }
    if(e.key == "ArrowDown") { keys.down = true; }
    if(e.key == "ArrowLeft") { keys.left = true; }
    if(e.key == "ArrowRight") { keys.right = true; }

    if(e.key == "w" || e.key == "W") { keys.up = true; }
    if(e.key == "s" || e.key == "S") { keys.down = true; }
    if(e.key == "a" || e.key == "A") { keys.left = true; }
    if(e.key == "d" || e.key == "D") { keys.right = true; }

    if(e.key == " ") { keys.space = true; }
    if(e.key == "x" || e.key == "X") { keys.x = true; }
    if(e.key == "Enter") { keys.enter = true; }

    if(e.key == "o") {
        pauseAllAudio();
        levelIndex--;
        startLevel(levelIndex);
    }
    if(e.key == "p") {
        pauseAllAudio();
        levelIndex++;
        startLevel(levelIndex);
    }

    var extraLivesSeq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","x"," "];
    keyString.push(e.key);
    for(var i in extraLivesSeq) {
        if(keyString.slice(-10)[i] != extraLivesSeq[i]) {
            return;
        }
    }
    lives += 30;
    keyString = [];
});

// Key Up Event
document.addEventListener("keyup", function(e) {
    if(e.key == "ArrowUp") { keys.up = false; }
    if(e.key == "ArrowDown") { keys.down = false; }
    if(e.key == "ArrowLeft") { keys.left = false; }
    if(e.key == "ArrowRight") { keys.right = false; }

    if(e.key == "w" || e.key == "W") { keys.up = false; }
    if(e.key == "s" || e.key == "S") { keys.down = false; }
    if(e.key == "a" || e.key == "A") { keys.left = false; }
    if(e.key == "d" || e.key == "D") { keys.right = false; }

    if(e.key == " ") { keys.space = false; }
    if(e.key == "x" || e.key == "X") { keys.x = false; }
    if(e.key == "Enter") { keys.enter = false; }
});