const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const Liked = require('../models/Liked');

const fs = require('fs'); // package fs ( FileSysteme)  systeme de fichier

exports.addPost = (req, res, next) => {
  console.log('limage est ', req.file)
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    user_id: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
  } : { 
    ...JSON.parse(req.body.post),
    user_id: req.auth.userId
  }
  if(postObject.title == ''){
    return res.status(400).json({ error : 'Titre obligatoire !'})
  }
  if(postObject.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  Post.create(postObject)
    .then(() => {
      //NOUS RENVOIS LE DERNIER ID DE POST CREE DE L'UTILISATEUR ( CELUI TOUT JUSTE CREE)
      Post.findOne({    
        attributes: [[sequelize.fn('max', sequelize.col('id')), 'new_post_id']],
        where : {user_id: req.auth.userId}
      })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(404).json({ error : 'Post non trouvée !'}))
    })
  .catch(error => res.status(400).json({ error }))
}

exports.getOnePost = (req, res, next) => { // ATTENTION ENVOI LES MDP
  Post.findOne({where: {id: req.params.id}, include:[{model: Liked, as:"Liked"},{model: User, as:"User",attributes: ['username', 'avatar']},{model : Comment, as: 'Comment', include:[{model: User, as: 'User',attributes: ['username', 'avatar'] } ]}], order:[[{model:Comment, as: "Comment"}, "createdAt", "DESC"]] }) // FAIRE TRES ATTENTION A LA NOTATION PREMIER USER POUR USER_ID DU POST DEUXIEME POOUR LES COMMENTAIRES
  // SOURCE DU ORDER POUR LES INCLUDE https://stackoverflow.com/questions/29995116/ordering-results-of-eager-loaded-nested-models-in-node-sequelize#:~:text=If%20you%20also-,use,-%27as%27%20and%20let%27s
  .then(post => res.status(200).json(post))
  .catch(error => {
    console.log(error)
    return res.status(400).json({ error })})
}

exports.getAllPost = (req, res, next) => {
  Post.findAll({ include:[
                   {model: User, as:"User", attributes: ['username', 'avatar']}, // SOURCE ATTRIBUTES https://stackoverflow.com/questions/21883484/how-to-use-an-include-with-attributes-with-sequelize#:~:text=do%20something%20like-,that,-for%20exclude%20or
                   {model: Liked, as:"Liked"}],
                 order:[['createdAt', 'DESC']]})  // SOURCE: https://stackoverflow.com/questions/20718534/sort-sequelize-js-query-by-date
  .then((posts) => res.status(200).json(posts))
  .catch(error => res.status(400).json({ error }))
}

exports.updateOne = (req, res, next ) => {
  if(req.body.title == ''){
    return res.status(400).json({ error : 'Titre obligatoire !'})
  }
  if(req.body.content == ''){
    return res.status(400).json({ error : 'Contenu obligatoire !'})
  }
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      if(!post){
       return res.status(404).json({ error: 'Post non trouvé !'})
      }
      if(post.user_id !== req.auth.userId && req.auth.power !== 'admin'){
       return res.status(403).json({ error: 'Requete non autorisé !'})
      }else{
        console.log('tata',req.body.post)
      const postObject = req.file? 
        {
          ...JSON.parse(req.body.post),  // attention ici l'info n'arrive pas de la meme façon que la P6
          imageUrl: `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
        } 
        : { ...JSON.parse(req.body.post) };
      if(req.file && post.imageUrl){
        console.log('dans le delete img')
        const filename = post.imageUrl.split('/pictures')[1]; // recup du nom du fichier pour le supprimé
        fs.unlink(`pictures/${filename}`, () => {
          console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent 
        })
      }
      Post.update({...postObject},{where: {id : req.params.id}}) // ATTENTION ICI ORDRE DIFFERENT DE MONGODB
        .then(() => res.status(200).json({ message: 'Post modifié!'}))
        .catch(error => res.status(400).json({ error }));
    }
    })
    .catch(error => res.status(500).json({ error }));
}

exports.deleteOnePost = (req, res, next) => {
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      if(!post){
       return res.status(404).json({ error: 'Post non trouvée !'})
      }
      if(post.user_id !== req.auth.userId && req.auth.power !== 'admin'){
       return res.status(403).json({ error: 'Requête non authorisée !'})
      }
      if(post.imageUrl != null){
        const filename = post.imageUrl.split('/pictures')[1]; // recup du nom du fichier pour le supprimé
        fs.unlink(`pictures/${filename}`, () => {
        console.log('File is deleted ')  // voir pour remove plus tard une fois essay concluent
        })
      }
      Post.destroy({where: {id : req.params.id}})
      .then(()=> res.status(200).json({ message : 'Post supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
}

exports.getAllUserPost = (req, res, next) => {
  Post.findAll({ where:{user_id: req.auth.userId},
                  include: [{model: Liked, as:"Liked"}],
                  order:[['createdAt', 'DESC']]})  
.then((posts) => res.status(200).json(posts))
.catch(error => res.status(400).json({ error }))
}

exports.getAllUserSearchPost = (req, res, next) => {
  Post.findAll({where : {user_id : req.params.id},
                include: [
                  {model: User, as:"User", attributes: ['username', 'avatar']}
                ]})
    .then((posts) => {
      console.log(posts)
      res.status(200).json(posts)})
    .catch(error => res.status(400).json({ error }))
}
