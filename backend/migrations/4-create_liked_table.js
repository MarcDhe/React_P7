'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Liked",{
      
      post_id: { 
        type: Sequelize.INTEGER(11),
        allowNull: false, primaryKey : true,
        onDelete: 'CASCADE',
        references: {
          model: 'Post',
          as: 'post_id'}
        }, 
      user_id: { type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey : true, 
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          as: 'user_id'}
        }

  });
}, 

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Liked");

  }
};
