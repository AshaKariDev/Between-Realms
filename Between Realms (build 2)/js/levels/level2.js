function updateLevel2() {
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
            return startLevel(1);
        }
    }

    // Level Timing
    var lframes = frames - levelFrame;
    
    if(lframes == 1) {
        pauseAllAudio();
    }

    // - Refresh screen
    backgroundHeight = 640;
    if(lframes < 1560) {
        drawBackground("background2");
    } else {
        drawBackground("background3");
    }

    if(lframes < 300) {
        startAudio("load", true);
    } else {
        pauseAudio("load");
    }

    if(lframes == 300) {
        startAudio("level2");
    }

    if(lframes%3 == 0) {
        addParticle(480*Math.random(), 0, 0, 10, 0, "#ffffff80", 5, 600);
    }
    if(lframes == 300) {
        addEnemy(96, -100, 1);
        addEnemy(288, -200, 1);
        addEnemy(192, -300, 1);
    }
    if(lframes == 600) {
        addEnemy(360, -100, 1);
        addEnemy(240, -500, 1);
    }
    if(lframes == 900) {
        // The player will approach a rip in space-time.
        // It will stop in the middle of the screen and
        // expand, consuming the player. This will cause
        // the background to change, signifying that we
        // are in a new realm.
        addParticle(240, -160, 0, 3, 3);
    }
    // if(lframes >= 1380 && lframes < 1560) {
    //     addParticle(240, 320, 0, 0, 0, "#ffffff40", 640, 60);
    // }
    if(lframes >= 1620 && lframes <= 2020 && lframes%48 == 0) {
        addEnemy(80, -100, 1);
    }
    if(lframes >= 2020 && lframes <= 2420 && lframes%48 == 0) {
        addEnemy(400, -100, 1);
    }
    if(lframes >= 2420 && lframes <= 2820 && lframes%48 == 0) {
        addEnemy(80, -100, 1);
    }
    if(lframes >= 2820 && lframes <= 3220 && lframes%48 == 0) {
        addEnemy(400, -100, 1);
    }
    
    if(lframes >= 1620 && lframes < 3220 && lframes%240 == 0 && (lframes - 1620)%540 < 300) {
        addEnemy(200, -100, 2);
    }
    if(lframes >= 1620 && lframes < 3220 && lframes%240 == 120 && (lframes - 1620)%540 < 300) {
        addEnemy(280, -100, 2);
    }

    if(lframes == 1980) {
        addEnemy(180, -100, 9);
    }

    if(lframes == 2160) {
        addEnemy(360, -100, 9);
    }

    if(lframes == 2520) {
        addEnemy(280, -100, 9);
    }

    if(lframes == 2700) {
        addEnemy(60, -100, 9);
    }

    if(lframes >= 3240 && lframes <= 3840 && (lframes - 3240)%90 == 0) {
        addEnemy(320*random() + 80, -100, 9);
    }

    if(lframes == 7200) {
        levelWinTimer = 240;
    }
    
}

levelUpdates[1] = updateLevel2; 