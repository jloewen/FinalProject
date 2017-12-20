function Snake(){
  this.theta = 0;
  this.loc = new JSVector(0,0);
  //this.c = 'black';
  this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',';

  this.segs = [];
  for (var i = 0; i < 100; i++){
    this.segs[i] = new JSVector(0, 0);
  }
  this.rad = 10;
}

//this.segs.length

Snake.prototype.update = function(){
  this.segs[0] = JSVector.addGetNew(mover.loc, orb.loc);
  var head = this.segs[0];
  for (var i = 1; i < this.segs.length; i++){
    this.segs[i] = JSVector.subGetNew(this.segs[i], this.segs[i-1]);
    this.segs[i].setMag(2*(this.rad-(this.rad-1)));
    this.segs[i].add(this.segs[i-1]);
      }
}

//this.segs.length

Snake.prototype.render = function(){
  for (var i = 0; i < this.segs.length; i++){
    ctx.beginPath();
    ctx.arc(this.segs[i].x,this.segs[i].y,this.rad-(0.1*i),0,2*Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.strokeStyle = this.c;
    ctx.stroke();
  }
}
