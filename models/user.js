const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  userName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  userRole: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  
  houseId: {
    type: DataTypes.UUID,
  }
  

});

module.exports = User;
