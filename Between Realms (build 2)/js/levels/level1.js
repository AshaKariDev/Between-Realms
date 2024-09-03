function updateLevel1() {
    // Refresh screen
    backgroundHeight = 640;
    drawBackground("background1");

    // Transition Sequences
    if(levelStartTimer > 0) {
        levelStartTimer--;
        backgroundSpeed = 3;
        player.y -= 2;
    }

    if(levelWinTimer > 0) {
        levelWinTimer--;
        if(levelWinTimer > 60 && levelWinTimer < 120) {
            backgroundSpeed += 0.25;
        }
        if(levelWinTimer > 120) { 
            player.y += (480 - player.y)/10;
            player.x += (240 - player.x)/10;
        } else if(levelWinTimer < 90) {
            player.y -= 10;
        }
        if(levelWinTimer == 1) {
            return playCutscene(2);
        }
    }

    // Level Timing
    var lframes = frames - levelFrame;

    if(lframes == 1) {
        pauseAllAudio();
    }

    if(lframes < 540) {
        startAudio("load", true);
    } else {
        pauseAudio("load");
    }
    

    if(lframes%3 == 0) {
        addParticle(480*Math.random(), 0, 0, 10*Math.ceil(Math.random()*2), 0, "#ffffff80", 5, 600);
    }

    if(lframes < 4800 && lframes%120 == 0) {
        addParticle(120*random()+20, -50-50*random(), 0, 3 + Math.round(random()), 5);
        addParticle(40*random()+340, -50-50*random(), 0, 3 + Math.round(random()), 5);
    }

    // - Tips
    // ctx.font = "25px 'TeenyTinyPixls'";
    // if(lframes > 60 && lframes < 240) {
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillText("Use ARROW KEYS to move", 20, 400);
    // }

    // if(lframes > 270 && lframes < 450) {
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillText("Press SPACE to shoot", 20, 400);
    // }

    // if(lframes > 480 && lframes < 720) {
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillText("Hold X to charge your ", 20, 400);
    //     ctx.fillText("POWER then press SPACE", 20, 430);
    //     ctx.fillText("to release SPECIAL", 20, 460);
    // }

    if(lframes == 720) {
        startAudio("level1");
    }

    // - Enemy Spawning
    if(lframes < 3950) {
        if(lframes >= 720 && (lframes - 720)%240 == 0) {
            addEnemy(240, -100, 1);
            addEnemy(160, -180, 1);
            addEnemy(320, -180, 1);
            addEnemy(80, -260, 1);
            addEnemy(400, -260, 1);
        }
        if(lframes >= 1320 && (lframes - 1320)%960 == 0) {
            addEnemy(320, -100, 2);
        }
        if(lframes >= 1800 && (lframes - 1800)%960 == 0) {
            addEnemy(160, -100, 2);
        }
        if(lframes >= 1980 && (lframes - 1980)%540 == 0) {
            addEnemy(240, -100, 4);
        }
        if(lframes >= 2160 && (lframes - 2160)%540 == 0) {
            addEnemy(360, -100, 4);
        }
        if(lframes >= 2340 && (lframes - 2340)%540 == 0) {
            addEnemy(120, -100, 4);
        }
        // if(lframes == 2520) {
        //     addEnemy(240, -150, 5);
        // }
        // if(lframes == 2700) {
        //     addEnemy(360, -150, 5);
        // }
        // if(lframes == 2880) {
        //     addEnemy(120, -150, 5);
        // }
    } else if(lframes == 4020) {
        addEnemy(0, -125, 4);
        addEnemy(96, -100, 4);
        addEnemy(192, -175, 4);
        addEnemy(288, -150, 4);
        addEnemy(384, -175, 4);
        addEnemy(480, -125, 4);
    } else if(lframes == 4500) {
        pauseAudio("level1");
        startAudio("warning");
    } else if(lframes > 4500 && lframes < 4800) {
        if(lframes%20 == 0) {
            addParticle(240, 140, 0, 0, 4);
        }
        if(lframes%20 == 3) {
            addParticle(240, 320, 0, 0, 4);
        }
        if(lframes%20 == 6) {
            addParticle(240, 500, 0, 0, 4);
        }
    } else if(lframes >= 4800) {
        if(lframes == 4800) {
            pauseAudio("warning");
            startAudio("boss");
            addEnemy(240, -100, 7);
        }
    }

    if(lframes > 4020 && lframes < 4500 && lframes%12 < 6) {
        hudHoldX = true;
    } else {
        hudHoldX = false;
    }
}

levelUpdates[0] = updateLevel1; 