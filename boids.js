function Boid(id, loc){
  this.acc = new JSVector(0, 0);
  this.vel = new JSVector(Math.random()*10-5, Math.random()*10-5);
  this.id = id;
  this.loc = loc;
  this.maxSpeed = 100;
  this.maxForce = 1;
  this.lifespan = 10000000000000000000000000000.0;
  //this.rad = Math.random()*5+6;
  this.rad = 20;
  this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
  //this.star = 'rgba(' + Math.floor(Math.random()*253333333333333333333333335) + ',' + Math.floor(Math.random()*253333333333333333333333335) + ',' + Math.floor(Math.random()*2553333333333333333333333) + ',';
  this.flock = function(boids){
    var sep = this.seperate(boids);
    var ali = this.alignment(boids);
    var coh = this.seperate(boids);

    sep.mult(0.08);
    ali.mult(0.15);
    coh.mult(0.01);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
}


Boid.prototype.update = function(){
  this.flock(flock.boids);
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  //console.log(this.angle);
  this.vel.limit(3.5);
  this.acc.x = 0;
  this.acc.y = 0;
  this.lifespan -= 2;
  if(this.loc.x  >= canvas.width || this.loc.x  <= 0){
    this.loc.x = canvas.width-this.loc.x;
  //  this.vel.x = -(this.vel.x);
  }
  if(this.loc.y >= canvas.height || this.loc.y <= 0){
    this.loc.y= canvas.height-this.loc.y;
  //  this.vel.y = -(this.vel.y);
  }
}

Boid.prototype.render = function(){
  ctx.beginPath();
  //ctx.ellipse(this.loc.x, this.loc.y, this.rad, this.rad, 0, 0, 2*Math.PI);
  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  this.angle = this.vel.getDirection()+Math.PI/2;
  ctx.rotate(this.angle);
  ctx.beginPath();
  ctx.moveTo(-3, 0);
  ctx.lineTo(3, 0);
  ctx.lineTo(0, -12);

  //this.c = this.star + this.lifespan/1000.0 + ')';
  ctx.fillStyle = this.c;
  ctx.fill();
  ctx.restore();
  this.strokeStyle = this.c;
  //ctx.stroke();
}

Boid.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
    return true;
  } else {
    return false;
  }
}

Boid.prototype.seek = function(target){
  var desired = JSVector.sub(target, this.loc);
  desired.normalize();
  desired.mult(this.maxSpeed);
  var steer = JSVector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Boid.prototype.applyForce = function(f){
  this.acc.add(f);
}

Boid.prototype.seperate = function(boids){
  var desiredSep = 0.5*this.rad;
  var sum = new JSVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++){
    var distance = this.loc.distance(boids[i].loc)
    if (distance < desiredSep && distance > 0){
      var f = JSVector.subGetNew(this.loc, boids[i].loc);
      f.normalize();
      f.div(distance);
      sum.add(f);
      count++;
    }
  }
  if (count > 0){
    sum.div(count);
  }
  if (sum.getMag() > 0){
    sum.normalize();
    sum.mult(this.maxSpeed /*/this.acc*/);
    sum.sub(this.vel);
    sum.limit(this.maxForce);
  }
  return sum;
}

Boid.prototype.alignment = function(boids){
  var neighborDist = 4*this.rad;
  var sum = new JSVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++){
    var distance = boids[i].loc.distance(this.loc)
    if (distance < neighborDist && distance > 0){
      sum.add(boids[i].vel);
      count++;
    }
  }
  if (count > 0){
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed /*/this.acc*/);
    var steer = JSVector.subGetNew(sum, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return new JSVector(0, 0);
  }
}

Boid.prototype.cohesion = function(boids){
  var neighborDist = 10*this.rad;
  var sum = new JSVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++){
    var distance = boids[i].loc.distance(this.loc)
    if (distance < neighborDist && distance > 0){
        sum.add(boids[i].loc);
        count++;
    }
  }
  if (count > 0){
    sum.div(count);
    return this.seek(sum);
  } else {
    return new JSVector(0, 0);
  }
}
