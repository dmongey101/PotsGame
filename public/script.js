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

socket.on('counter', count => {
  document.getElementById("countdown").innerHTML = count
  if (count===1) {
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

// socket.on('user-connected', player => {
//     if (player.team == 'blue') {
//       appendBluePlayer(player.name)
//   } else {
//       appendRedPlayer(player.name)
//   }
// })


socket.on('user-disconnected', player => {

})

socket.on('start-game', room => {
  var url = `http://localhost:3000/${room}/start/1`
  window.location = url
})

socket.on('show-start', currentPlayer => {
  if (currentPlayer === socket.id) {
    startGameButton.style.display = 'block'
  }
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
  socket.emit('start-timer')
  }
