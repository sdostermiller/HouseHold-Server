const { DataTypes } = require("sequelize");
const db = require("../db");

// Example UserTable Build this out Need more columns add it here

const Item = db.define("item", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },

  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  itemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
  },

  itemUrgent: {
      type: DataTypes.BOOLEAN, 
      setDefault: false
  },

  itemFavorite: {
      type: DataTypes.BOOLEAN,
      setDefault: false
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },

  houseId: {
    type: DataTypes.UUID,
    allowNull: true
  },

  listId: {
    type: DataTypes.UUID,
    allowNull: true
  }

});

module.exports = Item;
