var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
  // res.sendfile(__dirname + '/template/index.php');
});

var usernames = {};
var userCount = 0;

io.sockets.on('connection', function(socket) {
	userCount++;
	
	socket.emit('firstMessage', 'connected mwrh pswlh');
	
	io.sockets.emit('userCount', userCount);
	
	var newUsername;
	
	socket.on('username', function(username) {
		if (username == 'goRandom') newUsername = 'user'+Math.floor(Math.random()*100);
		else newUsername = username;
		
		console.log('user '+newUsername+' just joined.');
		
		socket.broadcast.emit('userJoin', newUsername+' joined.');
		socket.emit('userJoin', 'successful join! :)');
	});
	
	socket.on('draw', function(data) {
		console.log('drawingX: '+data.x);
		console.log('drawingY: '+data.y);
		socket.broadcast.emit('draw',data);
	});
});
