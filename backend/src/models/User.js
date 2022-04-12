const Sequelize = require ('sequelize');


module.exports = sequelize.define("User", {  // ici rien de plus car defini en global precedement dans connection
  id:{
    type: Sequelize.INTEGER(11),
    allowNull : false,
    autoIncrement: true,
    primaryKey : true
  },
  username: {
    type: Sequelize.STRING(35),
    allowNull: false,
    unique: true
  },
  passwd: {
    type: Sequelize.STRING(65),
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING(255),
    defaultValue: `http://localhost:3000/pictures/avatars/default_avatar.png`, // CHANGE FOR PRODUCTION
  },
  firstname: {
    type: Sequelize.STRING(65)
  },
  lastname: {
    type: Sequelize.STRING(65)
  },
  createdAt:{
    type: Sequelize.DATE(3),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
  },
  power:{
    type: Sequelize.STRING(10),
    defaultValue: 'plebs'
  }

},{timestamps: false, tableName: 'user'}) //https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names

