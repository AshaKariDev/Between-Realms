var particles = [];

function addParticle(x, y, vx, vy, type, color = "#ffffff", size = 5, lifespan = 600) {
    var particle = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        type: type,
        color: color,
        size: size,
        birth: frames,
        lifespan: lifespan
    };
    particles.push(particle);
    return particle;
}

function updateParticles() {
    // - Render particles
    for(var i in particles) {
        // Colored particle
        if(particles[i].type == 0) {
            ctx.fillStyle = particles[i].color;
            ctx.fillRect(
                particles[i].x - particles[i].size/2,
                particles[i].y - particles[i].size/2,
                particles[i].size,
                particles[i].size
            )
        }
        // Explosion for enemies
        if(particles[i].type == 1) {
            ctx.drawImage(
                getImage("explosion1"),
                particles[i].x - 45,
                particles[i].y - 45,
                90,
                90
            );
        }
        // Explosion for player
        if(particles[i].type == 2) {
            ctx.save();
            ctx.translate(particles[i].x, particles[i].y);
            if(particles[i].vx > 0) {
                ctx.scale(-1, 1);
            }
            ctx.drawImage(
                getImage("explosion2"),
                -20,
                -60,
                40,
                120
            );
            ctx.restore();
        }
        // Rift in space-time
        if(particles[i].type == 3) {
            ctx.drawImage(
                getImage("rift"),
                particles[i].x - 60,
                particles[i].y - 60,
                120,
                120
            );
        }
        // Caution
        if(particles[i].type == 4) {
            ctx.drawImage(
                getImage("caution"),
                particles[i].x - 80,
                particles[i].y - 80,
                160,
                160
            );
        }
        // Rock
        if(particles[i].type == 5) {
            ctx.drawImage(
                getImage("rock"),
                particles[i].x - 40,
                particles[i].y - 40,
                80,
                80
            );
        }
    }

    // - Particle behavior
    for(var i in particles) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;

        if(particles[i].type == 0) {
            if(frames - particles[i].birth >= particles[i].lifespan) {
                particles[i].dead = true;
            }
        }

        if(particles[i].type == 1) {
            if(frames - particles[i].birth >= 3) {
                particles[i].dead = true;
            }
        }

        if(particles[i].type == 2) {
            if(frames - particles[i].birth >= 25) {
                particles[i].dead = true;
            }
        }

        if(particles[i].type == 3) {
            if(frames%3) {
                var a = 6.283*random();
                addParticle(
                    particles[i].x,
                    particles[i].y+10,
                    1*Math.sin(a),
                    1*Math.cos(a)+particles[i].vy,
                    0, "#c080ffc0", 5, 60
                );
            }
            if(particles[i].y >= 320) {
                particles[i].vy = 0;
            }
            if(frames - particles[i].birth >= 280) {
                if((frames - particles[i].birth - 280)%6 == 0) {
                    for(var j = 0; j < 6; j++) {
                        addParticle(
                            particles[i].x,
                            particles[i].y,
                            10*Math.cos((frames - particles[i].birth - 280)/10 + 6.283*j/6), 
                            10*Math.sin((frames - particles[i].birth - 280)/10 + 6.283*j/6),
                            0, "#ffffff80", 100, 60
                        );
                    }
                }
            }
            if(frames - particles[i].birth >= 480) {
                addParticle(240, 320, 0, 0, 0, "#ffffff40", 640, 60);
            }
            if(frames - particles[i].birth >= 660) {
                particles[i].dead = true;
            }
        }

        if(particles[i].type == 4) {
            if(frames - particles[i].birth >= 10) {
                particles[i].dead = true;
            }
        }

        if(particles[i].type == 5) {
            if(frames - particles[i].birth >= 300) {
                particles[i].dead = true;
            }
        }
    }

    // - Particle death
    for(var i = 0; i < particles.length; i++) {
        if(particles[i].dead) {
            particles.splice(i, 1);
            i--;
        }
    }
}