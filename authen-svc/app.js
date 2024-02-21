const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();

// Set up session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use connect-flash for flash messages
app.use(flash());
// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory user database (replace this with a database in a real-world application)
const users = [
  { id: 1, username: 'user1', password: 'password1', reminders:[] },
  { id: 2, username: 'user2', password: 'password2', reminders:[] }
];

// Passport local strategy
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect username or password' });
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

// Routes
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Reminder Page</title>
      </head>
      <body>
        <h2>Remind Me</h2>
        <form action="/setReminder" method="post">
          <label for="reminder">Remind me of:</label>
          <input type="text" id="reminder" name="reminder" required>
          <br>
          <button type="submit">Set Reminder</button>
        </form>
      </body>
    </html>
  `);
});


app.post('/setReminder', (req, res) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      const user = req.user;
      const reminder = req.body.reminder;
  
      // Add the reminder to the user's array
      user.reminders.push(reminder);
  
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  });

// app.post('/setReminder', (req, res) => {
//     if (req.isAuthenticated()) {
//         // Process the reminder form submission here
//         const reminder = req.body.reminder;
    
//         // You can store the reminder in a database or perform any other action here
//         // For now, storing the reminder in the user's object in memory
//         const user = req.user;
//         if (user) {
//           user.reminder = reminder;
//         }
    
//         res.redirect('/login');
//       } else {
//         res.redirect('/login');
//       }
//   });


app.get('/login', (req, res) => {
    res.send(`
    <h2>Login Page</h2>
    <form action="/login" method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    const user = req.user;
    const reminders = user.reminders || 'No reminder set'; // Display 'No reminder set' if no reminder is available

    res.send(`
      <h2>Welcome to the Dashboard, ${user.username}!</h2>
      <p>Your reminders:</p>
      <ul>
        ${reminders.map(reminder => `<li>${reminder}</li>`).join('')}
      </ul>
    `);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

