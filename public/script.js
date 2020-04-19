const url = 'https://com-pots.herokuapp.com'
// const url = 'http://localhost:3000'
const socket = io(url)
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
var round = "Articulate"

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
  var team = (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  roomContainer.append(roomElement)

  var playerForm = document.createElement('form');
  playerForm.setAttribute('action', '/player');
  playerForm.setAttribute('method', 'post');

  var roomInput = document.createElement('input');
  roomInput.setAttribute('type', 'hidden');
  roomInput.setAttribute('name', 'room');
  roomInput.setAttribute('value', room);
  playerForm.appendChild(roomInput);
  document.body.appendChild(playerForm);

  var teamInput = document.createElement('input');
  teamInput.setAttribute('type', 'hidden');
  teamInput.setAttribute('name', 'team');
  teamInput.setAttribute('value', team);
  playerForm.appendChild(teamInput);
  document.body.appendChild(playerForm);

  var button = document.createElement('button');
  button.setAttribute('class', 'btn btn-primary')
  button.setAttribute('type', 'submit')
  button.innerHTML = 'Join'
  playerForm.appendChild(button)
  document.body.appendChild(playerForm)

  roomElement.append(playerForm)
})

socket.on('player-created', player => {
  socket.emit('new-user', player.room, player)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('counter', count => {
  document.getElementById("countdown").innerHTML = count
  if (count===0) {
    
    if (timeout == true) {
        var counter = 2;
        var clock = setInterval(function(){
        counter--
        if (counter === 0) {
          clearInterval(clock);
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

          var roundInput = document.createElement('input');
          roundInput.setAttribute('type', 'text');
          roundInput.setAttribute('name', 'round');
          roundInput.setAttribute('value', round);
          myForm.appendChild(roundInput);
          document.body.appendChild(myForm);

          myForm.submit();
            }
          }, 1000);
    } else {
      var totalScore = redTeamScore + blueTeamScore + score
      var totalWords = potArray1.length + potArray2.length

      if (totalWords != 0 && totalScore >= totalWords * 4) {
        var endGameForm = document.createElement('form');
        endGameForm.setAttribute('action', '/endGame');
        endGameForm.setAttribute('method', 'post');
        endGameForm.setAttribute('hidden', 'true');

        var roomInput = document.createElement('input');
        roomInput.setAttribute('type', 'text');
        roomInput.setAttribute('name', 'room');
        roomInput.setAttribute('value', room);
        endGameForm.appendChild(roomInput);
        document.body.appendChild(endGameForm);

        endGameForm.submit();

      } else {
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

         var roundInput = document.createElement('input');
        roundInput.setAttribute('type', 'text');
        roundInput.setAttribute('name', 'round');
        roundInput.setAttribute('value', round);
        myForm.appendChild(roundInput);
        document.body.appendChild(myForm);

        myForm.submit();
      } 
    }
  }
})

socket.on('back-home', () => {
  var roomsURL = `${url}/rooms`
  window.location = roomsURL 
})

socket.on('user-disconnected', player => {

})

socket.on('start-game', room => {
  var gameURL = `${url}/${room}/start/1`
  window.location = gameURL
})

socket.on('show-pot', data => {
  potArray1 = data.pot1
  potArray2 = data.pot2
  var firstWord = potArray1[Math.floor(Math.random() * potArray1.length)]
  document.getElementById('word').innerHTML = firstWord
  $('#nextButton').show()
})

// socket.on('change-display', () => {

// var totalScore = redTeamScore + blueTeamScore
// var totalWords = potArray1.length + potArray2.length

// console.log(totalScore)
// console.log(totalWords)
//   if (totalScore == totalWords) {
//     document.body.style.backgroundColor = "blue";
//   }
//   if (totalScore == totalWords * 2) {
//     document.body.style.backgroundColor = "green";
//   } 
//   if (totalScore == totalWords * 3) {
//     document.body.style.backgroundColor = "purple";
//   }
// })

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
  timeout = false;
  socket.emit('start-timer', room)
  }

function nextWord() {
  var wordToRemove = $('#word').html()
  var totalScore = (redTeamScore + blueTeamScore + score) + 1
  var i = potArray1.indexOf(wordToRemove)
  if (i > -1) {
    potArray1.splice(i, 1);
    potArray2.push(wordToRemove)
  }

  if (potArray1.length == 0) {
    potArray1 = potArray2
    potArray2 = []

    if(totalScore < potArray1.length) {
      document.getElementById('round').innerHTML = "Articulate"
      round = "Charades"
    }
    if(totalScore == potArray1.length) {
      document.getElementById('round').innerHTML = "Charades"
      round = "Charades"
    }
    if(totalScore == potArray1.length * 2) {
      document.getElementById('round').innerHTML = "One Word"
      round = "One Word"
    }
    if(totalScore == potArray1.length * 3) {
      document.getElementById('round').innerHTML = "One Action"
      round = "One Action"
    }
    if(totalScore == potArray1.length * 4) {
      document.getElementById('round').innerHTML = "Articulate"
      round = "Game Over"
    }
  }

  currentPlayer % 2 == 1 ? redTeamScore ++ : blueTeamScore ++

  var word = potArray1[Math.floor(Math.random() * potArray1.length)]
  document.getElementById('word').innerHTML = word

}