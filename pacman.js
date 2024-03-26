var pos = 0;
const pacArray = [
  ['./PacMan1.png', './PacMan2.png'],
  ['./PacMan3.png', './PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './PacMan1.png';
  newimg.width = 100;

  // Set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // Add new Child image to game
  game.appendChild(newimg);

  // Return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // Loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);

    // Check if PacMan is moving left or right
    if (item.velocity.x > 0) {
      if (item.newimg.src.includes("PacMan1.png")) {
        item.newimg.src = './PacMan2.png';
      } else {
        item.newimg.src = './PacMan1.png';
      }
    } else {
      if (item.newimg.src.includes("PacMan3.png")) {
        item.newimg.src = './PacMan4.png';
      } else {
        item.newimg.src = './PacMan3.png';
      }
    }

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    // Update image position in DOM
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });
  setTimeout(update, 100);
}

function checkCollisions(item) {
  // Get window width and height
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Check for collisions with window edges
  if (item.position.x + item.velocity.x + item.newimg.width >= windowWidth || item.position.x + item.velocity.x <= 0) {
    item.velocity.x = -item.velocity.x;
  }
  if (item.position.y + item.velocity.y + item.newimg.height >= windowHeight || item.position.y + item.velocity.y <= 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // Add a new PacMan
}

function clearPacMen() {
  // Remove all PacMan images from the DOM
  pacMen.forEach((item) => {
    item.newimg.remove();
  });

  // Empty the pacMen array
  pacMen.length = 0;
}

// Initial call to start updating positions
update();
