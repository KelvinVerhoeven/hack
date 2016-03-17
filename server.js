var http = require("http");
var express = require('express');
var request = require("request");
var path = require("path");
var bodyParser = require('body-parser');
var fs = require("fs");
var _ = require("underscore");


var app = express();


var file = "test.db";
var exists = fs.existsSync(file);
if (!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);


var init = function () {

    console.log("startUp");


}

var store = function (data) {

    db.serialize(function () {

        console.log(exists);
        if (!exists) {
            db.run("CREATE TABLE message (direction TEXT )");
            exists = true;
        }

        var stmt = db.prepare("INSERT INTO message VALUES (?)");
        stmt.run(data);
        stmt.finalize();

        //db.each("SELECT rowid AS id, direction FROM message", function (err, row) {
        //    console.log(row.id + ": " + row.direction);
        //});

    });
};

//db.serialize(function () {

//    if (!exists) {
//        db.run("CREATE TABLE Stuff (thing TEXT)");
//    }

//    var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

//    //Insert random data
//    var rnd;
//    for (var i = 0; i < 10; i++) {
//        rnd = Math.floor(Math.random() * 10000000);
//        stmt.run("Thing #" + rnd);
//    }

//    stmt.finalize();

//    db.each("SELECT rowid AS id, thing FROM Stuff", function (err, row) {
//        console.log(row.id + ": " + row.thing);
//    });
//});

app.use(express.static(path.join(__dirname,'./css')));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function (req, res) {

    console.log("Got request");
    res.sendFile(path.join(__dirname,'./page/start.html'));

});

app.post("/direction", function (req,res) {
    
    console.log("post request  " + req.body.position);


    //run script lel
    store(req.body.position);

    res.json("OK");

})
app.listen(8001);
init();