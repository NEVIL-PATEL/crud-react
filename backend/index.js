const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db =mysql.createPool({
    host : "localhost",
    user : "root",
    password: "",
    database : "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));


app.get("/api/get",(req,res)=>{
    const sqlGet = "select * from contact_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
});

app.post("/api/post",(req,res)=>{
    const {name , email , contact } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (? , ? , ?)";
    db.query(sqlInsert, [name, email , contact], (error,result) =>{
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id , (error,result) =>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "select * from contact_db where id= ? ";
    db.query(sqlGet, id ,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {name , email , contact } = req.body;
    const sqlUpdate = "update contact_db set name = ?, email =? , contact = ? where id = ? ";
    db.query(sqlUpdate, [name, email, contact, id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/",(req,res) => {
    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES ('nevil','nevil@gmail.com','933264656')";
    // db.query(sqlInsert,(err,result)=> {
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("hello express");
    // });
});

app.listen(5000, () =>{
    console.log("server is running on port 5000");
});

