const { DataTypes } = require("sequelize");
const db = require("../db");

const List = db.define("list", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },

  listName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  listType: {
      type: DataTypes.STRING(100),
      allowNull: true,
  },

  houseId: {
      type: DataTypes.UUID
  },

  userId: {
      type: DataTypes.UUID
  }

});

module.exports = List;
