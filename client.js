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
    $('#field').keyup( this.isCorrect.bind(this) )
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
    var reg = new RegExp($('#field').val())
    var tof = $('#sample').text()
    if (reg.test(tof)) {
      var trueStyles = {
        background: "green",
        color: "white"
      }
      $('#field').css(trueStyles)
      this.socket.emit('isCorrect', {playerNumber: this.number })
    } else {
      falseStyles = {
        background: "red",
        color: "white"
      }
      $('#field').css(falseStyles)
    }
  },
}

$(document).ready(function(){
  var game = new Game
})
