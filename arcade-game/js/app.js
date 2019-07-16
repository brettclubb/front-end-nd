// Sizes from icon file details
const tileHeight = 83;
const tileWidth = 101;
const iconHeight = 171; // player & enemies
const iconWidth = 101; // player & enemies


// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // Determine row and column by position
    this.row = Math.ceil(y/tileHeight);
    this.col = Math.ceil(x/tileWidth);

    this.speed = (Math.random() + 1) * 150;
};


Enemy.prototype.reset = function() {
    this.x = -tileWidth;
    this.speed = (Math.random() + 1) * 150;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < tileWidth * 5) {
        this.x = this.x + (this.speed * dt);
    }
    else {
        this.reset();
    }

    // Update current column and row
    this.row = Math.ceil(this.y/tileHeight);
    this.col = Math.ceil(this.x/tileWidth);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.col = 2;
    this.score = 0;

    this.x = tileWidth * this.col;
    this.y = tileHeight * this.row - 10;
};


Player.prototype.update = function (dt) {
  
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.row = 5;
    this.col = 2;

    this.x = tileWidth * this.col;
    this.y = tileHeight * this.row - 10;
}

Player.prototype.moveLeft = function() {
    this.x -= tileWidth;
    this.col--;
}

Player.prototype.moveRight = function() {
    this.x += tileWidth;
    this.col++;
}

Player.prototype.moveUp = function() {
    this.y -= tileHeight;
    this.row--;
}

Player.prototype.moveDown = function() {
    this.y += tileHeight;
    this.row++;
}

Player.prototype.handleInput = function (direction) {
    if (direction == "left" && this.col > 0) {
        this.moveLeft();
    }
    else if (direction == "right" && this.col < 4) {
        this.moveRight();
    }
    else if (direction == "up" && this.row > 0) {
        this.moveUp();
    }
    else if (direction == "down" && this.row < 5) {
        this.moveDown();
    }
    
    if(this.row == 0) {
        this.score += 100;
        var player = this;
        setTimeout(function() { player.reset(); }, 750);
    }
}

// Place the player object in a variable called player
var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(-tileWidth, 60),
    new Enemy(-tileWidth, 143),
    new Enemy(-tileWidth, 226)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    for(var enemy of allEnemies) {
        if(player.col === enemy.col && player.row === enemy.row) {
            setTimeout(function() {player.reset();}, 100);
        }
    }
}