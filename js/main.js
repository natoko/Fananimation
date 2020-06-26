'use strict';

(() => {

  class Fan {
    constructor(canvas,xposition) {
      this.ctx =canvas.getContext('2d');
      this.width = canvas.width;
      this.height = canvas.height;
      this.xposition = xposition;
    }
    draw (angle,r) {
      this.ctx.save();
      this.ctx.translate(this.xposition, this.height/2);

      this.ctx.fillStyle = 'rgb(193,239,255,0.3)';
      this.ctx.fillRect(-r,-r, 2*r, 2*r);

      this.ctx.strokeStyle = 'rgb(255, 213, 79, 1)';
      this.ctx.fillStyle = 'rgb(255, 213, 79, 1)';
      this.fanfixedpart(r);

      this.ctx.rotate(Math.PI / 180 * angle);

      this.fanRotating(r);

      this.ctx.restore();
    }
    fanRotating (r) {
      for (var i = 0; i*Math.PI/2 < 360; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.arc(0, 0, r-10, 0 + i*(Math.PI/2),25 / 180 * Math.PI + i*(Math.PI/2),false);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }
    fanfixedpart(r) {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r, 0, 2*Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(0, 0, 2/7*r, 0, 2*Math.PI);
      this.ctx.fill();

      this.ctx.fillRect(-5,0,10,100);
      this.ctx.beginPath();
      this.ctx.ellipse(0, 100, 50, 10, 0, 0, 2*Math.PI);
      this.ctx.fill();
    }

  }

  class FanDraw {
    constructor(drawer) {
      this.drawer = drawer;
      this.angle = 0;
      this.r = 70;
    }

    update() {
      this.angle+=30;
    }
    run() {
      this.drawer.draw(this.angle,this.r);
      this.update();

      setTimeout(()=> {
        this.run();
        },100);
      }
    }

  const canvas = document.querySelector('canvas')

  if (typeof canvas.getContext === 'undefined') {
    return;
  }

  const myfans = [];
  myfans[0] = new FanDraw(new Fan(canvas,90));
  myfans[1] = new FanDraw(new Fan(canvas,250));
  myfans[2] = new FanDraw(new Fan(canvas,410));

  myfans.forEach((myfan) => {
    myfan.run();
  });


})();
