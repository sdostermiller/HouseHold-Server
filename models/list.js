const { DataTypes } = require("sequelize");
const db = require("../db");


// Example UserTable Build this out Need more columns add it here

const List = db.define("list", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },

  listName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  listType: {
      type: DataTypes.STRING(100),
      allowNull: true,
  },

  houseName: {
      type: DataTypes.STRING,
  },

  houseId: {
      type: DataTypes.UUID
  },

  listId: {
      type: DataTypes.UUID
  }

});

module.exports = List;
