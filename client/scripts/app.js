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
      console.log('chatterbox: Message recieved');
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
  $('#chats').append('<div class=username>' + _.escape(message.username) + ": " + _.escape(message.text) + '</div>');
};
app.addRoom = function(roomName){
  $('#roomSelect').append('<div></div>');
};
$(document).ready(function(){
  $('.username').on('click', function() {
    console.log("clicked");
  });
});
app.addFriend = function(username) {

};
setInterval(function(){app.fetch();}, 1000);
