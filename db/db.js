const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'9596802233',
    database:'assesment',


})

connection.connect((err)=>{
    if(err){
        console.log(err,": ERROR IN DB CONNECT")
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
})

module.exports=connection;