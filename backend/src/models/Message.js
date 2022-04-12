
const Sequelize = require ('sequelize');

module.exports = sequelize.define("Message", {  // ici rien de plus car defini en global precedement dans connection

  id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  from_id: { type: Sequelize.INTEGER(11), allowNull: false},
  to_id: { type: Sequelize.INTEGER(11), allowNull: false},
  content:{ type: Sequelize.STRING(300), required: true},
  createdAt:{
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
  },
  readedAt:{
    type: Sequelize.DATE(3),
    defaultValue: null,
  }

},{timestamps: false, tableName: "Message"})