// - Set volumes of audio assets
var audioList = document.querySelectorAll("audio");
for(var i = 0; i < audioList.length; i++) {
    if(audioList[i].getAttribute("volume")) {
        audioList[i].volume = audioList[i].getAttribute("volume");
    }
}

function startAudio(id, cont = false) {
    if(!(cont && !document.querySelector("audio#" + id).paused)) {
        document.querySelector("audio#" + id).currentTime = 0;
    }
    document.querySelector("audio#" + id).play();
}

function playAudio(id) {
    document.querySelector("audio#" + id).play();
}

function pauseAudio(id) {
    document.querySelector("audio#" + id).pause();
}

function pauseAllAudio() {
    for(var i = 0; i < audioList.length; i++) {
        if(!audioList[i].paused) {
            audioList[i].toBeResumed = true;
            audioList[i].pause();
        } else {
            audioList[i].toBeResumed = false;
        }
    }
}

function resumeAllAudio() {
    for(var i = 0; i < audioList.length; i++) {
        if(audioList[i].toBeResumed) {
            audioList[i].play();
        }
    }
}

function getImage(id) {
    return document.querySelector("img#" + id);
}

function drawBackground(id) {
    ctx.drawImage(
        getImage(id),
        0,
        backgroundScroll,
        480,
        backgroundHeight
    );
    ctx.drawImage(
        getImage(id),
        0,
        backgroundScroll - backgroundHeight,
        480,
        backgroundHeight
    );
}