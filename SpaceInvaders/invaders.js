const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

        this.radius = 3;
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

const player = new Player();
const projectiles = [];

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

function GameUpdate() {
    requestAnimationFrame(GameUpdate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    player.Update();

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

    //UI
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press 'B' to go back!", 10, 50);

}

GameUpdate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("keydown", ({key}) => {
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
        case 'b':
            window.location.href = "../index.html";
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

