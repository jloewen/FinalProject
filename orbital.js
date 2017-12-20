function Orb(){
  this.loc = new JSVector(5, 0);
  this.rad = 10;
  this.c = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.random() + ')';
  this.theta = 0;
  this.angvel = 1/5;
}


Orb.prototype.update = function(){
  this.theta += this.angvel;
  this.loc.setDirection(Math.sin(this.theta)*(1/1)-5);
}

Orb.prototype.render = function(){
  ctx.beginPath();
  var loc = JSVector.addGetNew(mover.loc, this.loc);
//  this.loc = loc;
  ctx.arc(loc.x,loc.y,this.rad,0,2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

Orb.prototype.applyForce = function(f){
  this.acc.add(f);
}
