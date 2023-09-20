const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
const lineWidht = 10;
const mouse = {
   x:0,
   y:0
}


function setup() {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
}

const campo = {
  draw: function() {
    canvasCtx.fillStyle = "#3673DA";
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  },
};

const linhas = {
  draw: function() {
    canvasCtx.fillStyle = "#D6DFEE";
    canvasCtx.fillRect(
      window.innerWidth / 2 - (lineWidht + 5 / 2),
      0,
      lineWidht + 5,
      canvasEl.height
    );
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(
      0,
      window.innerHeight / 2 - lineWidht / 2,
      canvasEl.width,
      lineWidht
    );
  },
};

const raqueteLeft = {
  y: 100,
  _move: function(){
    this.y = mouse.y - 200 /2
  },
  draw: function() {
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(10, this.y, lineWidht, 200);

    this._move();
  },
};
const raqueteRight = {
  x: window.innerWidth - 20,
  y: 100,
  speed : 3,
  _move: function(){
    if(this.y + 200 /2 < bola.y + bola.r){
      this.y += this.speed
    }
    else{
      this.y -= this.speed
    }
  },
  _aumentaVelocidadeRight: function(){
    this.speed += 1;
  },
  draw: function() {
    canvasCtx.fillRect(this.x, this.y, lineWidht, 200);
    this._move();
  }
}



const bola = {
  
  x: 674,
  y: 479,
  r: 15,
  speed: 6,
  directionX:1,
  directionY:1,


  _startPoint:function(){

    bola.x = canvasEl.width/2;
    bola.y = canvasEl.height/2;
  },
 

  _calcPosition: function(){

    if(this.x  > canvasEl.width - this.r - 10 - lineWidht){
      if(this.y  + this.r > raqueteRight.y && this.y - this.r < raqueteRight.y + 200){
        this.directionX *= -1;
      }
      else{
        placar.pointHumano();
        this._startPoint();
      }
    }
    if(this.x < this.r + 10 + lineWidht){
      if(this.y  + this.r > raqueteLeft.y && this.y - this.r < raqueteLeft.y + 200){
        this.directionX *= -1;
      }
      else{
        placar.pointComputer();
        this._startPoint();
      }
    }

    //rebate nas laterais
    if(this.y - this.r < 0  && this.directionY < 0 || this.y > canvasEl.height - this.r && this.directionY > 0){
      this.directionY *= -1;
    }
  },
  
  _move: function() {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function() {
    canvasCtx.fillStyle = "#D4660A";
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    canvasCtx.fill();
    this._calcPosition();
    this._move();
    
  },
};

const placar = {

  humano: 0,
  computer:0,

  _aumentaVelocidade:function (){
    bola.speed +=1
  },
  pointHumano: function (){
    this.humano++;
    this._aumentaVelocidade();
    raqueteRight._aumentaVelocidadeRight();
  },
  pointComputer: function (){
    this.computer++;
    this._aumentaVelocidade()
    raqueteRight._aumentaVelocidadeRight();
  },

  draw: function() {
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.font = "bold 70px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillText(this.humano, window.innerWidth / 4, 50);
    canvasCtx.fillText(this.computer, window.innerWidth / 2 + window.innerWidth / 4, 50);
  },
};

function desenho() {
  campo.draw();
  linhas.draw();
  raqueteLeft.draw();
  raqueteRight.draw();
  bola.draw();
  placar.draw();
}

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
  })()
  
  function main() {
  animateFrame(main)
  desenho()
  }

  canvasEl.addEventListener("mousemove", (e)=> {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    console.log(mouse);
  })
  
  setup()
  main()

setup();
desenho();

