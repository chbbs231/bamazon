const inquirer = ("inquirer")
const mysql = require("mysql2")
const Table = require("cli-table2")


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
})

connection.connect();

var display = function() {
    connection.query("Select * From bamazon_db.products", function (err, res){
        if (err) throw err;
        console.log("------------------------");
        console.log(" Hi! Welcome to Bamazon ");
        console.log("------------------------");
        console.log("");
        
    var table = new Table({
        head: ["Item_Id", "Product_Name","Department_Name", "Price", "Stock_Quantity"],
        colWidths: [15, 30, 20, 10, 10],
        colAligns: ["center", "left", "right"],
        style: {
            head: ["aqua"],
            compact: true
        }
    });    
    for (var i = 0; i <res.length; i++){
        table.push([res[i].Id, res[i].Product_Name,res[i].Department_Name, res[i].Price, res[i].Stock_Quantity])}
    console.log(table.toString());
    console.log("")
    shopping()
     })
}
var shopping = function(){
    inquirer.prompt ({
        name: "toBuy",
        type : "input",
        message: "Id of Item"
    })
    .then(function(answer1){
        var selection = answer1.toBuy;
        connection.query("SELECT * FROM product WHERE Id=?", selection, function(err, res){
                if (err) throw err;
                if (res.length ===0){
                    console.log( "Does not exist, Pick another Id")
                
        shopping();
        } else {
            inquirer. prompt ({
                name: "quantity",
                type: "input",
                message: "How many items?"
            })
        .then (function(answer2){
            var quantity = answer2.quantity;
            if (quantity > res[0].Stock_Quantity){
                console.log("We only have" + res[0].Stock_Quantity + "items of the product")
                shopping()
            }
        else{
            console.log("");
            console.log(res[0].Product_Name + "purchased");
            console.log( quantity + "qty @ $" + res[0].Price)
       
        var newQuantity = res[0].Stock_Quantity - quantity
        connection.query(
            "UPDATE products SET Stock_Quantity = " + newQuantity + "WHERE id =" + res[0].id,
        function(err,resUpdate){
            if(err) throw err;
            console.log("")
            console.log("Order has been Submitted")
            console.log("Thank you come again")
            console.log("")
            connection.end()
                }
            );
        }
    });
    }
    });
})
};

display();