var hudHoldX = false;
function updateHUD() {
    ctx.textBaseline = "top";
    ctx.font = "25px 'TeenyTinyPixls'";

    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE " + score, 20, 25);

    ctx.fillText("POWER", 20, 55);
    if(hudHoldX) {
        ctx.fillText("<-- HOLD X", 200, 55);
    }
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(140, 50, 15, 25);
    if(power >= 10) {
        ctx.fillStyle = "#ff8000";
        ctx.fillRect(160, 50, 15, 25);
    }
    if(power >= 20) {
        ctx.fillStyle = "#ffff00";
        ctx.fillRect(180, 50, 15, 25);
    }
    if(power >= 30) {
        ctx.fillStyle = "#ffff80";
        ctx.fillRect(200, 50, 15, 25);
    }
    if(power >= 40) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(220, 50, 15, 25);
    }
    if(power >= 50) {
        ctx.fillStyle = "#80ffff";
        ctx.fillRect(240, 50, 15, 25);
    }
    if(power >= 60) {
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(260, 50, 15, 25);
    }
    if(power >= 70) {
        ctx.fillStyle = "#0080ff";
        ctx.fillRect(280, 50, 15, 25);
    }
    if(power >= 80) {
        ctx.fillStyle = "#0000ff";
        ctx.fillRect(300, 50, 15, 25);
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillText("LIVES " + lives, 20, 85);

    if(gameOver) {
        gameLose();
    }
}