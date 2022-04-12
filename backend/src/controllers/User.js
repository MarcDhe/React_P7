require('dotenv').config() // SECURITE 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../models/User');


exports.signUp = (req, res, next) => {
  let regName = new RegExp('^[a-zA-Z\-]+$') // DEBUT FINI PAR LETTRE AVEC POSSIBILITE -
  let regUsername = new RegExp('^[a-zA-Z0-9]+$') // CHIFFRE OU LETTRE 
  if(!regUsername.test(req.body.username) || req.body.username.length < 4 ){
    return res.status(400).json({ error : 'Username : 4 Charactères requis !'})
  }
  if(!regName.test(req.body.lastname) || req.body.lastname == ''){
    return res.status(400).json({ error : 'Nom de famille incorrect !'})
  }
  if(!regName.test(req.body.firstname) || req.body.firstname == ''){
    return res.status(400).json({ error : 'Prénom incorrect !'})
  } 
  User.findOne({where: {username: req.body.username}})
    .then(user => {
    if(user){
      return res.status(400).json({ error: 'Username déjà utilisé !'})
    }
  bcrypt.hash(req.body.passwd, 10) // renvoi une promesse
    .then(hash=> {
       const user = new User ({   // ATENTION  PROBLEME VEUT ABSOLUMENT CR2E UNE DATE updated created
        username: req.body.username,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        passwd: hash,
      });
      user.save()
        .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }));
    })
  })
  .catch( error => res.status(500).json({ error }))
}



exports.login = (req, res, next) => {
  User.findOne({where: {username: req.body.username}}) // ATTENTION ICI UTILISATION DU WHERE !NOSQL
    .then(user => {
      if(!user){
        return res.status(401).json({ error : 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.passwd, user.passwd)
        .then(valid => {
          if(!valid){
            return res.status(401).json({ error : 'Mot de passe incorect !'});
          }
          res.status(200).json({
            id : user.id,
            username : user.username,
            avatar : user.avatar,
            createdAt : user.createdAt,
            power: user.power,
            token: jwt.sign( // CREATION DU TOKEN
              {userId: user.id, power: user.power}, // user du token
              `${process.env.MY_SECRET_TOKEN}`, // A MODIF AVANT PRODUCTION
              {expiresIn: '24h'} // A MODIF AVANT PRODUCTION
            )
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.foundUser = ( req, res, next)=>{  
  console.log('ok')
  User.findOne({where:{id : req.auth.userId}}) 
    .then((user) => {
      const userInfo = {  
        id : user.id,
        username : user.username,
        avatar : user.avatar,
        createdAt : user.createdAt,
      }
      res.status(200).json(userInfo)})
}

exports.updateAvatar = (req, res, next ) => {
  User.findOne({where:{id : req.auth.userId}})
  .then((user) => {
    if(!user){
      return res.status(404).json({ error: "Utilisateur inexistant !"})
    } 
    // passage du userId dans le req.auth donc automatiquement le proprietaire
    const userNewAvatar = { avatar: `${req.protocol}://${req.get('host')}/pictures/avatars/${req.file.filename}`}
      if(user.avatar !== `http://localhost:3000/pictures/avatars/default_avatar.png`){
        const filename = user.avatar.split('/pictures/avatars/')[1]; // recup du nom du fichier pour le supprimé
        console.log("filname est :", filename)
        fs.unlink(`pictures/avatars/${filename}`, () => {
        console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
        })
    }
    user.update(userNewAvatar) // RETOURNE NOTRE NOUVELLE AVATAR
        .then(() => res.status(200).json(userNewAvatar))
        .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(400).json({ error }))
}

exports.changePassword = (req, res, next) => {
  console.log(req.body.currentPassword)
  User.findOne({where:{id : req.auth.userId}})
  .then((user) => {
    if(!user){
      return res.status(404).json({ error: "Utilisateur inexistant !"})
    }
    if(req.body.passwd !== req.body.newPasswordCheck){
      return res.status(400).json({ error: "Nouveau mot de passe incorrecte !"})
    }
    bcrypt.compare(req.body.currentPassword, user.passwd)
        .then(valid => {
          if(!valid){
            return res.status(401).json({ error : 'Mot de passe incorect !'});
          }
          bcrypt.hash(req.body.passwd, 10) // renvoi une promesse
          .then(hash=> {
            const userPassword = { passwd: hash };
            user.update(userPassword)
              .then(() => res.status(200).json({ message: 'Mot de passe modifié !'}))
              .catch( error => res.status(400).json({ error })); 
          })
          .catch( error => res.status(500).json({ error }));
        })
        .catch( error => res.status(500).json({ error }));  
  })
  .catch( error => res.status(500).json({ error }));  
}

exports.deleteUser = (req, res, next) => {
  User.findOne({where:{id : req.auth.userId}})
    .then((user) => {
      if(!user){
        return res.status(404).json({ error: "Utilisateur inexistant !"});
      };
      if(user.avatar !== `http://localhost:3000/pictures/avatars/default_avatar.png`){
        const filename = user.avatar.split('/pictures/avatars/')[1]; // recup du nom du fichier pour le supprimé
        fs.unlink(`pictures/avatars/${filename}`, () => {
        console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
        });
      }
      user.destroy()
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({ error }))
}

exports.toUserMessage = (req, res, next ) => {
  console.log('ici',req.body.username)
  User.findAll({where : {username : {[Op.like]:`${req.body.username}%`}}}) // SOURCE https://sequelize.org/master/manual/model-querying-basics.html
    .then((users) => {
      if(!users[0]){ // CAR FINDALL RENVOI UN TABLEAU
        return res.status(404).json({ error : 'Aucun Utilisateur trouvé !'});
      }
      const userArray = [];
      for(let i in users){
        userArray[i] = {id: users[i].id, username:users[i].username, }
      }
      res.status(200).json({userArray});
    })
    .catch(error => res.status(400).json({ error }))
}