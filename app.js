const express = require("express");
const path = require('path');     //Import von Nodejs
const mysql = require("mysql");
const dotenv = require('dotenv');     //Bezug zu Anmeldedaten, die anonymisiert werden
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});     //File Directory der Anmeldedatendatei

const app = express();

const db = mysql.createConnection({   //Daten aus .env -File
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); //Bezug zu Directory

// Daten aus Formular abholen
app.use(express.urlencoded({ extended: false }));
// Formulardaten als JSON verarbeiten
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');    //Template für Websites

db.connect( (error) => {
  if(error) {
    console.log(error)
  } else {
    console.log("MYSQL Connected...")
  }
})

//Definition URL Routen
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, () => {
  console.log("Server started on Port 5001");
})