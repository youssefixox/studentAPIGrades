var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")
path = require('path')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.get("/api/user/cin/:cin", (req, res, next) => {
    var sql = "select * from user where cin = ?"
    var params = [req.params.cin]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/user/", (req, res, next) => {
   // var errors=[]
   // if (!req.body.password){
   //     errors.push("No password specified");
   // }
   // if (!req.body.email){
   //     errors.push("No email specified");
   // }
   // if (errors.length){
   //     res.status(400).json({"error":errors.join(",")});
   //     return;
   // }
    var data = {
        cin: req.body.cin,
        math: req.body.math,
        physique: req.body.physique,
        arab: req.body.arab,
        anglais: req.body.anglais
    }
    var sql ='INSERT INTO user (cin, math,physique,arab, anglais) VALUES (?,?,?,?,?)'
    var params =[data.cin, data.math, data.physique, data.arab,data.anglais]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        cin: req.body.cin,
        math: req.body.math,
        physique: req.body.physique,
        arab : req.body.arab,
        anglais: req.body.anglais
    }
    db.run(
        `UPDATE user set 
           cin = coalesce(?,cin), 
           math = COALESCE(?,math),
           physique= COALESCE(?,physique),
           arab=COALESCE(?,arab), 
           anglais = coalesce(?,anglais) 
           WHERE id = ?`,
        [data.cin, data.math, data.physique,data.arab,data.anglais,req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

