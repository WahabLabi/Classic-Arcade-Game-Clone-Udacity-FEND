let chars = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
let charChoice = [chars[0]];
let lives = document.querySelector('.lives');
let score = document.querySelector('.score');
let livesCount = 3;
let scoreCount = 0;
let reStart;
let cloak = document.querySelector('.button');



function rePlayerChar() {
        char1 = document.querySelector('#one');
        char1.addEventListener('click', function() {
            charChoice = [];
            charChoice.push('images/char-boy.png');
            player.sprite = charChoice[0];
        })

        char1 = document.querySelector('#two');
        char1.addEventListener('click', function() {
            charChoice = [];
            charChoice.push('images/char-cat-girl.png');
            player.sprite = charChoice[0];
        })

        char1 = document.querySelector('#three');
        char1.addEventListener('click', function() {
            charChoice = [];
            charChoice.push('images/char-horn-girl.png');
            player.sprite = charChoice[0];
        })

        char1 = document.querySelector('#four');
        char1.addEventListener('click', function() {
            charChoice = [];
            charChoice.push('images/char-pink-girl.png');
            player.sprite = charChoice[0];
        })

        char1 = document.querySelector('#five');
        char1.addEventListener('click', function() {
            charChoice = [];
            charChoice.push('images/char-princess-girl.png');
            player.sprite = charChoice[0];
        })
}
window.onload = rePlayerChar();

function reVisibility() {
    cloak.addEventListener('click', function() {
        document.querySelector('.disappearing').classList.add('invisible');
    });
}
window.onload = reVisibility();

class Enemies {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    
    update(dt) {
        this.x < 500 ? this.x += this.speed * dt : this.x = -100;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Players extends Enemies {
    constructor() {
        super();
        this.sprite = charChoice[0];
        this.x = 200;
        this.y = 400;
    }

    update() {
        if(player.y === 16) {
            scoreCount += 10;
            player.rePlayerScore();
            alert('Success! 👍 😀')
            player.reset();
        }

        allEnemies.forEach((enemy) => {
            let rePlayer = {x: player.x, y: player.y, width: 30, height: 35}
            let reEnemy = {x: enemy.x, y: enemy.y, width: 30, height: 35}
            if (rePlayer.x < reEnemy.x + reEnemy.width && rePlayer.x + rePlayer.width > reEnemy.x &&
            rePlayer.y < reEnemy.y + reEnemy.height && rePlayer.y + rePlayer.height > reEnemy.y) {
                alert('Collision! 😱')
                player.reset();
                livesCount--;
                `${scoreCount}` > 1 ? `${scoreCount--}` : '';
                player.rePlayerLives();
                player.rePlayerScore();
                player.reGameOver();
            }
        })
    }

    rePlayerLives() {
        lives.innerHTML = `Lives = ${livesCount}`;
    }

    rePlayerScore() {
        score.innerHTML = `Score = ${scoreCount}`;
    }

    reGameOver() {
        if(`${livesCount}` == 0) {
            alert('Game Over! 😢');
            livesCount = 3;
            scoreCount = 0;
            lives.innerHTML = 'Lives = 3';
            score.innerHTML = 'Score';
            player.reset();
        } 
    }

    reset() {
        player.x = 200;
        player.y = 400;
    }

    handleInput() {
        return  event.keyCode == 37 && this.x > 0   ? this.x -= 16
             :  event.keyCode == 38 && this.y > 20  ? this.y -= 16
             :  event.keyCode == 39 && this.x < 400 ? this.x += 16
             :  event.keyCode == 40 && this.y < 400 ? this.y += 16
             :  '';
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let random1 = (() => Math.random()*(500-100) + 100)();
let random2 = (() => Math.random()*(500-100) + 100)();
let random3 = (() => Math.random()*(500-100) + 100)();



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Players();
let bugster = new Enemies(-100, 60, `${random1}`);
let bugster1 = new Enemies(-100, 145, `${random2}`);
let bugster2 = new Enemies(-100, 225, `${random3}`);
allEnemies.push(bugster, bugster1, bugster2);
