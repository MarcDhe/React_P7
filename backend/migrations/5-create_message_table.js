'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Message",{

      id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      from_id: { type: Sequelize.INTEGER(11), allowNull: false},
      to_id: { type: Sequelize.INTEGER(11), allowNull: false},
      content:{ type: Sequelize.STRING(300), required: true},
      createdAt: Sequelize.DATE,
      readedAt: Sequelize.DATE,
      
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Message");
  }
};
