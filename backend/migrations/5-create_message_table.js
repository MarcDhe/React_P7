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
      from_id: { 
        type: Sequelize.INTEGER(11),
         allowNull: false,
         onDelete: 'CASCADE',
         references: {
           model: 'User',
           as: 'from_id'
         }
        },
      to_id: { 
        type: Sequelize.INTEGER(11),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          as: 'from_id'
        }
      },
      content:{ type: Sequelize.STRING(300), required: true},
      createdAt: Sequelize.DATE,
      readedAt: Sequelize.DATE,
      
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Message");
  }
};
