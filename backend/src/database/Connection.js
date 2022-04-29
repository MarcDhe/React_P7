const Sequelize = require('sequelize');
require('dotenv').config() // SECURITE

const sequelize = new Sequelize(`${process.env.DATA_BASE}`, `${process.env.DATA_BASE_USER}`, "",
{
  host : `${process.env.DATA_BASE_HOST}`,
  dialect: `${process.env.DATA_BASE_DIALECT}`,
});

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})


sequelize.sync({ force: false })  // FORCE A CREER LES TABLES SI ELLES NE LE SONT PAS 
.then(() => {                       // probleme crée automatiquement createdAT et updateAt meme sur le user
    console.log('yes re-sync done!')
})

module.exports = sequelize;
global.sequelize = sequelize; // mis en global pour ne pas avoir a le declarer systematiqeuement