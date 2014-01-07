function Game(){
}

Game.prototype = {
  init: function(){
    this.bindSocketListeners()
    this.bindEventListeners()
  },

  bindSocketListeners: function(){
    //why is 'this' working?
    Server.socket.on('updateDOM', this.updateDOM)
  },

  bindEventListeners: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    Server.socket.emit('isCorrect', {playername:'player1'})
    console.log('client sends isCorrect')
  },

  updateDOM: function(data){
    //updatesMYdom
    console.log('updateDOM', data.playername)
  }
}


Server = {
  socket: io.connect('http://localhost')
}


function pageLoad(){

  var game = new Game
  $(document).ready(function(){
    game.init()
  })
  // var socket = io.connect(window.location.origin)
}

pageLoad()
