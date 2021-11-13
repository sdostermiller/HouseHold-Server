const User = require("./user");
const House = require("./house");
const List = require("./list");
const Item = require("./item");



// Associations

User.hasMany(List);
User.hasMany(Item);
User.belongsTo(House);

House.hasMany(User);
House.hasMany(List);
House.hasMany(Item);


List.belongsTo(House);
List.hasMany(Item);
// List.belongsToMany(User);

Item.belongsTo(List);
// Item.belongsToMany(List);
// Item.belongsToMany(User);




module.exports = {
  User,
  House,
  List,
  Item
};
