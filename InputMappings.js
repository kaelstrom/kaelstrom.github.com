//   Kyle Johnsen                 
//   script comparing mapping     
//   input to position, velocity, 
//   acceleration, and jerk       
var canvas = document.getElementById("surface");
var ctx = canvas.getContext("2d");
var randominput = true;
var pos_cap = 90;
var vel_cap = 10;
var acc_cap = 10;
var jerk_cap = 10;
var randx = 0;
var randy = 0;
var horiz = 0;
var vert = 0;
var motion = [[[50, 50, pos_cap], [0,0,vel_cap], [0,0,acc_cap], [0,0,jerk_cap]],
			  [[50, 50, pos_cap], [0,0,vel_cap], [0,0,acc_cap], [0,0,jerk_cap]],
			  [[50, 50, pos_cap], [0,0,vel_cap], [0,0,acc_cap], [0,0,jerk_cap]],
			  [[50, 50, pos_cap], [0,0,vel_cap], [0,0,acc_cap], [0,0,jerk_cap]]];

function on_enter_frame(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0,1000,1000);
	randx = Math.random()-.5;
	randy = Math.random()-.5;
	for (i=0;i<motion.length;i++) {
		ctx.fillStyle = "#EFEFEF";
		ctx.fillRect(5, i*200+5, 190, 190);
		if(randominput) {
			motion[i][i][0] = randx * (4-i) * (4-i) * .6;
			motion[i][i][1] = randy * (4-i) * (4-i) * .6;
		}
		else
		{
			motion[i][i][0] = horiz * (4-i) * (4-i) * .2;
			motion[i][i][1] = vert * (4-i) * (4-i) * .2;
		}
		for (d=3;d>0;d--) {
			if(d == 1) {  //apply drag
				motion[i][d][0]*=.9;
				motion[i][d][1]*=.9;
			}
			motion[i][d-1][0] = Math.min(Math.max(motion[i][d-1][0] + motion[i][d][0], -motion[i][d-1][2]), motion[i][d-1][2]);
			motion[i][d-1][1] = Math.min(Math.max(motion[i][d-1][1] + motion[i][d][1], -motion[i][d-1][2]), motion[i][d-1][2]);
		}                    
		
		//hit a wall, reset
		if(motion[i][0][0] == -pos_cap || motion[i][0][0] == pos_cap) {
			for (d=1;d<4;d++) {
				motion[i][d][0] = 0;
			}
		}
		if(motion[i][0][1] == -pos_cap || motion[i][0][1] == pos_cap) {
			for (d=1;d<4;d++) {
				motion[i][d][1] = 0;
			}
		}
		
		if(i == 0)
			ctx.fillStyle="#0040F0";
		else if(i == 1)
			ctx.fillStyle="#F040F0";
		else if(i == 2)
			ctx.fillStyle="#00FF30";
		else
			ctx.fillStyle="#F04000";
		ctx.fillRect(motion[i][0][0] + 95, motion[i][0][1] + i*200 + 95, 10, 10);
	}
	
	ctx.fillStyle = "#000000";
	
	ctx.fillText("press 'i' to toggle showing random input", 210, 10); 
	ctx.fillText("  vs getting input from WASD", 210, 25);
	if(randominput) {
		ctx.fillText("Mapping random to position", 210, 50);
		ctx.fillText("Mapping random to velocity", 210, 250);
		ctx.fillText("Mapping random to acceleration", 210, 450);
		ctx.fillText("Mapping random to jerk", 210, 650);                
	}
	else {
		ctx.fillText("Mapping input to position", 210, 50);
		ctx.fillText("Mapping input to velocity", 210, 250);
		ctx.fillText("Mapping input to acceleration", 210, 450);
		ctx.fillText("Mapping input to jerk", 210, 650);
	}
	for(i = 0; i < 4; i++) {
		ctx.fillText(" x: " + motion[i][0][0].toFixed(2), 220, i*200+80); ctx.fillText(" y: " + motion[i][0][1].toFixed(2), 300, i*200+80);
		ctx.fillText("vx: " + motion[i][1][0].toFixed(2), 220, i*200+100); ctx.fillText("vy: " + motion[i][1][1].toFixed(2), 300, i*200+100);
		ctx.fillText("ax: " + motion[i][2][0].toFixed(2), 220, i*200+120); ctx.fillText("ay: " + motion[i][2][1].toFixed(2), 300, i*200+120);
		ctx.fillText("jx: " + motion[i][3][0].toFixed(2), 220, i*200+140); ctx.fillText("jy: " + motion[i][3][1].toFixed(2), 300, i*200+140);
	}
}

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 65) {
		horiz = -1;
	}
	else if(event.keyCode == 87) {
		vert = -1;
	}
	else if(event.keyCode == 83) {
		vert = 1;
	}
	else if(event.keyCode == 68) {
		horiz = 1;
	}
	else if(event.keyCode == 73) {
		randominput = !randominput;
	}
});

document.addEventListener('keyup', function(event) {
	if(event.keyCode == 65) {
		horiz = 0;
	}
	else if(event.keyCode == 87) {
		vert = 0;
	}
	else if(event.keyCode == 83) {
		vert = 0;
	}
	else if(event.keyCode == 68) {
		horiz = 0;
	}
}); 

setInterval(on_enter_frame,25);