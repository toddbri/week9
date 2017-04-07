/* jshint esversion: 6 */
const express = require('express');
const app = express();
const Promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib: Promise});
const bodyParser = require('body-parser');
const fs = require('fs');
const hbs = require('hbs');
const session = require('express-session');

var debugMode = false;
var db = pgp({
  database: 'restaurantv2',
});

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'dangly',
}));

app.get('/', (req,resp,next) => {
  resp.redirect('/ask');
});

app.get('/ask',(req,resp,next) => {
  resp.render('ask.hbs',{title: 'Welcome'});
});

app.get('/greet', (req,resp,next) => {
  if (req.session.name){
  resp.render('greet.hbs',{title: "Welcome back", name: req.session.name});
  return;
  }
  resp.send(`<a href="/ask">Please login first...thanks</a>`);
});

app.post('/submit_name', (req,resp,next) => {
  dl(req.body.name);
  req.session.name = req.body.name;
resp.redirect('/greet');
});

app.listen(8081,function(){dl("listening on 8081");});

const dl = (message) => {
  if (debugMode){
    console.log(message);
  }
};
