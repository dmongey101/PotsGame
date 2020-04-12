const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const playerContainer = document.getElementById('player-conatiner')
const blueContainer = document.getElementById('blue-container')
const redContainer = document.getElementById('red-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const redTeamContainer = document.getElementById('redTeam')
const blueTeamContainer = document.getElementById('blueTeam')
const startGameButton = document.getElementById('startGame')


$("#fourWords").submit(function(e) {

    e.preventDefault();

    var form = $(this);
    var url = form.attr('action');
    $.ajax({
           type: "POST",
           url: url,
           data: form.serialize(),
           success: function(data)
           { 
           }
         });
    $('#fourWordsModal').hide();;

});


socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('player-created', player => {
  socket.emit('new-user', player.room, player)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('counter', data => {
  document.getElementById("countdown").innerHTML = data.count
  if (data.count===1) {
    currentPlayer ++
    var myForm = document.createElement('form');
    myForm.setAttribute('action', '/nextPlayer');
    myForm.setAttribute('method', 'post');
    myForm.setAttribute('hidden', 'true');
    var currentPlayerInput = document.createElement('input');
    currentPlayerInput.setAttribute('type', 'number');
    currentPlayerInput.setAttribute('name', 'currentPlayer');
    currentPlayerInput.setAttribute('value', currentPlayer);
    myForm.appendChild(currentPlayerInput);
    document.body.appendChild(myForm);
    var roomInput = document.createElement('input');
    roomInput.setAttribute('type', 'text');
    roomInput.setAttribute('name', 'room');
    roomInput.setAttribute('value', room);
    myForm.appendChild(roomInput);
    document.body.appendChild(myForm);
    myForm.submit();
  }
})

socket.on('user-disconnected', player => {

})

socket.on('start-game', room => {
  var url = `http://localhost:3000/${room}/start/1`
  window.location = url
})

socket.on('show-pot', pot1 => {
  console.log(pot1)
  var firstWord = pot1[Math.floor(Math.random() * pot1.length)]
  $('#word').innerHTML = firstWord;
})

// function appendPlayer(player) {
//   const playerElement = document.createElement('div')
//   playerElement.innerText = player
//   playerContainer.append(playerElement)
// }


function closeModal() {
  const myModal = document.getElementById('myModal')
  const roomModal = document.getElementById('createRoomModal')
  myModal.style.display = 'none'
  roomModal.style.display = 'none'
}

function showRoomForm() {
  const roomModal = document.getElementById('createRoomModal')
  roomModal.style.display = 'block'
}

function startTimer() {
  $("#startButton").hide()
  socket.emit('start-timer', room)
  }
