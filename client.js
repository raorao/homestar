function Game(){
}

Game.prototype = {
  init: function(){
    this.bindSocketListeners()
    this.bindEventListeners()
  },

  bindSocketListeners: function(){
    socket.on('updateDOM', this.updateDOM)
  },

  bindEventListeners: function(){
    $('#field').keypress(this.isCorrect)
  },

  isCorrect: function(){
    socket.emit('isCorrect', {data:'player1'})
    console.log('client sends isCorrect')
  },

  updateDOM: function(){
    //updatesMYdom
    console.log('updateDOM')
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
