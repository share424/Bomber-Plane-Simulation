
var pesawat;
function setup(){
	createCanvas(1300, 800);
	frameRate(60);
	
	pesawat = new Pesawat();
	alert('Press enter to eject bomb');
	textSize(20);

}

function draw(){
	background(0);
	pesawat.draw();
	fill('#8B4513');
	rect(0, height-25, width, height);
	
}

function keyPressed(){
	if(keyCode == ENTER){
		pesawat.eject();
	}
}

function Pesawat(){
	var pos = [0, 20];
	var speed = 2;
	var bombs = [];
	var img = loadImage('plane.png');
	this.draw = function(){
		//fill(255);
		//rect(pos[0], pos[1], 100, 25);
		image(img, pos[0], pos[1]);
		pos[0]+=speed;
		
		if(pos[0] >= width){
			pos[0] = 0;
			bombs = [];
		}
		
		for(var i = 0; i<bombs.length; i++){
			if(bombs[i] != null){
				bombs[i].draw();
			}
			if(bombs[i].getPos()[1] >= height){
				bombs.splice(i, 1);
			}

			
		}
	}
	this.eject = function(){
		bombs.push(new Bomb(pos[0]+48, pos[1]+48, speed));
	}
}

function Bomb(x, y, v0){
	var pos = [x, y];
	var t = 0;
	var pi = 3.1415926535897;
	var sudut = 0;
	var theta = sudut/(2*pi);
	var g = 0.03;
	var img = loadImage('bomb.png');
	var explode = loadImage('explode.png');
	var sound = loadSound('explode.mp3');
	this.getPos = function(){
		return pos;
	}

	this.draw = function(){
		if(pos[1] >= height-50){
			image(explode, pos[0]-50, height-100);
			if(!sound.isPlaying()){
				sound.play();
			}
		} else {
			image(img, pos[0]-25, pos[1]);
		}
		fill(255);
		//text('('+v0+','+pos[1]+')', pos[0], pos[1]);
		pos[0] = x + v0*cos(theta)*t;
		pos[1] = y + -1*(v0*sin(theta)*t - 0.5*g*t*t);
		//v0 = v0*sin(theta)
		vx = v0*cos(theta);
		vy = v0*sin(theta) - g*t;
		text('Vx: '+vx.toFixed(2)+'m/s', pos[0]+15, pos[1]+20);
		text('Vy: '+(-vy).toFixed(2)+'m/s', pos[0]+15, pos[1]+40);
		t++;

	}

	this.getKecepatanX = function(v0, theta){
		return v0*cos(theta);
	}

	this.getKecepatanY = function(v0, theta, g, t){
		return v0*sin(theta) - g*t;
	}
}

