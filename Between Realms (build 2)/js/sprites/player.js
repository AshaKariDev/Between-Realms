var player = {
    x: 240,
    y: 680,
    w: 40,
    h: 40,
    
    hasShot: false,
    immune: false,

    vx: 0,
    vy: 0
};

function updatePlayer() {
    if(!gameOver && respawnTimer <= 120) {
        // - Render player
        ctx.drawImage(
            getImage("ship"),
            player.x - 30,
            player.y - 40,
            60,
            80
        );

        if(levelWinTimer <= 0 && levelStartTimer <= 0) {
            // - Player movement controls
            if(powerTimer <= 0) {
                if(keys.right) { player.x += 5; }
                if(keys.left) { player.x -= 5; }
                if(keys.down) { player.y += 5; }
                if(keys.up) { player.y -= 5; }
            }

            // - Keep blayer in bounds
            if(player.x < player.w/2) { player.x = player.w/2; }
            if(player.x > 480 - player.w/2) { player.x = 480 - player.w/2; }
            if(player.y < player.h/2) { player.y = player.h/2; }
            if(player.y > 640 - player.h/2) { player.y = 640 - player.h/2; }

            // - Allow player to shoot
            if(!keys.x && keys.space && !player.hasShot && powerTimer <= 0) {
                startAudio("shoot");
                addBullet(player.x, player.y);
                player.hasShot = true;
            }
            if(!keys.space) {
                player.hasShot = false;
            }
            // -- Use the special
            if(keys.x && keys.space && power == 90) {
                power = 0;
                powerTimer = 30;
                startAudio("special");
            }
            if(powerTimer > 0) {
                addBullet(player.x - 15, player.y);
                addBullet(player.x, player.y);
                addBullet(player.x + 15, player.y);
            }
            powerTimer--;
    
            // - Build up power
            if(keys.x) {
                if(power < 90) {
                    power += 0.5;
                }
            } else {
                if(power > 0) {
                    power--;
                }
            }
        }
    }
    respawnTimer--;
}