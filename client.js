function Game(){
  this.init()
}

Game.prototype = {
  init: function(){
    this.socket = io.connect(window.location.origin)
    this.getPlayerNumber()
    this.bindSocketListeners()
    this.bindEventListeners()
  },

  bindSocketListeners: function(){
    //if we don't bind 'this' here, the value of 'this' within the callback functions is the socket namespace.
    this.socket.on('setPlayerNumber', this.setPlayerNumber.bind(this) )
    this.socket.on('updateDOM', this.updateDOM.bind(this) )
  },

  bindEventListeners: function(){
    $('#field').keypress( this.isCorrect.bind(this) )
  },

  getPlayerNumber: function(){
    this.socket.emit('getPlayerNumber')
  },

  setPlayerNumber: function(data) {
    this.number = data.playerNumber
    console.log( 'player number: ', this.number )
  },

  updateDOM: function(data){
    console.log('updateDOM', data.playerNumber)
  },

  isCorrect: function(){
    this.socket.emit('isCorrect', {playerNumber: this.number })
  },
}

$(document).ready(function(){
  var game = new Game
})
