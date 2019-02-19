'use strict';


const chars = [
    'images/char-boy.png', 
    'images/char-cat-girl.png', 
    'images/char-horn-girl.png', 
    'images/char-pink-girl.png', 
    'images/char-princess-girl.png'
];
const lives = document.querySelector('.lives');
const score = document.querySelector('.score');
const cloak = document.querySelector('.button');
const char1 = document.querySelector('#one');
const char2 = document.querySelector('#two');
const char3 = document.querySelector('#three');
const char4 = document.querySelector('#four');
const char5 = document.querySelector('#five');


let charChoice = [chars[2]], livesCount = 3, scoreCount = 0, theArray = [], allEnemies = [], player, bugster1, bugster2, bugster3;


// Enemy class
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


// Player class
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
            this.rePlayerScore();
            alert('Success! 👍 😀')
            this.reset();
        }

        // 2D Bounding Box collision detection
        allEnemies.forEach((enemy) => {
            let rePlayer = {x: this.x, y: this.y, width: 30, height: 35}
            let reEnemy = {x: enemy.x, y: enemy.y, width: 30, height: 35}
            if (rePlayer.x < reEnemy.x + reEnemy.width && 
                rePlayer.x + rePlayer.width > reEnemy.x &&
                rePlayer.y < reEnemy.y + reEnemy.height && 
                rePlayer.y + rePlayer.height > reEnemy.y) {
                alert('Collision! 😱');
                this.reset();
                livesCount--;
                `${scoreCount}` > 1 ? `${scoreCount--}` : '';
                this.rePlayerLives();
                this.rePlayerScore();
                this.reGameOver();
            }
        })
    }

    // Updates the number of lives remaining
    rePlayerLives() {
        lives.innerHTML = `Lives = ${livesCount}`;
    }

    // Updates the player'score
    rePlayerScore() {
        score.innerHTML = `Score = ${scoreCount}`;
    }

    reGameOver() {
        if(`${livesCount}` == 0) {
            alert('Game Over! 😢');
            livesCount = 3;
            scoreCount = 0;
            lives.innerHTML = 'Lives = 3';
            score.innerHTML = 'Score = 0';
            this.reset();
        } 
    }

    // After every collision or success this returns the player to the starting point and resets each bug' speed
    reset() {
        this.x = 200;
        this.y = 400;
        allEnemies = [];
        bugster1 = new Enemies(-100, 60, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
        bugster2 = new Enemies(-100, 145, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
        bugster3 = new Enemies(-100, 225, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
        allEnemies.push(bugster1, bugster2, bugster3);
    }

    // This responds to every arrow click and moves the character accordingly
    handleInput() {
        return  event.keyCode == 37 && this.x > 0   ? this.x -= 16
             :  event.keyCode == 38 && this.y > 20  ? this.y -= 16
             :  event.keyCode == 39 && this.x < 400 ? this.x += 16
             :  event.keyCode == 40 && this.y < 400 ? this.y += 16
             :  '';
    }
}


// This enables the player to change the avatar
function rePlayerChar() {
    char1.addEventListener('click', () => {
        charChoice = [];
        charChoice.push(chars[0]);
        player.sprite = charChoice[0];
    })

    char2.addEventListener('click', () => {
        charChoice = [];
        charChoice.push(chars[1]);
        player.sprite = charChoice[0];
    })

    char3.addEventListener('click', () => {
        charChoice = [];
        charChoice.push(chars[2]);
        player.sprite = charChoice[0];
    })

    char4.addEventListener('click', () => {
        charChoice = [];
        charChoice.push(chars[3]);
        player.sprite = charChoice[0];
    })

    char5.addEventListener('click', () => {
        charChoice = [];
        charChoice.push(chars[4]);
        player.sprite = charChoice[0];
    })
}
window.onload = rePlayerChar();


// This replaces the instructions with the lives and score indicators after the green start button is clicked
function reVisibility() {
    cloak.addEventListener('click', () => {
        document.querySelector('.disappearing').classList.add('disappear');
        document.querySelector('.indicators').classList.remove('disappear');
        lives.innerHTML = 'Lives = 3';
        score.innerHTML = 'Score = 0';
    });
}
window.onload = reVisibility();


// This creates an array of random speeds for the bugs
(function topaz() {
    while(theArray.length < 150) {
        theArray.push(Math.floor(Math.random()*(550-250) + 250));
    }
})();


// This listens for key presses and sends the keys to the handleInput() method above.
document.addEventListener('keydown', (e) => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


// This prevents browser scrolling which would otherwise occur when an arrow key is pressed
window.addEventListener('keydown', (e) => [37, 38, 39, 40].indexOf(e.keyCode) > -1 ? e.preventDefault() : '');


// Instantiation of objects
// The Enemy objects are pushed into an array called allEnemies
// The Players object is placed into a variable called player
player = new Players();
bugster1 = new Enemies(-100, 60, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
bugster2 = new Enemies(-100, 145, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
bugster3 = new Enemies(-100, 225, `${theArray[Math.floor(Math.random()*theArray.length)]}`);
allEnemies.push(bugster1, bugster2, bugster3);
