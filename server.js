const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
const { v4: uuidv4 } = require('uuid');

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
  const redTeam = []
  const blueTeam = []

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
  rooms[req.body.room] = { noOfPlayers: req.body.noOfPlayers, players: [player] }
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
  if (rooms[player.room].players.length == rooms[player.room].noOfPlayers) {
    io.emit('start-game', player.room)
  } else {
    res.redirect(req.body.room)
  }
})

app.get('/:room/start/:currentPlayer', (req, res) => {
  db.collection('rooms').findOne({ room: req.params.room }, function (err, room) {
     var rTeam = room.redTeam
     var bTeam = room.blueTeam
     var noOfPlayers = parseInt(room.noOfPlayers)
     var currentPlayer = parseInt(req.params.currentPlayer)
     if (currentPlayer > room.noOfPlayers) {
       currentPlayer = 1
     }
     var user = req.session.passport.username
     res.render('start', { redTeam: rTeam, blueTeam: bTeam, currentPlayer: currentPlayer, user: user, room: room.room })
  });
})

app.post('/nextPlayer', (req, res) => {
  res.redirect(req.body.room + '/start/' + req.body.currentPlayer)
})

server.listen(3000)

io.on('connection', socket => {
  socket.on('new-user', (room, player) => {
    // socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })

  socket.on('start-timer', () => {
    var counter = 5;
    var WinnerCountdown = setInterval(function(){
      io.emit('counter', counter);
      counter--
      if (counter === 0) {
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  })

  // socket.on('disconnect', () => {
  //   getUserRooms(socket).forEach(room => {
  //     socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
  //     delete rooms[room].users[socket.id]
  //   })
  // })
})

function newPlayer(player) {
  assignTeam(player)
    if (rooms[player.room].players.length == rooms[player.room].noOfPlayers) {
      setRedTeamNo(redTeam)
      setBlueTeamNo(blueTeam)
      var dbRoom = { 'room': player.room, 'noOfPlayers': rooms[player.room].noOfPlayers, 'redTeam': redTeam, 'blueTeam': blueTeam }
      db.collection('rooms').insertOne(dbRoom, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
      })
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