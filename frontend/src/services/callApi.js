import axios from "axios";
import store from "../utils/store";
import { selectAllPost } from "../utils/selectors";
import { allPostFetching, allPostResolved, allPostRejected} from '../features/post'




// AUTHORIZATION // 

export function authHeader(){
  const user = store.getState().user;
  console.log(user.token);
  return {Authorization: 'Bearer ' + user.token};
}

//*************//
// USER ROUTE // 
//*************//

// LOG THE USER
export async function loginTry(username, passwd){
  const body={username, passwd}
  try{
    const response = await  axios.post('http://localhost:3000/api/auth/login', body);
    const userData = response.data ; 
    console.log(userData);
    return userData;
  } catch (err) {
    console.log(err);
    return "error"
  }
};
//SIGNUP A NEW USER
export async function trySignup(body){
  try{
  const response = await axios.post('http://localhost:3000/api/auth/signup', body);
  //JE VEUX LA REPONSE DU SEERVEUR EN CLAIRE !
  console.log('ratata',response.data); // ici est la réponse du serveur res.mesasge
  return response.data;
  } catch(err){
    console.log("ici",err);
    return err.response.data;
  }
};

//DELETE USER
export async function deleteUser(){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.delete('http://localhost:3000/api/auth/user/delete', config);
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return err.response.data;
  }
} 

//UPDATE AVATAR 
export async function updateAvatar(file){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const formData = new FormData();
  formData.append('image', file);
  try{
    const response = await axios.post('http://localhost:3000/api/auth/user/avatar', formData, config);
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return err.response.data;
  }
};

//CHANGE PASSWORD 
 export async function changePassword(currentPassword, passwd, newPasswordCheck){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body= {currentPassword, passwd, newPasswordCheck};
  try{
    const response = await axios.post('http://localhost:3000/api/auth/user/password', body, config);
    console.log(response.data)
    return response.data
  }catch(err){
    console.log(err)
    return err
  }
 }

 //SEARCH USER BY USERNAME
export async function searchUsername(value){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = {username: value}
  try{
    const response = await axios.post('http://localhost:3000/api/auth/message',body, config);
    console.log('ici',response.data);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
 }

  //SEARCH USER BY ID
export async function searchUserId(value){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = {user_id: value}
  try{
    const response = await axios.post('http://localhost:3000/api/search/user',body, config);
    console.log('ici',response.data);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
 }
//*************//
// POST ROUTE // 
//*************//

//RECUPERATION DE TOUT LES POSTS
export async  function getAllPost(store){ // important de faire passer le store ici !
    const auth = authHeader();
    const config = {
      headers : auth ,
    };
    const status = selectAllPost(store.getState()).status
    console.log("status" ,status)
    if(status=== "pending" || status === "updating"){
      return;
    }
    store.dispatch(allPostFetching());
    console.log(selectAllPost(store.getState()).status)
    try{
        const response = await axios.get('http://localhost:3000/api/post', config)
        console.log('restour: ',response.data)
        store.dispatch(allPostResolved(response.data));
        console.log(selectAllPost(store.getState()).status)
    }catch(err){
      console.log(err);
      store.dispatch(allPostRejected(err));
      return err.response.data;
    }
};


// RECUPERATION D'UN SEUL POST
export async function getOnePost(post_id){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get(`http://localhost:3000/api/post/${post_id}`, config);
    console.log('++++')
    return response.data;
  }catch(err){
    console.log(err);
    return err.response.data;
  }
}


// RECUPERATION DE TOUT LES POSTS DE L'UTILISATEUR
export async function myPosts(){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get('http://localhost:3000/api/post/user/post', config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

// RECUPERATION DE TOUT LES POSTS LIKE PAR L'UTILISATEUR
export async function myLikes(){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get('http://localhost:3000/api/like', config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

//CREATION D'UN NOUVEAU POST 
export async function  newPost(body){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.post('http://localhost:3000/api/post',body, config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

export async function updatePost(body, post_id){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.post(`http://localhost:3000/api/post/${this.post_id}`,body, config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

export async function deletePost(post_id){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.delete(`http://localhost:3000/api/post/${post_id}`, config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}
  //*************//
// COMMENT ROUTE  // 
 //*************//

 //ENVOIE NOUVEAU COMMENTAIRE
export async function newComment(post_id, content){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = {content}
  try{
    const response = await axios.post(`http://localhost:3000/api/comment/${post_id}/add`, body, config)
    return response.data
  }catch(err){
    console.log(err);
    return err.response.data;
  }
}

export async function deleteComment(comment_id){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.delete(`http://localhost:3000/api/comment/${comment_id}`, config)
    return response.data
  }catch(err){
    console.log(err);
    return err.response.data;
  }
}
  //*************//
// MESSAGE ROUTE  // 
 //*************//

 //RECUPERATION DES DERNIERS MESSAGES ENVOYER/RECU
export async function getLastMessages(){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get('http://localhost:3000/api/message/last/messages', config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

// ENVOI D4UN NOVUEAU MESSAGE
export async function sendMessageToApi(user_id, content){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = { to_id:user_id, content };
  try{
    const response = await axios.post('http://localhost:3000/api/message/new', body, config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

//RECUPERATION DE TOUT LES DERNIERS MESSAGES TRIE  PAR UTILISATEUR
export async function getAllMessages(){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get('http://localhost:3000/api/message', config);
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

// RECUPERATION D'UNE CONVERSATION ET MARQUE LU 
export async function getConversation(user_id, limit){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = { limit };
  try{
    const response = await axios.post(`http://localhost:3000/api/message/${user_id}`,body, config);
    console.log(response.data)
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

//*************//
// LIKE ROUTE // 
//*************//
 
// AJOUT LIKE
export async function addLikeToApi(post_id){
  const like = 1;
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = { like };
  try{
    const response = await axios.post(`http://localhost:3000/api/like/${post_id}`,body, config);
    console.log(response.data)
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}
// RETIRE UN LIKE
export async function unLikeToApi(post_id){
  const like = 0;
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  const body = { like };
  try{
    const response = await axios.post(`http://localhost:3000/api/like/${post_id}`,body, config);
    console.log(response.data)
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

//**************//
// SEARCH ROUTE // 
//**************//

export async function globalSearch(termSearch){
  const body = {term: termSearch}
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.post('http://localhost:3000/api/search',body, config);
    console.log(response.data)
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}

export async function foundAllUserPosts(user_id){
  const auth = authHeader();
  const config = {
    headers : auth ,
  };
  try{
    const response = await axios.get(`http://localhost:3000/api/post/search/${user_id}`, config);
    console.log(response.data)
    return response.data;
  }catch(err){
    console.log(err)
    return err.response.data;
  }
}