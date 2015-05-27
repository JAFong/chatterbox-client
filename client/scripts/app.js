var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  rooms: {home: []},
  currentRoom: "home"
};
app.init = function(){
  $(document).ready(function(){
  });
};
// app.init();
app.send = function(message){
  $.ajax({
    // always use this url
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};
app.fetch = function() {
  $.ajax({
    // always use this url
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      // console.log('chatterbox: Message recieved');
      _.each(data.results.reverse(), function(message){
        if (message.roomname && !app.rooms[message.roomname]){ //&& !$('#roomSelect').find('div').text('roomname')){
          app.rooms[message.roomname] = [];
          app.addRoom(message.roomname);
        } else if (!message.roomname) {
          message.roomname = "home";
        }
        var passed = true;
        for (var j = 0; j < app.rooms[message.roomname].length; j++) {
          if (app.rooms[message.roomname][j].objectId === message.objectId) {
            passed = false;
          }
        }
        if (passed){
          app.rooms[message.roomname].push(message);
          app.addMessage(message);
        }
      });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};
app.clearMessages = function(){
  $('#chats').children().remove();
};

app.addMessage = function(message) {
  if (message.username !== undefined && message.text !== undefined){
    $('#chats').prepend('<div class=username>' + _.escape(message.username) + ": " + _.escape(message.text) + '</div>');
  }
};

app.addRoom = function(roomName){
  $('#roomSelect').append('<div class=room>' + roomName + '</div>');
  $('.room').on('click', function(){
    var thisRoom = $(this).text();
    app.updatePage(thisRoom);
    app.currentRoom = thisRoom;
  })
};


// $(document).ready(function(){
//   $('.username').on('click', function() {
//     console.log("clicked");
//   });
// });
app.addFriend = function(username) {

};

app.updatePage = function(roomName) {
  clearInterval(intervalHandle);
  $('#chats').html('');
  var roomMessages = app.rooms[roomName];
  for (var i = 0; i < roomMessages.length; i++) {
    app.addMessage(roomMessages[i]);
  }
};

var intervalHandle = null;
$(document).ready(function(){
  intervalHandle = window.setInterval(function(){app.fetch();}, 1000);
  // Submitting custom messages
 $('#submit').on('click', function(){
   $('.messageBox').submit();
 });
 $('.messageBox').submit(function(){
  var thisUser = window.location.search.slice(10);
  var thisText = $('.messageBox').val();
  var newMessage = {
    'username': thisUser,
    'text': thisText,
    'roomname': app.currentRoom
  }
  console.log(newMessage);
  app.send(newMessage);
 });


// Submitting new rooms

 $('#submitRoom').on('click', function(){
   $('.roomBox').submit();
 });
 $('.roomBox').submit(function(){
  var roomText = $('.roomBox').val();
  app.addRoom(roomText);
 });
// Entering created room
});


