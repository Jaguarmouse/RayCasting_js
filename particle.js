class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];

    for (let a = 0; a < 360; a += 1) {
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
//    const edges = walls.reduce((arr, cur) => {
//      const v1 = p5.Vector.sub(cur.a, this.pos);
//      const v2 = p5.Vector.sub(cur.b, this.pos);
//      const ray1 = new Ray(this.pos.x, this.pos.y, v1.heading());
//      const ray2 = new Ray(this.pos.x, this.pos.y, v2.heading());
//      arr.push(ray1, ray2);
//      return arr;
//    }, []);

    const projections = [];

    const newRays = this.rays
//      .concat(edges)
//      .sort((a,b) => a.dir.heading() - b.dir.heading());

    for (const ray of newRays) {
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
        projections.push(closest);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }

    fill(255, 180);
    beginShape();
    for (const pt of projections) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}
