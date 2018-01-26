const 
	express = require('express'),
	app = express(),
	http = require('http'),
	server = http.Server(app),
	path = require('path'),
	socketIO = require('socket.io'),
	io = socketIO(server);

// app.set('port', 3000);
// app.use('/static', express.static(__dirname + '/static/'));

app.set('port', 3000);
app.use(express.static(__dirname + '/static/'));

// Маршруты
// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname, '/static/'));
// });

// Запуск сервера
server.listen(3000, function() {
	console.log('Запускаю сервер на порте 3000');
});

// Обработчик веб-сокетов
io.on('connection', function(socket) {
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let players = {};
io.on('connection', function(socket) {
	socket.on('new player', function() {
		players[socket.id] = {
			x: getRandomInt(10, 950),
			y: getRandomInt(10, 650)
		};
	});
	socket.on('movement', function(data) {
		let player = players[socket.id] || {};
		if (data.left) {
			player.x -= 5;
		}
		if (data.up) {
			player.y -= 5;
		}
		if (data.right) {
			player.x += 5;
		}
		if (data.down) {
			player.y += 5;
		}
	});
});

setInterval(function() {
	io.sockets.emit('state', players);
}, 1000 / 50);