const mysql = require('mysql');
const express = require("express");
const bodyParser =require ("body-parser");
const app= express();


let firstnamevalue , lastnamevalue , countryvalue , subjectvalue;

const con = mysql.createConnection({
  host: "localhost",
  user: "yuktha",
  password: "****",
  database: "mydb"
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/submit",function(req,res){
     firstnamevalue=req.body.firstname;
    // console.log("firstname: "+firstname);
   
     lastnamevalue=req.body.lastname;
    // console.log("lastname: "+lastname);
     countryvalue=req.body.country;
    // console.log("country: "+country);
     subjectvalue=req.body.subject;
    // console.log("subject: "+subject);
    if (!firstnamevalue || !lastnamevalue || !countryvalue || !subjectvalue) {
      res.send('Please fill all fields');
    } else {
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      // SQL query only executes if all fields are filled
      con.query('INSERT INTO contactData (firstname,lastname,country,subject ) VALUES (?, ?, ? , ?)', [firstnamevalue, lastnamevalue,countryvalue,subjectvalue], function (err, result) {
        if (err) {
          console.error(err);
          res.send('Error submitting form');
        } else {
          console.log(result);
          res.send('Form submitted successfully');
        }
      });
      con.query("SELECT * FROM contactData", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
  }
});



 
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "yuktha",
//   password: "2480",
//   database: "mydb"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE contactData(firstname VARCHAR(200),lastname VARCHAR(200),country VARCHAR(100), subject VARCHAR(1000))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "ALTER TABLE contactData ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table altered");
//     });
//   });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   con.query('INSERT INTO contactData (firstname,lastname,country,subject ) VALUES (?, ?, ? , ?)', [firstnamevalue, lastnamevalue,countryvalue,subjectvalue], function (error, result) {
  //     if (error) throw error;
  //     console.log('The result is: ', result);
  //   });
    // con.query("SELECT * FROM contactData", function (err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });
  //   // var sql = "INSERT INTO contactData (firstname,lastname,country,subject ) VALUES (firstnamevalue, lastnamevalue,countryvalue,subjectvalue)";
  //   // con.query(sql, function (err, result) {
  //   //   if (err) throw err;
  //   //   console.log("new record inserted");
  //   // });
  // });
  
  app.listen(3000,function(){
    console.log("server is running");
  });

  
