let walls = [];
let particle;

let showWalls = false;

function setup() {
  createCanvas(400, 400);

  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  for (let i = 0; i < 5; i++) {
    walls.push(new Boundary(random(width), random(height), random(width), random(height)));
  }

  particle = new Particle(width * 0.5, height * 0.5);
}

function mousePressed() {
  showWalls = !showWalls;
}

function draw() {
  background(0);
  
  if (showWalls) {
    for (const wall of walls) {
      wall.show();
    }
  }

  particle.update(mouseX, mouseY);
  particle.emit(walls);
  particle.show();
}
