var cutsceneImages = [
    /* Cutscene 1 */ 0, 0, 1, 2, 2, 3, 3, 4, 4, 4,
    /* Cutscene 2 */ 4, 4
];
var cutsceneTextIndex = 0;
// var cutsceneIndex = 0;

var cutsceneSequence = [
    0, 10
];

var ctexts = document.querySelectorAll(".cutscene-text");
var cimages = document.querySelectorAll(".cutscene-image");

function playCutscene(n) {
    startAudio("menu", true);
    cutsceneTextIndex = cutsceneSequence[n - 1];
    changeLayout("cutscene-layout");
    progressCutscene();
}

function progressCutscene() {
    var cargs = ctexts[cutsceneTextIndex].innerHTML.split(" ");

    if(cargs[0] == "..play") {
        if(cargs[1] == 1) {
            cutsceneToControls();
        } else {
            cutsceneToGame(cargs[1]);
            cutsceneTextIndex++;
        }
        return;
    }

    for(var i = 0; i < ctexts.length; i++) {
        ctexts[i].style.display = "none";
    }

    for(var i = 0; i < cimages.length; i++) {
        cimages[i].style.display = "none";
    }

    ctexts[cutsceneTextIndex].style.display = "block";
    cimages[cutsceneImages[cutsceneTextIndex]].style.display = "block";

    document.querySelector("#cutscene-textcover").style.transitionDuration = "0s";
    document.querySelector("#cutscene-textcover").classList.remove("reveal");
    setTimeout(function() {
        document.querySelector("#cutscene-textcover").style.transitionDuration = "10s";
        document.querySelector("#cutscene-textcover").classList.add("reveal");
    }, 100);
    cutsceneTextIndex++;
}