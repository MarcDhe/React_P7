const Comment = require('../models/Comment');
const Liked = require('../models/Liked');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;


exports.addComment = (req, res, next) => {
  if(req.body.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  let newComment = {
    user_id: req.auth.userId,
    post_id: req.params.id,
    ...req.body
  };
  Comment.create(newComment)
    .then((createOne) => res.status(200).json(createOne))
    .catch( error => res.status(400).json({ error }))
}

exports.getAllComment = (req, res, next) => {
  Comment.findAll({where: {post_id: req.params.id}})
    .then((comments) => res.status(400).json(comments))
    .catch( error => res.status(400).json({ error }))
}

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id }})
    .then((comment) => {
      if(!comment){
        return res.status(404).json({ error: 'Commentaire non trouvé !'})
      }
      if(comment.user_id !== req.auth.userId && req.auth.power !== 'admin'){
        return res.status(403).json({ error : 'Requete non autorisé !'})
      }
      comment.destroy()
      .then(()=> res.status(200).json({ message: 'Commentaire supprimé !'}))
      .catch(error => res.status(400).json({ error }))
    })
    .catch( error => res.status(500).json({ error }))
}

exports.updateComment = (req, res, next) => { // RIP CETTE ROUTE EN ATTENTE 
  if(req.body.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
      console.log(req.body.content)
      if(!comment){
        return res.status(200).json({ message: 'Commentaire non trouvé !'})
      }
    if(comment.user_id !== req.auth.userId && req.auth.power !== 'admin'){
      return res.status(403).json({ error : 'Requete non autorisé !'})
    }
    comment.update({content: req.body.content})
      .then(() => res.status(200).json({ message: 'Commentaire mise à jour !'}))
      .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
  }


  exports.getAllUserComment = (req, res, next) => {
    Comment.findAll({ where:{user_id: req.auth.userId},
                    order:[['createdAt', 'DESC']]})  
      .then((comments) => res.status(200).json(comments))
      .catch(error => res.status(400).json({ error }))
  }
  

    

