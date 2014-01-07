function Game(){
}

Game.prototype = {
  init: function(){
    this.bindEventListeners()
  },

  bindEventListeners: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    Server.socket.emit('isCorrect', {playerNumber: Server.number })
  },

  updateDOM: function(data){
    console.log('updateDOM', data.playerNumber)
  }
}


Server = {
  socket: io.connect('http://localhost'),

  init: function(){
    this.getPlayerNumber()
    this.bindSocketListeners()
  },

  bindSocketListeners: function(){
    //why is 'this' working?
    //this on line 34 should actually reference the instance of Game we created
    this.socket.on('updateDOM', this.updateDOM)
    this.socket.on('setPlayerNumber', this.setPlayerNumber)
  },

  getPlayerNumber: function(){
    this.socket.emit('getPlayerNumber')
    console.log('getPlayerNumber emitted')
  },

  setPlayerNumber: function(data) {
    this.number = data.playerNumber
    console.log('setPlayerNumber emitted', this.number)
  }

}


function pageLoad(){

  var game = new Game
  $(document).ready(function(){
    game.init()
    Server.init()
  })
}

pageLoad()
