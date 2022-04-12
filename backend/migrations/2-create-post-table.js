'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.createTable("Post",{
        id:{
          type: Sequelize.INTEGER(11),
          allowNull : false,
          autoIncrement: true,
          primaryKey : true
        },
        title: {type: Sequelize.STRING(125),required: true },
        content: {type: Sequelize.STRING(300), required: true},
        imageUrl: Sequelize.STRING(255),
        likes: Sequelize.INTEGER(10),
        userLiked: Sequelize.JSON(), 
        user_id: {
          type: Sequelize.INTEGER(11),
          onDelete: 'CASCADE',
          references: {
            model: 'User',
            as: 'user_id',}},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Post");
  }
};
