var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')
, path = require('path')

app.listen(process.env.PORT || 8000);

function handler (request, response) {
  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.css':
    contentType = 'text/css';
    break;
  }

  path.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  })
}

var allClients = []
io.sockets.on('connection', function ( socket ) {

  socket.on('getPlayerNumber',function() {
    allClients.push(socket.id)
    console.log(allClients)
    var number = allClients.length
    socket.emit('setPlayerNumber', { playerNumber : number })
  })

  socket.on('isCorrect',function( data ){
    console.log('server recieved isCorrect')
    io.sockets.emit('updateDOM', { playerNumber: data.playerNumber })
  });

  socket.on('disconnect', function() {
    console.log('Adios muchacho!')

    var i = allClients.indexOf(socket.id)
    allClients.splice(i, 1)
    console.log(allClients)
  })

});


//user1 types
//iscorrect?
//server emits updateDOM
//client updatesDOM
//disable input field until 2 players
