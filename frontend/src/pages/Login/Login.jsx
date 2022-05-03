import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userFetching } from '../../features/user'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './style.scss';

//***********//
// FUNCTIONS //
//***********//

//OBLIGER DE LE METTRE DANS LA FONCTION COMPOSANT POUR UTILIS2 LE STATE ?  
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
//SET USER ON LOCAL STORAGE
function setLocalStorage(user){
  const now = new Date(); // RAPPEL getTime NB DE MS DEPUIS 1970
  user.expiry = now.getTime() + (1000 * 60 * 60 * 24); // 1J // AJOUT NOUVEAU CHAMP A USER + SOURCE https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
  localStorage.setItem('user', JSON.stringify(user));
}

//***********//
// COMPOSANT //
//***********//

function Login() {
  const [error, setError] = useState(false); // voir comment utilisé setDate en dehors de la fonction composant
  const dispatch = useDispatch()
  const navigate = useNavigate();

  async function log(e){ 
    e.preventDefault()
    const username = document.getElementById('username')?.value; 
    const passwd = document.getElementById('password')?.value;
    const user = await  loginTry(username, passwd);
    if(user === "error"){
      return setError(true);
    }
    console.log(user);
    dispatch(userFetching(user));
    setLocalStorage(user);
    navigate('/');
  };

  return(
    <main id="login">
    <div className='login'>
      <h1>Connect to your account</h1>
      <form>
        <TextField  id="username" label="Username" variant="outlined" required className='margin-bottom'/>
        <TextField  id="password" label="password" variant="outlined" type='password' required className='margin-bottom'/>
        <button onClick={log}>Login</button> 
        {error === true ? <span className='red-text'>Username/Password incorrect</span> : null}
      </form>
      <Link className="signup-link" to="/signUp" > 
        <p>Still not member ? <strong>signUp</strong></p>
      </Link>
    </div>
  </main>
  );
}

export default Login;
