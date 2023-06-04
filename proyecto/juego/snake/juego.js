// Get the canvas and context
var canvas = document.getElementById("viewport"); 
var context = canvas.getContext("2d");

// Timing and frames per second
var lastframe = 0;
var fpstime = 0;
var framecount = 0;
var fps = 0;

var initialized = false;

// Images
var images = [];
var tileimage;

// Image loading global variables
var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

// Load images
function loadImages(imagefiles) {
    // Initialize variables
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;
    
    // Load the images
    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        // Create the image object
        var image = new Image();
        
        // Add onload event handler
        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                // Done loading
                preloaded = true;
            }
        };
        
        // Set the source url of the image
        image.src = imagefiles[i];
        
        // Save to the image array
        loadedimages[i] = image;
    }
    
    // Return an array of images
    return loadedimages;
}

// Level properties
var Level = function (columns, rows, tilewidth, tileheight) {
    this.columns = columns;
    this.rows = rows;
    this.tilewidth = tilewidth;
    this.tileheight = tileheight;
    
    // Initialize tiles array
    this.tiles = [];
    for (var i=0; i<this.columns; i++) {
        this.tiles[i] = [];
        for (var j=0; j<this.rows; j++) {
            this.tiles[i][j] = 0;
        }
    }
};

// Generate a default level with walls
Level.prototype.generate = function() {
    for (var i=0; i<this.columns; i++) {
        for (var j=0; j<this.rows; j++) {
            if (i == 0 || i == this.columns-1 ||
                j == 0 || j == this.rows-1) {
                // Add walls at the edges of the level
                this.tiles[i][j] = 1;
            } else {
                // Add empty space
                this.tiles[i][j] = 0;
            }
        }
    }
};


// Snake
var Snake = function() {
    this.init(0, 0, 1, 10, 1);
}

// Direction table: Up, Right, Down, Left
Snake.prototype.directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// Initialize the snake at a location
Snake.prototype.init = function(x, y, direction, speed, numsegments) {
    this.x = x;
    this.y = y;
    this.direction = direction; // Up, Right, Down, Left
    this.speed = speed;         // Movement speed in blocks per second
    this.movedelay = 0;
    
    // Reset the segments and add new ones
    this.segments = [];
    this.growsegments = 0;
    for (var i=0; i<numsegments; i++) {
        this.segments.push({x:this.x - i*this.directions[direction][0],
                            y:this.y - i*this.directions[direction][1]});
    }
}

// Increase the size of the snake
Snake.prototype.grow = function() {
    this.growsegments++;
}

// Move the snake
Snake.prototype.move = function() {
    // Update delay
    if (this.movedelay > 0) {
        this.movedelay--;
        return;
    }
    
    // Update segments
    var px = this.x;
    var py = this.y;
    this.x += this.directions[this.direction][0];
    this.y += this.directions[this.direction][1];
    
    // Check collision with walls
    if (level.tiles[this.x][this.y] == 1) {
        // Collision with walls
        gameover();
        return;
    }
    
    // Check collision with snake segments
    for (var i=0; i<this.segments.length; i++) {
        if (this.segments[i].x == this.x && this.segments[i].y == this.y) {
            // Collision with snake segment
            gameover();
            return;
        }
    }
    
    // Move the segments
    this.segments.unshift({x:px, y:py});
    if (this.growsegments > 0) {
        this.growsegments--;
    } else {
        this.segments.pop();
    }
    
    // Update delay and count
    this.movedelay = 1000 / this.speed;
}

// Change the direction of the snake
Snake.prototype.changeDirection = function(newdirection) {
    if (this.direction == 0 && newdirection == 2) return;
    if (this.direction == 2 && newdirection == 0) return;
    if (this.direction == 1 && newdirection == 3) return;
    if (this.direction == 3 && newdirection == 1) return;
    this.direction = newdirection;
}

// Level object
var level = new Level(40, 30, 16, 16);
level.generate();

// Snake object
var snake = new Snake();

// Game over
function gameover() {
    // Stop the game
    running = false;
    
    // Display game over message
    context.fillStyle = "#ffffff";
    context.font = "16px Verdana";
    context.fillText("Game Over!", canvas.width / 2 - 60, canvas.height / 2 - 16);
}

// Main game loop
function main(tframe) {
    // Request animation frames
    window.requestAnimationFrame(main);
    
    if (!initialized) {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the level
        for (var i=0; i<level.columns; i++) {
            for (var j=0; j<level.rows; j++) {
                // Get the tile value
                var tile = level.tiles[i][j];
                
                // Draw the tile using the tile image
                context.drawImage(tileimage, tile * level.tilewidth, 0, level.tilewidth, level.tileheight,
                                  i * level.tilewidth, j * level.tileheight, level.tilewidth, level.tileheight);
            }
        }
        
        // Initialize the snake
        snake.init(10, 10, 1, 10, 3);
        
        initialized = true;
    }
    
    if (preloaded) {
        // Calculate the time elapsed since the last frame
        var time = Date.now();
        var elapsed = (time - lastframe) / 1000;
        
        // Update the frame counter
        fpstime += elapsed;
        framecount++;
        if (fpstime >= 1) {
            fps = framecount;
            fpstime -= 1;
            framecount = 0;
        }
        
        // Update game logic
        update(elapsed);
        
        // Render the game
        render();
        
        // Update the last frame time
        lastframe = time;
    }
}

// Update game logic
function update(dt) {
    // Move the snake
    snake.move();
}

// Render the game
function render() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the level
    for (var i=0; i<level.columns; i++) {
        for (var j=0; j<level.rows; j++) {
            // Get the tile value
            var tile = level.tiles[i][j];
            
            // Draw the tile using the tile image
            context.drawImage(tileimage, tile * level.tilewidth, 0, level.tilewidth, level.tileheight,
                              i * level.tilewidth, j * level.tileheight, level.tilewidth, level.tileheight);
        }
    }
    
    // Draw the snake
    context.fillStyle = "#00ff00";
    for (var i=0; i<snake.segments.length; i++) {
        var segment = snake.segments[i];
        context.fillRect(segment.x * level.tilewidth, segment.y * level.tileheight, level.tilewidth, level.tileheight);
    }
    
    // Draw the FPS counter
    context.fillStyle = "#ffffff";
    context.font = "12px Verdana";
    context.fillText("FPS: " + fps, 10, canvas.height - 10);
}

// Preload images
function preload() {
    // Image files
    var imagefiles = ["tile.png"];
    
    // Load images
    images = loadImages(imagefiles);
    tileimage = images[0];
}

// Start the game
function startGame() {
    // Preload images
    preload();
    
    // Add keyboard event listeners
    window.addEventListener("keydown", function (event) {
        var keycode = event.which || event.keyCode;
        
        // Arrow keys
        if (keycode >= 37 && keycode <= 40) {
            event.preventDefault();
            snake.changeDirection(keycode - 37);
        }
    });
    
    // Set the last frame time
    lastframe = Date.now();
    
    // Start the game loop
    main();
}

// Start the game when the page has finished loading
window.onload = function() {
    startGame();
};
