const inquirer = ('inquirer')
const mysql = require('mysql2')
const table = require('cli-table2')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
})

connection.connect();

var display = function(){
    connection.query("Select * From bamazon_db.products", function (err, res){
        if (err) throw err;
        console.log("------------------------")
        console.log(" Hi! Welcome to Bamazon ")
        console.log("------------------------")
        console.log("")
        
    })
    var table = new Table({
        head: ["Item-Id", "Product_Name","Department_Name", "Price", "Stock_Quantity"],
        colWidths: [30, 30, 20, 20,20],
        colAlign: ["center", "left", "right"]
    });    
    for (let i = 0; i <res.length; i++){
        table.push(res[i].Item-Id, res[i].Product_Name,res[i].Department_Name, res[i].Price, res[i].Stock_Quantity)
    }
    console.log(table.toString());
    console.log("")
}
    display()