const Room=require('./Models/Room')
const Message=require('./Models/Message')
// const express=require('express')
// const path=require('path')
// const publicDir = path.join(__dirname,'Public')
// const db=require('./Database/db')
// const UserRouter=require('./Routes/User.Routes')
// const RentHouseRouter=require('./Routes/RentHouse.Routes')
// const morgan=require('morgan')
// const cors=require('cors')
// const io = require('socket.io')(httpserver, {cors: {origin: "*"}})
// app.use(express.static(publicDir));
// app.use(cors())
// app.use(express.json())
// app.use(morgan('tiny'))
// app.use('/user',UserRouter)

const validateForm = require("./Validations/Validationform");

app.get("/", (req, res) => {
  Room.find({}, (err, rooms) => {
    if (err) return console.log(err);
    res.json(rooms);
  });
});

// create a new room
app.post("/rooms", validateForm, (req, res) => {
  let roomName = req.body["roomName"];
  let generatedRoom = new Room({ name: roomName });

  generatedRoom.save((err, res) => {
    if (err) return console.log(err);
  });

  res.status(201);
  res.end();
});


io.on("connection", (socket) => {
  socket.on("joinRoom", (data) => {
    Message.find({ room: data }).then((result) => {
      socket.emit("output-messages", result);
    });
  });

  socket.on("message", (data) => {
    let author = data.author;
    let message = data.message;
    let id = data.room;

    Room.findOne({ _id: id }).then((room) => {
      let generatedMessage = new Message({ author, message, room });
      generatedMessage.save((err, res) => {
        if (err) return console.log(err);
      });
      io.emit("message", generatedMessage);
    });
  });
});