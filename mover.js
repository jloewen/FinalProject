function Mover(){
  this.rad = 0.00000000000000000000010
  this.loc = new JSVector((Math.random()*canvas.width-(2*this.rad))+this.rad, (Math.random()*canvas.height-(2*this.rad))+this.rad);
  this.vel = new JSVector(Math.random()*10-5, Math.random());
  this.acc = new JSVector(0, 0);
  this.c = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.random() + ')';
}

Mover.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.acc.mult(0);
  this.vel.limit(5);
  if(this.loc.x + this.rad >= canvas.width || this.loc.x - this.rad <= 0){
  //  this.loc.x = canvas.width-this.loc.x;
    this.vel.x = -(this.vel.x);
  }
  if(this.loc.y + this.rad >= canvas.height || this.loc.y - this.rad <= 0){
    //this.loc.y= canvas.height-this.loc.y;
    this.vel.y = -(this.vel.y);
  }
  if(this.loc.y + this.rad >= canvas.height/2 && this.loc.x + this.rad >= canvas.width/2){
    //this.loc.y= canvas.height-this.loc.y;
    this.acc.mult(-1);
  }else{
    this.acc.mult(0);
  }
}

Mover.prototype.render = function(){
  ctx.beginPath();
  ctx.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

Mover.prototype.applyForce = function(f){
  this.acc.add(f);
}
