const inquirer = ('inquirer')
const mysql = require('mysql2')
const Table = require('cli-table2')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
})

connection.connect();

var display = function() {
    connection.query('Select * From bamazon_db.products', function (err, res){
        if (err) throw err;
        console.log("------------------------");
        console.log(" Hi! Welcome to Bamazon ");
        console.log("------------------------");
        console.log("");
        
    const table = new Table({
        head: ["Item Id", "Product Name","Department Name", "Price", "Stock Quantity"],
        colWidths: [30, 30, 20, 20,20],
        colAligns: ["center", "left", "right"],
        style: {
            head: ["aqua"],
            compact: true
        }
    });    
    for (let i = 0; i <res.length; i++){
        table.push([res[i].Id, res[i].Product_Name,res[i].Department_Name, res[i].Price, res[i].Stock_Quantity])}
    console.log(table.toString());
    console.log("")
     })
}
    display();