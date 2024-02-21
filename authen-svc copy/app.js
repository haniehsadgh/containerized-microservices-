require('dotenv').config()


const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')

const app = express();
// const User = require('../mongodb-svc/userModel.js');

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

// Serve register.html at /register
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// Serve login.html at /login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Routes
const authRoute = require('./routes/auth')
app.use('/auth', authRoute)

app.use(express.static('public'));

// // Routes
// app.get('/', (req, res) => {
//     res.send(`
//     <html>
//       <head>
//         <title>Reminder Page</title>
//       </head>
//       <body>
//         <h2>Remind Me</h2>
//         <form action="/setReminder" method="post">
//           <label for="reminder">Remind me of:</label>
//           <input type="text" id="reminder" name="reminder" required>
//           <br>
//           <button type="submit">Set Reminder</button>
//         </form>
//       </body>
//     </html>
//   `);
// });


// app.post('/setReminder', (req, res) => {
//     // Check if the user is authenticated
//     if (req.isAuthenticated()) {
//       const user = req.user;
//       const reminder = req.body.reminder;
    
//       if (!Array.isArray(user.reminders)) {
//         user.reminders = [];
//       }
//       // Add the reminder to the user's array
//       user.reminders.push(reminder);
//       user.save()
  
//       res.redirect('/dashboard');
//     } else {
//       res.redirect('/login');
//     }
//   });

// // app.post('/setReminder', (req, res) => {
// //     if (req.isAuthenticated()) {
// //         // Process the reminder form submission here
// //         const reminder = req.body.reminder;
    
// //         // You can store the reminder in a database or perform any other action here
// //         // For now, storing the reminder in the user's object in memory
// //         const user = req.user;
// //         if (user) {
// //           user.reminder = reminder;
// //         }
    
// //         res.redirect('/login');
// //       } else {
// //         res.redirect('/login');
// //       }
// //   });


// app.get('/login', (req, res) => {
//     res.send(`
//     <h2>Login Page</h2>
//     <form action="/login" method="post">
//       <label for="username">Username:</label>
//       <input type="text" id="username" name="username" required>
//       <br>
//       <label for="password">Password:</label>
//       <input type="password" id="password" name="password" required>
//       <br>
//       <button type="submit">Login</button>
//     </form>
//   `);
// });

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// app.get('/dashboard', (req, res) => {
//   // Check if the user is authenticated
//   if (req.isAuthenticated()) {
//     const user = req.user;
//     const reminders = user.reminders || 'No reminder set'; // Display 'No reminder set' if no reminder is available

//     res.send(`
//       <h2>Welcome to the Dashboard, ${user.username}!</h2>
//       <p>Your reminders:</p>
//       <ul>
//         ${reminders.map(reminder => `<li>${reminder}</li>`).join('')}
//       </ul>
//     `);
//   } else {
//     res.redirect('/login');
//   }
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/register`))

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});