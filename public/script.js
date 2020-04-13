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
var potArray1 = []
var potArray2 = []
var redTeamScore = 0
var blueTeamScore = 0

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

    var pot1Input = document.createElement('input');
    pot1Input.setAttribute('type', 'text');
    pot1Input.setAttribute('name', 'pot1');
    pot1Input.setAttribute('value', JSON.stringify(potArray1));
    myForm.appendChild(pot1Input);
    document.body.appendChild(myForm);

    var pot2Input = document.createElement('input');
    pot2Input.setAttribute('type', 'text');
    pot2Input.setAttribute('name', 'pot2');
    pot2Input.setAttribute('value', JSON.stringify(potArray2));
    myForm.appendChild(pot2Input);
    document.body.appendChild(myForm);

    var redTeamScoreInput = document.createElement('input');
    redTeamScoreInput.setAttribute('type', 'number');
    redTeamScoreInput.setAttribute('name', 'redTeamScore');
    redTeamScoreInput.setAttribute('value', redTeamScore);
    myForm.appendChild(redTeamScoreInput);
    document.body.appendChild(myForm);

    var blueTeamScoreInput = document.createElement('input');
    blueTeamScoreInput.setAttribute('type', 'number');
    blueTeamScoreInput.setAttribute('name', 'blueTeamScore');
    blueTeamScoreInput.setAttribute('value', blueTeamScore);
    myForm.appendChild(blueTeamScoreInput);
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

socket.on('show-pot', data => {
  potArray1 = data.pot1
  potArray2 = data.pot2
  var firstWord = potArray1[Math.floor(Math.random() * potArray1.length)]
  document.getElementById('word').innerHTML = firstWord
  $('#nextButton').show()
})

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

function nextWord() {
  var wordToRemove = $('#word').html()
  var i = potArray1.indexOf(wordToRemove)
  if (i > -1) {
    potArray1.splice(i, 1);
    potArray2.push(wordToRemove)
  }

  if (potArray1.length == 0) {
    potArray1 = potArray2
    potArray2 = []
  }

  currentPlayer % 2 == 1 ? redTeamScore ++ : blueTeamScore ++

  var word = potArray1[Math.floor(Math.random() * potArray1.length)]
  document.getElementById('word').innerHTML = word

}