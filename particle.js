class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];

    for (let a = 0; a < 360; a += 5) {
      this.rays.push(new Ray(this.pos.x, this.pos.y, radians(a)));
    }
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;

    for (const ray of this.rays) {
      ray.pos.x = x;
      ray.pos.y = y;
    }
  }

  emit(walls) {
    for (const ray of this.rays) {
      let record = Infinity;
      let closest = null;
      for (const wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(255);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
}
