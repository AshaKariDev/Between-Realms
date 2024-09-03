var bullets = [];

function addBullet(x, y, type = 1) {
    var bullet;
    if(type == 1) {
        bullet = {
            x: x,
            y: y,
            w: 30,
            h: 30,
            type: 1
        };
    }
    bullets.push(bullet);
    return bullet;
}

function updateBullets() {
    // - Render bullets
    for(var i in bullets) {
        ctx.drawImage(
            getImage("bullet"),
            bullets[i].x - 15,
            bullets[i].y - 15,
            30,
            30
        );
    }

    // - Bullet behavior
    for(var i in bullets) {
        bullets[i].y -= 20;
    }

    // - Kill bullets off screen
    for(var i in bullets) {
        if(bullets[i].y < -15) {
            bullets[i].dead = true;
        }
    }

    // - Bullet death
    for(var i = 0; i < bullets.length; i++) {
        if(bullets[i].dead) {
            bullets.splice(i, 1);
            i--;
        }
    }
}