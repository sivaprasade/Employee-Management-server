var express = require('express');
var app = express();
var mysql = require('mysql2');
var cors= require('cors');
var bodyparser=require('body-parser');

app.use(cors());

//json parser
var jsonParser=bodyparser.json();

//url parser
var urlencodedParser=bodyparser.urlencoded({extended:false})


 //mysql connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Siva",
  database: "employee"
});

con.connect((err) => {
  if (err) console.log(err);
  console.log("Connected to database");
});

// List employees
app.get("/employees", function(req, res) {
  con.query("SELECT * FROM employee_table", (err, result, fields) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });

});
// get single employee
app.get("/employees/:id",function(req,res){
  let id=req.params.id;
  con.query("SELECT * FROM employee_table where id="+id,(err,result,fields)=>{
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  })
})

// New employee
app.post("/employees",jsonParser, function(req, res) {
       let name=req.body.name;
       let email=req.body.email;
       let mobileno=req.body.mobileno;

       let qr=`insert into employee_table(name,email,mobileno) value('${name}','${email}','${mobileno}')`
       con.query(qr,(err,result)=>{
        if(err){
            res.send({error:"operation failed"});
        }
        else{
            res.send({success:"operation complete"});
        }
       })
  
});

// Update employee
app.patch("/employees/update/:id", jsonParser, function(req, res) {
    let id = req.params.id;
    let name=req.body.name;
       let email=req.body.email;
       let mobileno=req.body.mobileno;

    let qr = `UPDATE employee_table SET  name='${name}', email='${email}', mobileno='${mobileno}' WHERE id='${id}'`;
    con.query(qr, (err, result) => {
        if (err) {
            res.send({ error: "updation failed" });
        } else {
            res.send({ success: "updation complete" });
        }
    });
});


// Delete employee
app.delete("/employee/:id", function(req, res) {
  let id=req.params.id;
  let qr=`delete from employee_table where id='${id}'`
  con.query(qr,(err,result)=>{
    if(err){
        res.send({error:"delete failed"});
    }
    else{
        res.send({success:"delete complete"});
    }
   })
});



app.listen(9000, function() {
  console.log("Server started");
});
