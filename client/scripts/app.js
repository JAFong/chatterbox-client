var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
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
      _.each(data.results, function(message){
        app.addMessage(message);
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
    $('#chats').append('<div class=username>' + _.escape(message.username) + ": " + _.escape(message.text) + '</div>');
  }
};

app.addRoom = function(roomName){
  $('#roomSelect').append('<div class=room>' + roomName + '</div>');
};

// $(document).ready(function(){
//   $('.username').on('click', function() {
//     console.log("clicked");
//   });
// });
app.addFriend = function(username) {

};

var currentRoom = "home";
$(document).ready(function(){
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
    'roomname': currentRoom
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
  $('.room').on('click', function(){
    var thisRoom = $(this).text();
    currentRoom = thisRoom;
    intervalHandle = null;
  })
 });
// Entering created room
});

intervalHandle = window.setInterval(function(){app.fetch();}, 1000);

