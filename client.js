function Game(){
  this.init()
}

Game.prototype = {
  init: function(){
<<<<<<< HEAD
    this.socket = io.connect(window.location.origin)
    this.getPlayerNumber()
    this.bindSocketListeners()
    this.bindEventListeners()
  },

  bindSocketListeners: function(){
    //if we don't bind 'this' here, the value of 'this' within the callback functions is the socket namespace.
    this.socket.on('setPlayerNumber', this.setPlayerNumber.bind(this) )
    this.socket.on('updateDOM', this.updateDOM.bind(this) )
=======
    this.bindEventListeners()
>>>>>>> c403d95993376d03e3b6653ef91e6dbf0e4369a4
  },

  bindEventListeners: function(){
    $('#field').keypress( this.isCorrect.bind(this) )
  },

<<<<<<< HEAD
  getPlayerNumber: function(){
    this.socket.emit('getPlayerNumber')
  },

  setPlayerNumber: function(data) {
    this.number = data.playerNumber
    console.log( 'player number: ', this.number )
  },
=======
  isCorrect: function(){
    Server.socket.emit('isCorrect', {playerNumber: Server.number })
  },

  updateDOM: function(data){
    console.log('updateDOM', data.playerNumber)
  }
}

>>>>>>> c403d95993376d03e3b6653ef91e6dbf0e4369a4

  isCorrect: function(){
    this.socket.emit('isCorrect', {playerNumber: this.number })
  },

<<<<<<< HEAD
  updateDOM: function(data){
    console.log( 'updateDOM', data.playerNumber )
=======
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
>>>>>>> c403d95993376d03e3b6653ef91e6dbf0e4369a4
  }

}

$(document).ready(function(){
  var game = new Game
<<<<<<< HEAD
})
=======
  $(document).ready(function(){
    game.init()
    Server.init()
  })
}

pageLoad()
>>>>>>> c403d95993376d03e3b6653ef91e6dbf0e4369a4
