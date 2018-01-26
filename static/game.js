const socket = io();
socket.on('message', function(data) {
	console.log(data);
});

let movement = {
	up: false,
	down: false,
	left: false,
	right: false
};

document.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 65: // A
			movement.left = true;
			break;
		case 87: // W
			movement.up = true;
			break;
		case 68: // D
			movement.right = true;
			break;
		case 83: // S
			movement.down = true;
			break;
	}
});
document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 65: // A
			movement.left = false;
			break;
		case 87: // W
			movement.up = false;
			break;
		case 68: // D
			movement.right = false;
			break;
		case 83: // S
			movement.down = false;
			break;
	}
});

document.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 37: // стрелка влево
			movement.left = true;
			break;
		case 38: // стрелка вверх
			movement.up = true;
			break;
		case 39: // стрелка вправо
			movement.right = true;
			break;
		case 40: // стрелка вниз
			movement.down = true;
			break;
	}
});
document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 37: // стрелка влево
			movement.left = false;
			break;
		case 38: // стрелка вверх
			movement.up = false;
			break;
		case 39: // стрелка вправо
			movement.right = false;
			break;
		case 40: // стрелка вниз
			movement.down = false;
			break;
	}
});

let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 700;

socket.on('state', function(players) {
	ctx.clearRect(0, 0, 1000, 700);
	ctx.fillStyle = '#524b3b';
	for (let id in players) {
		let player = players[id];
		ctx.beginPath();
		//ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI, false);
		ctx.fillRect(player.x, player.y, 90, 40);
		ctx.fill();

	}
});

socket.emit('new player');
setInterval(function() {
	socket.emit('movement', movement);
}, 1000 / 50);