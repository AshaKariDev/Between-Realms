document.getElementById("container").style.transform = "translate(calc(50vw - 240px), calc(50vh - 320px)) scale(" + (innerHeight/640) + ")";
onresize = () => document.getElementById("container").style.transform = "translate(calc(50vw - 240px), calc(50vh - 320px)) scale(" + (innerHeight/640) + ")";


function changeLayout(id) {
    inGame = false;
    var layouts = document.querySelectorAll(".layout");
    for(var i = 0; i < layouts.length; i++) {
        layouts[i].style.display = "none";
        layouts[i].classList.remove("shown");
    }
    document.querySelector(".layout#" + id).style.display = "block";
    setTimeout(() => document.querySelector(".layout#" + id).classList.add("shown"), 1);
}
function changeSublayout(id, ignoreStatus) {
    var sublayouts = document.querySelectorAll(".sublayout");
    
    if(!ignoreStatus && document.querySelector(".sublayout#" + id).style.display == "block") {
        document.querySelector(".sublayout#" + id).style.display = "none";
        return;
    }

    for(var i = 0; i < sublayouts.length; i++) {
        sublayouts[i].style.display = "none";
        sublayouts[i].classList.remove("shown");
    }
    document.querySelector(".sublayout#" + id).style.display = "block";
    setTimeout(() => document.querySelector(".sublayout#" + id).classList.add("shown"), 1);
}
changeLayout("splash-layout");

function splashClick() {
    setTimeout(function() {
        startAudio("menu");
    }, 1000);
    changeLayout("menu-layout");
    changeSublayout("title-sublayout", true);
}

function menuPlay() {
    playCutscene(1);
}

function cutsceneToGame(n) {
    pauseAudio("menu");
    changeLayout("game-layout");
    if(n == 1) {
        startGame();
    }
    startLevel(n);
}

function cutsceneToControls() {
    pauseAudio("menu");
    changeLayout("controls-layout");
    
    setInterval(() => {
        document.querySelector(".controls-tip:nth-child(9)").style.display = "block";
        document.getElementById("controls-layout").onclick = () => cutsceneToGame(1);
    }, 1000);
}

function pauseGame() {
    changeSublayout("pause-sublayout");
    pauseAllAudio();
    gameActive = false;
    inGame = true;
}

function unpauseGame() {
    changeSublayout("pause-sublayout");
    resumeAllAudio();
    gameActive = true;
    inGame = true;
}

var inGame = false;
document.addEventListener("keydown", (e) => {
    if(inGame && e.key == "Enter") {
        if(gameActive) {
            pauseGame();
        } else {
            unpauseGame();
        }
    }
});

function gameLose() {
    gameActive = false;
    pauseAllAudio();
    playAudio("explode");
    changeLayout("gameover-layout");
}