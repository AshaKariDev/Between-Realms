var enemies = [];

function addEnemy(x, y, type, arg1, arg2) {
    // Listing out the types of enemies in the game.
    var enemy;
    if(type == 1) {
        enemy = {
            x: x,
            y: y,
            w: 80,
            h: 80,
            vy: 2,
            type: type,
            health: 1,
            score: 100
        };
    }
    if(type == 2) {
        enemy = {
            x: x,
            y: y,
            w: 120,
            h: 120,
            type: type,
            health: 5,
            score: 300
        };
    }
    if(type == 3) {
        enemy = {
            x: x,
            y: y,
            w: 30,
            h: 50,
            type: type,
            health: 1,
            score: 0
        };
    }
    if(type == 4) {
        enemy = {
            x: x,
            y: y,
            w: 90,
            h: 90,
            type: type,
            health: 50,
            score: 0
        };
    }
    if(type == 5) {
        enemy = {
            x: x,
            y: y,
            w: 60,
            h: 40,
            type: type,
            health: 1,
            score: 10,
            offset: frames
        };
    }
    if(type == 6) {
        enemy = {
            x: x,
            y: y,
            w: 30,
            h: 60,
            type: type,
            health: 1000,
            score: 10
        };
    }
    if(type == 7) {
        enemy = {
            x: x,
            y: y,
            w: 200,
            h: 100,
            type: type,
            health: 500,
            score: 5000,
            strong: true,
            ref4: false
        };
    }
    if(type == 8) {
        enemy = {
            x: x,
            y: y,
            w: 15,
            h: 15,
            type: type,
            health: 1,
            score: 0,
            vx: arg1,
            vy: arg2
        };
    }
    if(type == 9) {
        enemy = {
            x: x,
            y: y,
            w: 80,
            h: 80,
            type: type,
            health: 3,
            score: 200,
            birth: frames
        };
    }
    enemies.push(enemy);
    return enemy;
}

function updateEnemies() {
    // - Render Enemies

    // -- Z-Index 1
    for(var i in enemies) {
        // Missile (Enemy Type 3) is rendered before Missile Launcher (Enemy Type 2)
        // to better sell the effect that the Missile is exiting the Missile Launcher
        if(enemies[i].type == 3) {
            ctx.drawImage(
                getImage("enemy3"),
                enemies[i].x - 15,
                enemies[i].y - 25,
                30,
                50
            );
        }
        if(enemies[i].type == 6) {
            ctx.drawImage(
                getImage("enemy6"),
                enemies[i].x - 15,
                enemies[i].y - 30,
                30,
                60
            );
        }
        if(enemies[i].type == 8) {
            ctx.drawImage(
                getImage("enemy8"),
                enemies[i].x - 7.5,
                enemies[i].y - 7.5,
                15,
                15
            );
        }
    }

    // -- Z-Index 2
    for(var i in enemies) {
        if(enemies[i].type == 1) {
            ctx.drawImage(
                getImage("enemy1"),
                enemies[i].x - 40,
                enemies[i].y - 40,
                80,
                80
            );
        }
        if(enemies[i].type == 2) {
            ctx.drawImage(
                getImage("enemy2"),
                enemies[i].x - 60,
                enemies[i].y - 60,
                120,
                120
            );
        }
        if(enemies[i].type == 4) {
            ctx.drawImage(
                getImage("enemy4"),
                enemies[i].x - 45,
                enemies[i].y - 45,
                90,
                90
            );
        }
        if(enemies[i].type == 5) {
            ctx.drawImage(
                getImage("enemy5"),
                enemies[i].x - 30,
                enemies[i].y - 20,
                60,
                40
            );
        }
        if(enemies[i].type == 7) {
            ctx.drawImage(
                getImage("enemy7"),
                enemies[i].x - 100,
                enemies[i].y - 100,
                200,
                200
            );
        }
        if(enemies[i].type == 9) {
            ctx.drawImage(
                getImage("enemy9"),
                enemies[i].x - 40,
                enemies[i].y - 40,
                80,
                80
            );
        }
    }

    // - Enemy interaction
    for(var i in enemies) {
        if(
            !gameOver && respawnTimer <= 0 && !player.immune &&
            player.x + player.w/2 > enemies[i].x - enemies[i].w/2 &&
            player.x - player.w/2 < enemies[i].x + enemies[i].w/2 &&
            player.y + player.h/2 > enemies[i].y - enemies[i].h/2 &&
            player.y - player.h/2 < enemies[i].y + enemies[i].h/2
        ) {
            if(!enemies[i].strong && !enemies[i].immune) {
                enemies[i].dead = true;
                addParticle(enemies[i].x, enemies[i].y, 0, -10, 1);
                addParticle(enemies[i].x, enemies[i].y, 9, 5, 1);
                addParticle(enemies[i].x, enemies[i].y, -9, 5, 1);
            }
            startAudio("explode");
            addParticle(player.x, player.y, -20, 0, 2);
            addParticle(player.x, player.y, 20, 0, 2);
            player.x = 240;
            player.y = 480;
            lives--;
            respawnTimer = 240;
            if(lives <= 0) {
                gameOver = true;
            }
        }
        for(var j in bullets) {
            if(
                bullets[j].x + bullets[j].w/2 > enemies[i].x - enemies[i].w/2 &&
                bullets[j].x - bullets[j].w/2 < enemies[i].x + enemies[i].w/2 &&
                bullets[j].y + bullets[j].h/2 > enemies[i].y - enemies[i].h/2 &&
                bullets[j].y - bullets[j].h/2 < enemies[i].y + enemies[i].h/2
            ) {
                if(!enemies[i].immune) {
                    enemies[i].health--;
                }
                if(enemies[i].health <= 0) {
                    enemies[i].dead = true;
                    score += enemies[i].score;
                    startAudio("explode");
                    addParticle(enemies[i].x, enemies[i].y, 0, -10, 1);
                    addParticle(enemies[i].x, enemies[i].y, 9, 5, 1);
                    addParticle(enemies[i].x, enemies[i].y, -9, 5, 1);
                }
                bullets[j].dead = true;
            }
        }
    }

    // - Enemy behavior
    for(var i in enemies) {
        // Enemy Type 1 "Glider":  Glides from the top of the
        // screen down
        if(enemies[i].type == 1) {
            if(enemies[i].y < 160) {
                enemies[i].y += 2;
            } else {
                if(!enemies[i].hasShot) {
                    var blt = addEnemy(enemies[i].x, enemies[i].y, 8);
                    var dist = Math.hypot(enemies[i].x - player.x, enemies[i].y - player.y);
                    blt.vx = 5 * (player.x - enemies[i].x)/dist;
                    blt.vy = 5 * (player.y - enemies[i].y)/dist;
                    enemies[i].hasShot = true;
                }
                enemies[i].y += 3;
            }
        }
        // Enemy Type 2 "Missile Launcher": Glides from the top of
        // the screen down and shoots missiles from its cannons
        if(enemies[i].type == 2) {
            if(enemies[i].y <= 60) {
                enemies[i].y += 5;
            } else if(enemies[i].y <= 180) {
                enemies[i].y += 1;
            } else {
                enemies[i].y += 3;
            }
            if(enemies[i].y > 60 && enemies[i].y < 180) {
                if(frames%60 == 0) {
                    addEnemy(enemies[i].x - 25, enemies[i].y - 25, 3);
                }
                if((frames + 30)%60 == 0) {
                    addEnemy(enemies[i].x + 25, enemies[i].y - 25, 3);
                }
            }
        }
        // Enemy Type 3 "Missile": Launches from the Missile
        // Launcher periodically
        if(enemies[i].type == 3) {
            enemies[i].y += 4;
            if(player.x > enemies[i].x) {
                enemies[i].x += 1;
            }
            if(player.x < enemies[i].x) {
                enemies[i].x -= 1;
            }
        }
        // Enemy Type 4 "Asteroid": Glides from the top of the
        // screen down
        if(enemies[i].type == 4) {
            enemies[i].y += 1.5;
        }
        // Enemy Type 5 "Laser Shooter": Rides behind an asteriod
        // and shoots behind player
        if(enemies[i].type == 5) {
            enemies[i].y += 1.5;
            if(enemies[i].y < 840 && (frames + enemies[i].offset)%180 >= 120) {
                addEnemy(enemies[i].x, enemies[i].y, 6);
            }
        }
        // Enemy Type 6 "Enemy Laser": Is shot from Laser Shooter,
        // forming a line reaching the top of the screen
        if(enemies[i].type == 6) {
            enemies[i].y -= 60;
        }
        // Enemy Type 7 "Mega-Glider": The first boss, flies side
        // to side shooting lassers
        if(enemies[i].type == 7) {
            addParticle(enemies[i].x - 55, enemies[i].y - 95, 0, -3, 0, "#ff0000", 20, 3);
            addParticle(enemies[i].x - 55, enemies[i].y - 95, 0, -2, 0, "#ff8000", 10, 3);
            addParticle(enemies[i].x - 55, enemies[i].y - 95, 0, -1, 0, "#ffff00", 5, 3);

            addParticle(enemies[i].x + 55, enemies[i].y - 95, 0, -3, 0, "#ff0000", 20, 3);
            addParticle(enemies[i].x + 55, enemies[i].y - 95, 0, -2, 0, "#ff8000", 10, 3);
            addParticle(enemies[i].x + 55, enemies[i].y - 95, 0, -1, 0, "#ffff00", 5, 3);

            if(!enemies[i].ref4) {
                enemies[i].y += 20;

                if(enemies[i].y > 740) {
                    enemies[i].y = -100;
                    enemies[i].ref4 = true;
                }
            } else {
                if(enemies[i].y < 100) {
                    // Moving down into position
                    enemies[i].y += 5;
                    enemies[i].ref = frames;
                } else if(frames - enemies[i].ref < 480) {
                    // Fly side to side
                    if((frames - enemies[i].ref + 60)%240 <= 120) {
                        enemies[i].x += 2;
                    }
                    if((frames - enemies[i].ref + 180)%240 <= 120) {
                        enemies[i].x -= 2;
                    }
                    if(frames%120 < 60 && frames%5 == 0) {
                        addEnemy(enemies[i].x - 15.5 * 5, enemies[i].y, 8, 0, 10);
                        addEnemy(enemies[i].x - 12.5 * 5, enemies[i].y, 8, 0, 10);
                        addEnemy(enemies[i].x - 5.5 * 5, enemies[i].y, 8, 0, 10);
                        addEnemy(enemies[i].x + 15.5 * 5, enemies[i].y, 8, 0, 10);
                        addEnemy(enemies[i].x + 12.5 * 5, enemies[i].y, 8, 0, 10);
                        addEnemy(enemies[i].x + 5.5 * 5, enemies[i].y, 8, 0, 10);
                    }
                    enemies[i].ref2 = enemies[i].health;
                    enemies[i].ref3 = enemies[i].health;
                } else if(enemies[i].ref2 - enemies[i].health > 30) {
                    // Return upwards if damaged enough
                    enemies[i].x += (240 - enemies[i].x)/4;
                    enemies[i].y -= 7;
                } else if(enemies[i].ref3 - enemies[i].health > 0) {
                    // Be pushed back bullets
                    enemies[i].y -= 10;
                    if(enemies[i].y < 100) {
                        enemies[i].y = 100;
                    }
                    enemies[i].ref3 = enemies[i].health;
                } else if(enemies[i].y < 740) {
                    // Move downward and track player
                    enemies[i].y += 3;
                    if(player.x - enemies[i].x < 0) {
                        enemies[i].x--;
                    }
                    if(player.x - enemies[i].x > 0) {
                        enemies[i].x++;
                    }
                } else {
                    enemies[i].y = -150;
                    enemies[i].x = 240;
                }
                // else if(frames - enemies[i].ref4 < 120) {
                //     if(frames - enemies[i].ref4)
                //     // Track player and shoot lasers
                //     addEnemy(enemies[i].x, enemies[i].y, 6);
                // } else {
                //     // Return upwards after laser
                //     enemies[i].x += (240 - enemies[i].x)/4;
                //     enemies[i].y -= 4;
                //     enemies[i].ref5 = true;
                // }
            }
            if(enemies[i].dead) {
                pauseAudio("boss");
                levelWinTimer = 240;
            }
        }
        // Enemy Type 8 "Enemy Bullet": Ancient bullet technology
        if(enemies[i].type == 8) {
            enemies[i].y += enemies[i].vy;
            enemies[i].x += enemies[i].vx;
        }
        // Enemy Type 9 "Dodger"
        if(enemies[i].type == 9) {
            if(enemies[i].y < 200 || frames - enemies[i].birth > 300) {
                enemies[i].ref = 400*random() + 40;
                enemies[i].y += 10;
            } else {
                if(enemies[i].health == 2) {
                    if(enemies[i].y < 250) {
                        enemies[i].x += (enemies[i].ref - enemies[i].x)/10;
                        enemies[i].y += 5;
                        enemies[i].immune = true;
                    } else {
                        enemies[i].immune = false;
                        enemies[i].ref = 400*random() + 40;
                    }
                }

                if(enemies[i].health == 1) {
                    if(enemies[i].y < 300) {
                        enemies[i].x += (enemies[i].ref - enemies[i].x)/10;
                        enemies[i].y += 5;
                        enemies[i].immune = true;
                    } else {
                        enemies[i].immune = false;
                        enemies[i].ref = 400*random() + 40;
                    }
                }

                if(frames%120 == 0 || frames%120 == 5 || frames%120 == 10) {
                    var blt = addEnemy(enemies[i].x, enemies[i].y, 8);
                    var dist = Math.hypot(enemies[i].x - player.x, enemies[i].y - player.y);
                    blt.vx = 5 * (player.x - enemies[i].x)/dist;
                    blt.vy = 5 * (player.y - enemies[i].y)/dist;
                }
            }
        }
    }

    // - Kill enemies off screen
    for(var i in enemies) {
        if(enemies[i].y > 1140 || enemies[i].y < -500) {
            enemies[i].dead = true;
        }
    }

    // - Enemy death
    for(var i = 0; i < enemies.length; i++) {
        if(enemies[i].dead) {
            enemies.splice(i, 1);
            i--;
        }
    }
}