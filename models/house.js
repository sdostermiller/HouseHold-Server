const { DataTypes } = require("sequelize");
const db = require("../db");

const House = db.define("house", {
id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
},

houseName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
},


});

module.exports = House;