const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Jonny',
    password: 'Ch0k0l4t3',
    database: 'setjuegos'
});

connection.connect((err) =>{
    if(err) throw err
    console.log('la conexion funciona');
});