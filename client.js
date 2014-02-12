function Game(){
  this.init()
}

Game.prototype = {
  init: function(){
    this.socket = io.connect('wss://' + window.location.host)
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
    console.log('player number: ', this.number)
  },

  updateDOM: function(data){
    var temp = data.playerNumber
    var player = $('body').find("[data-player='" + temp + "']")
    var current = player.attr('data-position')
    player.attr('data-position', parseInt(current) + 1 )
    console.log('updateDOM: ', data.playerNumber)
  },

  keyCodeChecker: function(key) {
    if ((key >= 65 && key <= 90) // word char
      || (key >= 48 && key <= 57) // digits
      || key === 190) // period
      // does not account for MOST punctuation... FML
      {
      return true
    }
  },

  //this is kinda fuqqed. regexp suck.
  isCorrect: function(data){
    var key = data.keyCode
    var initialValue = $('#field').val()
    var period = /\./gi
    var inputValues = initialValue.replace(period, "\\.")
    var reg = new RegExp('^' + inputValues)
    var bodyText = $('#sample').text()

    if ((reg.test(bodyText)) && (this.keyCodeChecker(key))) {
      var trueStyles = {background: "green"}
      $('#field').css(trueStyles)
      this.socket.emit('isCorrect', {playerNumber: this.number })
    } else if (reg.test(bodyText)) {
      $('#field').css(trueStyles)
    } else {
      falseStyles = {background: "red"}
      $('#field').css(falseStyles)
    }
  },
}

$(document).ready(function(){
  var game = new Game
})
