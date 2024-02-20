const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('https'); // Note: Should this be 'http' instead of 'https'?
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

const mysql = require('mysql');
let bodyParser = require('body-parser');

    //var verification = post.verification;
    var connection = mysql.createConnection({
      host: '50.6.160.15',
      user: 'cwzxvqte_root',
      password: 'Spiderman420!',
      database: 'cwzxvqte_login_validation',
      port: 3306,
      connectTimeout: 80000, // 20 seconds timeout for initial connection
     acquireTimeout: 80000  // 20 seconds timeout for acquiring a connection from the pool

    });

app.use(express.json());
const corsOptions = {
  origin: 'https://http-login-validation-rychlik.onrender.com',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

//app.use(bodyParser.staticProvider(__dirname + '/public'));

//This attempts the connection.
connection.connect(
  function (err, conn) {
    if (err) {
      console.error('Unable to connect: ' + err.message);
    }
    else {
      console.log('Successfully connected to mysql  test account.');
      // Optional: store the connection ID.
      // connection_ID = connection.getId();
    }
  }
);

// all environments
const PORT = process.env.PORT || '3001'
// Serve static files from the React client build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback route for all other routes - serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/register', user.signup);//call for signup page
app.post('/register', user.signup);//call for signup post 
app.get('/reset', user.reset);//call for signup page
app.post('/reset', user.reset);//call for signup page
app.post('/forgot', user.forgot);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile
app.post('/home/profile', user.editprofile);//to render users profile
app.get('/verification/', user.verify);
//Middleware
//Middleware

//Listen to app on port 3001. 
//Listen to app on port 3001. 
app.listen(PORT);