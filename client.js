function Game(){
}

Game.prototype = {
  init: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    socket.emit('data', {data:'racial slurs'})
    console.log('derp')
  }
}

function pageLoad(){
  var game = new Game
  $(document).ready(function(){
    game.init()})
  var socket = io.connect(window.location.origin)
}

pageLoad()
