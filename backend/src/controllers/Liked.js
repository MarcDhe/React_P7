const Liked = require('../models/Liked');
const Post = require('../models/Post')

exports.manageLike = (req, res, next) => {
  if(req.body.like !== 0 && req.body.like !== 1 ){
    console.log('tata')
   return res.status(400).json({ error });
  }
  Post.findOne({where: {id: req.params.id}})
    .then((post) => {
      if(!post){
        return res.status(404).json({ error: 'Post non trouvé !'})
      }
      if(req.body.like == 1){// AVEC VERIFICATION SI USER A DEJA MIS UN LIKE
        Liked.findOne({where: {post_id: req.params.id, user_id: req.auth.userId}})
          .then((like) => { 
            if(like){
              return res.status(400).json({ error: 'Avis déja Présent !'})
            }
            const newLike = {
              post_id : req.params.id,
              user_id : req.auth.userId
            };
            Liked.create(newLike)
              .then(() => res.status(200).json({ message: 'Like ajoutée !'}))
              .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
        }
      if(req.body.like == 0){
        Liked.destroy({where: {post_id: req.params.id, user_id: req.auth.userId}})
        .then(() => res.status(200).json({ message: 'Like retiré !'}))
        .catch( error => res.status(401).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
}

exports.getAllLikedPost = (req, res, next) => {
  Liked.findAll({ where: {user_id: req.auth.userId}, 
                  include: [{model: Post, as:'Post',
                      include: [{model: Liked, as:"Liked" }]}
                  ] })
    .then((likeds) => res.status(200).json(likeds))
    .catch(error => res.status(400).json({ error }))
}