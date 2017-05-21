var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});
users = [];
io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('setUser', function(data){
		//if(users.indexOf(data) > -1){
			users.push(data);
			socket.emit('saveuser', {username: data});
		//}
		//else{
			socket.emit('useralready', data + " "+'username is already existing please try another');
		//}
	});
	 socket.on('msg', function(data){
      io.sockets.emit('newmsg', data);
  })
});
http.listen(3000, function(){
	console.log('listening on localhost:3000')
});
