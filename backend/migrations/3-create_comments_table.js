'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Comment",{
      id:{
        type: Sequelize.INTEGER(11),
        allowNull : false,
        autoIncrement: true,
        primaryKey : true
      },
      content: {type: Sequelize.STRING(300), required: true},
      imageUrl: Sequelize.STRING(255),
      user_id: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          as: 'user_id'}
      },
      post_id: {
        type :Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        references: {
          model: 'Post',
          as: 'post_id'}
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
    
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable("Comment");
  }
};
