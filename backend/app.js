const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
const cors = require('cors');
const session = require('express-session');
const app = express();
const cookieParser = require("cookie-parser");



const mysql = require('mysql');
let bodyParser = require("body-parser");


//This creates the connection to mysql database
var connection = mysql.createConnection({
  host: "cloud19.hostgator.com",
  user: "uzaqleuw_root",
  password: "3Hotdogs!"
});

//This code allows the connect to the frontend. 
app.use(express.json());
const corsOptions ={
  origin:'https://excel-transaction-test.herokuapp.com/', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
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
const PORT = process.env.PORT || '8080'
app.set('port', PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
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
