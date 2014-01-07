function Game(){
}

Game.prototype = {
  init: function(){
    this.bindSocketListeners()
    this.bindEventListeners()
    Server.getPlayerNumber()
  },

  bindSocketListeners: function(){
    //why is 'this' working?
    Server.socket.on('updateDOM', this.updateDOM)
    Server.socket.on('setPlayerNumber', this.setPlayerNumber)
  },

  bindEventListeners: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    // var number = Server.getPlayerNumber();
    Server.socket.emit('isCorrect', {playerNumber: Server.number })
  },

  updateDOM: function(data){
    //updatesMYdom
    console.log('updateDOM', data.playerNumber)
  },

  setPlayerNumber: function(data) {
    Server.number = data.playerNumber
  }
}


Server = {
  socket: io.connect('http://localhost'),

  getPlayerNumber: function(){
    this.socket.emit('getPlayerNumber')
  }
}


function pageLoad(){

  var game = new Game
  $(document).ready(function(){
    game.init()
  })
}

pageLoad()
