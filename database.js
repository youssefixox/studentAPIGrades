var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cin text UNIQUE, 
            math number, 
            physique number,
            arab number,
            anglais number, 
            CONSTRAINT cin_unique UNIQUE (cin)
            )`,(err) => {
        if (err) {
            // Table already created
            // console.log(err)
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO user (cin,math,physique,arab,anglais) VALUES (?,?,?,?,?)'
            db.run(insert, ["x1234","17","11","13","14"])
            db.run(insert, ["c1234","7","11","13","12"])
        }
    })  
    }
})


module.exports = db

