require('dotenv').config();
const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

let port = process.env.PORT;

if (process.env.NODE_ENV === 'development') {
  port = 3000;
}

const https_redirect = function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

app.use(https_redirect);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'https://planet54.com');
  let allowedOrigins = ['https://planet54.com, https://planet54.co.za, https://planet54-live.myshopify.com, https://planet54-development.myshopify.com']

  let origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const routes = require('./routes');

//  Connect all our routes to our application
app.use('/', routes);

app.listen(port, () => {
  console.log(`P54 listening at http://localhost:${port}`)
})