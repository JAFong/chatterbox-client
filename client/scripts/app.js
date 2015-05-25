var app = {};
app.init = function(){};
app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
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
app.fetch = function(url) {
  $.ajax({
    // always use this url
    url: url,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message recieved');
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
  $('#chats').append('<div>' + message.username + ": " + message.text + '</div>');
};
app.addRoom = function(roomName){
  $('#roomSelect').append('<div></div>');
};
