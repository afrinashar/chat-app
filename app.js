// const express = require('express');
// const mongoose = require('mongoose');
// const booksRoutes = require('./routes/bookRoutes');
// const path = require('path');
// var cors = require('cors');
// //const flash = require('express-flash');
// const app = express();
// //const passport = require('./config/passport');
// const session = require('express-session');

// app.use(cors());
// // Connect to MongoDB
// mongoose.connect(, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // useFindAndModify: false,
//   // useCreateIndex: true,
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB', err));
// // Set up express-session and express-flash
// app.use(session({
//   secret: 'your-secret-key',
//   resave: true,
//   saveUninitialized: true
// }));
// // Passport middleware
// //app.use(passport.initialize());
// //app.use(passport.session());
// // Set up the middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //app.use(flash());
// // Set up the static directory for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// // Set up routes
// // app.use((req, res, next) => {
// //   res.locals.success_msg = req.flash('success_msg');
// //   res.locals.error_msg = req.flash('error_msg');
// //   next();
// // });
// app.use(booksRoutes);
// // Routes
// //const authRoutes = require('./routes/index');
// //app.use(authRoutes);
// // Express middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// // Passport configuration
// //require('./config/passport');

// // Routes
// //app.use('/', indexRoutes);
// //app.use('/', adminRoutes);

// // Set up the port for the server to run
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express middleware
app.use(express.static(__dirname + '/public'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
