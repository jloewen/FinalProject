function JSVector(x, y){
  this.x = x;
  this.y = y;
}


JSVector.prototype.setMag = function(mag){
  var angle = this.getDirection();
  this.x = mag * Math.cos(angle);
  this.y = mag * Math.sin(angle);
}

JSVector.prototype.getMag = function(){
  return Math.sqrt(this.x*this.x+this.y*this.y);
}

JSVector.prototype.setDirection = function(angle){
  var mag = this.getMag();
  this.x = mag * Math.cos(angle);
  this.y = mag * Math.sin(angle);
}

JSVector.prototype.getDirection = function(){
  return Math.atan2(this.y, this.x);
}

JSVector.prototype.add = function(vec){
  this.x+=vec.x;
  this.y+=vec.y;
}

JSVector.addGetNew = function(vec1, vec2){
  var x = vec1.x + vec2.x;
  var y = vec1.y + vec2.y;
  return new JSVector(x, y);
}

JSVector.prototype.sub = function(vec){
  this.x-=vec.x||0;
  this.y-=vec.y||0;
}

JSVector.subGetNew = function(vec1, vec2){
  var x = vec1.x - vec2.x;
  var y = vec1.y - vec2.y;
  return new JSVector(x, y);
}

JSVector.prototype.mult = function(a){
  this.x*=a||0;
  this.y*=a||0;
}

JSVector.prototype.div = function(a){
  this.x/=a||0;
  this.y/=a||0;
}

JSVector.prototype.normalize = function(){
  this.x/=this.getMag();
  this.y/=this.getMag();
}

JSVector.prototype.limit = function(lim){
  if (this.getMag() > lim){
    this.setMag(lim);
  }
}

JSVector.prototype.lerp = function(){

}

JSVector.prototype.distance = function(vec){
  var dx = this.x - vec.x;
  var dy = this.y - vec.y;
  return Math.sqrt(dx*dx + dy*dy);
}

JSVector.prototype.angleBetween = function(vec){
  this.dx = this.x - vec.x;
  this.dy = this.y - vec.y;
  return Math.atan2(dy, dx);
}

JSVector.prototype.copy = function(){
  var dx = this.x;
  var dy = this.y;
  return new JSVector(dx, dy);
}

JSVector.prototype.rotate = function(a){
  return Math.atan2(this.y, this.x) + a;
}

JSVector.prototype.dot = function(){

}

JSVector.prototype.cross = function(){

}

JSVector.prototype.random2D = function(){

}
