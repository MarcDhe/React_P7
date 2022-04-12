'use strict';




module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("User", {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true,
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
      avatar: Sequelize.STRING(),
      firstname: Sequelize.STRING(65),
      lastname: Sequelize.STRING(65),
      createdAt: Sequelize.DATE(),
      power:{
        type: Sequelize.STRING(10),
        defaultValue: 'plebs'
      }

    }); //https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("User");
  }
};
