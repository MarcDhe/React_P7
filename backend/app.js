
// SECURITE //
const helmet = require("helmet"); 
const rateLimit = require('express-rate-limit'); 
const morgan = require("morgan");

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');


// CONNECT TO DATABASE
require('./src/database/connection');
// AJOUT DES RELATIONS A LA BASE DE DONNEE
require('./src/database/Relationship');

//LIMIT A MODIFIER AVANT RENDU FINAL
const limiter = rateLimit({  // SECURITE
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limite each IP to 1000 requests per windowMs 
  message : "Trop de requete envoyer"
});

// INTERCEPTE TOUT LES TYPES DE REQUETES
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // SECURITE 

// CORS 'autorisation' 'd'acces/de connexion'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json()); // va de paire avec le bodyParser d'en haut

// SECURITE //
app.use(morgan('common'));
app.use(limiter);


//ROUTE USER
const userRoutes = require('./src/routes/User');
app.use('/api/auth', userRoutes);
//ROUTE POST
const postRoutes = require('./src/routes/Post');
app.use('/api/post', postRoutes);
// ROUTES COMMENT
const commentRoutes = require('./src/routes/Comment');
app.use('/api/comment', commentRoutes);
// ROUTES LIKE
const likeRoutes = require('./src/routes/Liked');
app.use('/api/like', likeRoutes);
// ROUTES MESSAGE
const messageRoutes = require('./src/routes/Message');
app.use('/api/message', messageRoutes);
// ROUTES SEARCH
const searchRoutes = require('./src/routes/Search');
app.use('/api/search', searchRoutes);

app.use('/pictures/', express.static(path.join(__dirname, 'pictures'))); //reponds au requete envoyer a /images et sert un serveur static express.static() et path.join() pour connaitre le chemin avec en (__direname, 'images)


module.exports = app;