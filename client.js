function Game(){
}

Game.prototype = {
  init: function(){
    this.bindSocketListeners()
    this.bindEventListeners()
  },

  bindSocketListeners: function(){
    //why is 'this' working?
    socket.on('updateDOM', this.updateDOM)
  },

  bindEventListeners: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    socket.emit('isCorrect', {playername:'player1'})
    console.log('client sends isCorrect')
  },

  updateDOM: function(data){
    //updatesMYdom
    console.log('updateDOM', data.playername)

  }
}




function pageLoad(){
  var game = new Game
  $(document).ready(function(){
    game.init()
  })
  var socket = io.connect(window.location.origin)
}

pageLoad()
