import axios from "axios";
import store from "../utils/store";
import { selectAllPost } from "../utils/selectors";
import { allPostFetching, allPostResolved, allPostRejected} from '../features/post'



// AUTHORIZATION // 

function authHeader(){
  const user = store.getState().user;
  console.log(user.token);
  return {Authorization: 'Bearer ' + user.token};
}

//*************//
// USER ROUTE // 
//*************//

// LOG THE USER
async function loginTry(username, passwd){
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
async function trySignup(body){
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


//*************//
// POST ROUTE // 
//*************//

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
        console.log(response.data)
        store.dispatch(allPostResolved(response.data));
        console.log(selectAllPost(store.getState()).status)
    }catch(err){
      console.log(err);
      store.dispatch(allPostRejected(err));
      return err.response.data;
    }
}

export { loginTry, trySignup, authHeader }