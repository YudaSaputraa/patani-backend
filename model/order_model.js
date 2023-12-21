const sequelize = require("sequelize");
const my_db = require("../utils/connect_db");

const Order = my_db.define("orders", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    qty: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Order;


// bisa tolong buatin 1 table untuk pesananan, isi field nya product id(int, foregnkey),
// seller id(int, foreignKey), buyerid(int, foreignkey)),
// qty(Int), total price(string) sama status(string).
//soal nya stuck bagian cart ini karena nggak cocook dan bingung cara pake di android nya.