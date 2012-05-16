(function() {
  var App;
  App = {};
  /*
  	Init 
  */
  App.init = function() {
  	console.log('plaka');
    App.canvas = document.createElement('canvas');
    App.canvas.height = 400;
    App.canvas.width = 800;
    
    // document.getElementsByTagName('article')[0].appendChild(App.canvas);
    // document.getElementById('canvasHolder').appendChild(App.canvas);
    $('#canvasHolder').get(0).appendChild(App.canvas);
    
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "0x000000";
    App.ctx.strokeStyle = "#ECD018";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    
    App.ctx.fillRect(40, 40, 100, 100);
    
    console.log('fash?');
    
    App.socket = io.connect('http://localhost:8080');
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type);
    });
    
    App.draw = function(x, y, type) {
    	console.log('draw?');
      if (type === "dragstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
  };
  
  $('canvas').click( function(e) {
  	alert('ante gamisou');
  	console.log('ti me les?');
  });
  
  $('canvas').on('click', function(e) {
  	console.log('ti me les?');
  });
  
  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
  	console.log('huh?');
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type);
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type
    });
  });
  
  $(function() {
    return App.init();
  });
}).call(this);
