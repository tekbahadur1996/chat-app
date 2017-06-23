var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'abc@example.com',
  //   text: 'hurrrrr'
  // });

  // socket.emit('createMessage', {
  //   from: 'pawan@example.com',
  //   text: 'hey there'
  // });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
// console.log('new email', email);
// });
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message. from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li =jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'tek',
//   text: 'hi'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});
