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

    });

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
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

//global.db = connection;

// all environments
const PORT = process.env.PORT || '3001'
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../public'))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// Define your routes here
app.get('/register', user.signup);
app.post('/register', user.signup);
app.get('/reset', user.reset);
app.post('/reset', user.reset);
app.post('/forgot', user.forgot);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile', user.profile);
app.post('/home/profile', user.editprofile);
app.get('/verification/', user.verify);

// Listen to the app on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});