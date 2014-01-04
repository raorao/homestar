function Game(){
}

Game.prototype = {
  init: function(){
    var field = document.getElementById('field')
    field.addEventListener('keypress',this.isCorrect,false)
    console.log('derp')
  },

  isCorrect: function(){
    socket.emit('data', {data:'racial slurs'})
    console.log('derp')
  }
}

function pageLoad(){
  var game = new Game
  window.addEventListener('load',function(){
    game.init()})
  var socket = io.connect(window.location.origin)
}

pageLoad()

