var PORT = process.env.PORT || 3000
const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://donal:Fog85nil@ds113799.mlab.com:13799/mongeypotsgame";

var db

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log(err);
  db = client.db('mongeypotsgame')

  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.collection('users').findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(function(id, cb) {
    db.collection('users').findOne({_id: id}, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  app.set('views', './views')
  app.set('view engine', 'ejs')
  app.use(express.static('public'))
  app.use(cookieParser('abcdefg'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
      secret: 'abcdefg',
      resave: true,
      saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());


 app.post('/signin',
    passport.authenticate('local', {
        // redirect back to /login
        // if login fails
        failureRedirect: '/'
    }),
 
    // end up at / if login works
    function (req, res) {
      req.session.passport = req.user
        res.redirect('/rooms');
    }
);

  const rooms = {}
  var redTeam = []
  var blueTeam = []

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.post('/signup', (req, res) => {
    db.collection('users').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
   })
  })

  app.get('/rooms', (req, res) => {
    res.render('rooms', { rooms: rooms })
  })

  app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  var player = {
    id: req.session.passport._id,
    name: req.session.passport.username,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
    room: req.body.room
  }
  rooms[req.body.room] = { noOfPlayers: req.body.noOfPlayers, redTeamScore: 0, blueTeamScore: 0, players: [player], pot1: [], pot2: [] }
  assignTeam(player)
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
})

app.post('/player', (req, res) => {
  var player = {
    id: req.session.passport._id,
    name: req.session.passport.username,
    team: req.body.team,
    room: req.body.room
  }
  rooms[req.body.room].players.push(player)
  newPlayer(player)
  res.redirect(req.body.room)
})

app.post('/fourWords', (req, res) => {
  req.body.word.forEach(word => {
    rooms[req.body.room].pot1.push(word)
  })
  if (rooms[req.body.room].noOfPlayers * 4 == rooms[req.body.room].pot1.length) {
      var players = redTeam.concat(blueTeam)
      var dbRoom = { 'room': req.body.room, 'noOfPlayers': rooms[req.body.room].noOfPlayers, currentRound: 'Articulate', redTeamScore: 0, blueTeamScore: 0, 'players': players, pot1: rooms[req.body.room].pot1, pot2: [] }
      db.collection('rooms').insertOne(dbRoom, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
      })
    io.emit('start-game', req.body.room)
  }
})
app.get('/:room/start/:currentPlayer', (req, res) => {
  db.collection('rooms').findOne({ room: req.params.room }, function (err, room) {
     if (room == null) {
       res.redirect('/rooms')
      } else {
          var players = room.players
          var noOfPlayers = parseInt(room.noOfPlayers)
          var currentPlayer = parseInt(req.params.currentPlayer)
          if (currentPlayer > room.noOfPlayers) {
            currentPlayer = 1
          }

          
          var user = req.session.passport.username
          res.render('start', { players: players, currentPlayer: currentPlayer, currentRound: room.currentRound, user: user, room: room.room, redTeamScore: room.redTeamScore, blueTeamScore: room.blueTeamScore })
        }
   });
})

app.post('/nextPlayer', (req, res) => {
  var pot1 = JSON.parse(req.body.pot1)
  var pot2 = JSON.parse(req.body.pot2)
  var redTeamScore = parseInt(req.body.redTeamScore)
  var blueTeamScore = parseInt(req.body.blueTeamScore)
  console.log(req.body.round)
  if (pot1.length != 0) {
      db.collection('rooms').findOneAndUpdate({room: req.body.room}, { $set: { pot1: pot1, pot2: pot2, currentRound: req.body.round }, $inc: { redTeamScore: redTeamScore, blueTeamScore: blueTeamScore }}, {returnOriginal:false}, (err, room) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Updated" + room)
          res.redirect(req.body.room + '/start/' + req.body.currentPlayer)
        }
      })
    } else {
      res.redirect(req.body.room + '/start/' + req.body.currentPlayer)
    }
  
})

app.post('/endGame', (req, res) => {
  db.collection('rooms').deleteOne( { room: req.body.room } )
  delete rooms[req.body.room]
  redTeam = []
  blueTeam = []

  res.redirect('/rooms')
})

server.listen(PORT)

io.on('connection', socket => {
  socket.on('new-user', (room, player) => {
    // socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })

  socket.on('start-timer', room => {
    getPot1(room, function(err, room) {
      if (err) {
        console.log(err)
      } else {
        socket.emit('show-pot', { pot1: room.pot1, pot2: room.pot2 })
      }    
    })

    var counter = 30;
    var WinnerCountdown = setInterval(function(){
      io.emit('counter', counter);
      counter--
      if (counter === -1) {
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  })

  // socket.on('change-round', () => {
  //   console.log('hello')
  //   socket.emit('change-display')
  // })

})

function newPlayer(player) {
  assignTeam(player)
    if (rooms[player.room].players.length == rooms[player.room].noOfPlayers) {
      setRedTeamNo(redTeam)
      setBlueTeamNo(blueTeam)
    } else {
    }
}

function setRedTeamNo(redTeam) {
  var i = 1
  redTeam.forEach(player => {
    player['position'] = i
    i += 2  
  })
}

function setBlueTeamNo(blueTeam) {
  var i = 2
  blueTeam.forEach(player => {
    player['position'] = i
    i += 2  
  })
}

function assignTeam(player) {
  var room = player.room
  if (player.team === 'blue') {
      if (blueTeam.length >= rooms[room].noOfPlayers / 2) {
        player.team = 'red'
        redTeam.push(player)
      } else {
        blueTeam.push(player)
      }
    } else {
      if (redTeam.length >= rooms[room].noOfPlayers / 2) {
        player.team = 'blue'
        blueTeam.push(player)
      } else {
        redTeam.push(player)
      }
    }
}

function getPot1(room, callback) {
  db.collection('rooms').findOne({ room: room }, function (err, room) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, room)
    }
  });
}