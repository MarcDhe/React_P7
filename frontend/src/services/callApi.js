import axios from "axios";

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
  return console.log('ratata',response.data); // ici est la réponse du serveur res.mesasge
  } catch(err){
    console.log("ici",err);
    return err.response.data;
  }
};

export { loginTry, trySignup }