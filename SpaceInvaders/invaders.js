const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const score = document.getElementById("scoreElement");

canvas.width = 1280;
canvas.height = 720;

class Player {
    constructor() {

        this.speed = 5;
        this.tilt = 0.15;
        
        // sets velocity of player
        this.velocity = {
            x: 0,
            y: 0
        };

        this.rotation = 0;
        this.opacity = 1;
        
        const image = new Image();
        image.src = "./img/spaceship.png";
        
        image.onload = () => {
            
            const scale = 0.3;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            
            // sets position of player
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 50
            };
        };
    }

    Draw() {

        if (this.image) {
            ctx.fillStyle = "green";
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);

            ctx.rotate(this.rotation);

            ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
            
            ctx.restore();
        }

    }

    Update() {
        
        if (this.image) {
            this.Draw();
            this.position.x += this.velocity.x;
        }
    }
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;

        this.radius = 4;
        this.speed = 5;
    }

    Draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    Update() {
        this.Draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Particle {
    constructor({position, velocity, radius, color, fades}) {
        this.position = position;
        this.velocity = velocity;

        this.radius = radius;
        this.color = color;

        this.opacity = 1;
        this.fade = fades
    }

    Draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    Update() {
        this.Draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.fade) this.opacity -= 0.01;
    }
}

class InvaderProjectile {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;

        this.width = 3;
        this.height = 10;
    }

    Draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    Update() {
        this.Draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Invader {
    constructor({position}) {

        this.speed = 5;
        this.tilt = 0.15;
        
        // sets velocity of player
        this.velocity = {
            x: 0,
            y: 0
        };
        
        const image = new Image();
        image.src = "./img/invader.png";
        
        image.onload = () => {
            
            const scale = 0.3;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            
            // sets position of player
            this.position = {
                x: position.x,
                y: position.y
            };
        };
    }

    Draw() {

        if (this.image) {
            ctx.fillStyle = "red";
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
            
        }

    }

    Update({velocity}) {
        
        if (this.image) {
            this.Draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    Shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }));

        console.log(invaderProjectiles);
    }
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };

        this.velocity = {
            x: 2,
            y: 0
        };

        this.invaders = [];

        const columns = Math.floor(Math.random() * 7 + 5);
        const rows = Math.floor(Math.random() * 3 + 2);

        this.width = columns * 80;

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({position: {
                    x: x * 80,
                    y: y * 80
                }}));
            }
        }
    }

    Update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 80;
        }
    }
}

const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};
player.Draw();

let frames = 0;
let randomInterval = Math.floor((Math.random() * 1000) + 500);
let game = {
    over: false,
    active: true
};
let playerScore = 0;

for (let index = 0; index < 100; index++) {
    particles.push(new Particle({
        position: {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height)
        },
        velocity: {
            x: 0,
            y: 0.3
        },
        radius: Math.random() * 3 + 1,
        color: 'white'
    }));
}

function CreateParticles({object, newColor, canFade}) {
    for (let index = 0; index < 15; index++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.2) * 2,
                y: (Math.random() - 0.2) * 2
            },
            radius: Math.random() * 10 + 1,
            color: newColor || '#EEB309',
            fades: canFade || false
        }));
    }
}

function GameUpdate() {
    if (game.active === false) return;
    
    requestAnimationFrame(GameUpdate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    player.Update();

    particles.forEach((particle, index) => {
        
        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }
        
            if (particle.opacity <= 0) {
                setTimeout(() => {
                    particles.splice(index, 1);
                }, 1);
            }
            particle.Update();
        }
    );

    invaderProjectiles.forEach((projectile, index) => {
        
        if (projectile.position.y + projectile.height > canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
            }, 0);
        } else { projectile.Update(); }

        if (projectile.position.y + projectile.height >= player.position.y &&
            projectile.position.x + projectile.width >= player.position.x &&
            projectile.position.x <= player.position.x + player.width &&
            projectile.position.y <= player.position.y + player.height) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1);

                    CreateParticles(
                        {
                            object: player,
                            newColor: '28AF07',
                            canFade: true
                        }
                    );

                    setTimeout(() => {
                        player.opacity = 0;
                        game.over = true;
                    }, 0);

                    setTimeout(() => {
                        game.active = false;
                    }, 2000);
                }, 0);
            }
        
    });
    
    grids.forEach((grid, gridIndex) => {
        grid.Update();

        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].Shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, invaderIndex) => {
            invader.Update({velocity: grid.velocity});
            
            //enemy collision detection
            projectiles.forEach((projectile, index) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y) {
                    
                        

                        setTimeout(() => {
                        const invaderFound = grid.invaders.find(invader2 => {
                            return invader2 === invader;
                        });

                        const projectileFound = projectiles.find(projectile2 => {
                            return projectile2 === projectile;
                        });

                        //removes invader and projectile
                       if (invaderFound && projectileFound) {
                            
                            playerScore += 10;
                            score.innerHTML = "Score: " + playerScore;

                            CreateParticles(
                                {
                                    object: invader,
                                    newColor: '#EE3609',
                                    canFade: true
                                }
                            );
                        
                            projectiles.splice(index, 1);
                            grid.invaders.splice(invaderIndex, 1);

                            if (grid.invaders.length === 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width = lastInvader.position.x + lastInvader.width - firstInvader.position.x;
                                grid.position.x = firstInvader.position.x;
                            }
                       }
                       else {
                           grids.splice(gridIndex, 1);
                       }
                    }, 0);
                }
            });
        });
    });

    projectiles.forEach((projectile, index) => {
        
        if (projectile.position.y + projectile.radius < 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
        
        projectile.Update();

    });

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -player.speed;
        player.rotation = -player.tilt;
    }
    else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        player.velocity.x = player.speed;
        player.rotation = player.tilt;
    }
    else {
        player.velocity.x = 0;
        player.rotation = 0;
    }


    if (frames % randomInterval === 0) {
        grids.push(new Grid());
        frames = 0;
        randomInterval = Math.floor((Math.random() * 1000) + 500);
    }

    
    
    frames++;

}

GameUpdate();

window.addEventListener("keydown", ({key}) => {
    if (key === 'b') window.location.href = "../index.html";
    
    if (game.over) return;
    
    
    switch (key) {
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case ' ':
            keys.space.pressed = true;
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -7
                }
            }));
            break;
    }
});

window.addEventListener("keyup", ({key}) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
});

function goBack() {
    window.location.href = "../WebGames/mainMenu.html";
}

