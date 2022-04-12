const Sequelize = require ('sequelize');

module.exports = sequelize.define("Comment", {  // ici rien de plus car defini en global precedement dans connection
  id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  content: {type : Sequelize.STRING(300), required : true},
  imageUrl: Sequelize.STRING(255),
  user_id: Sequelize.INTEGER(11),
  post_id: Sequelize.INTEGER(11),

},{tableName: "comment"})
