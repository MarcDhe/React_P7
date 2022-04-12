const Sequelize = require ('sequelize');

module.exports = sequelize.define("Liked", {  // ici rien de plus car defini en global precedement dans connection

  post_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
  user_id: { type: Sequelize.INTEGER(11), allowNull: false,primaryKey : true},
  
},{timestamps: false, tableName: "Liked"})
