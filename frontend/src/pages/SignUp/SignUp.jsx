import { TextField } from '@mui/material';
import { useState } from 'react';
import './style.scss';
import {loginTry, trySignup} from '../../services/callApi' ;
import { setLocalStorage } from '../../services/localStorage';
import { useNavigate } from "react-router-dom";




//***********//
// FUNCTIONS //
//***********//


//***********//
// COMPOSANT //
//***********//

function SignUp() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();


  async function sign(e){
    e.preventDefault();
    const username = document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;
    const firstname = document.getElementById('firstname').value;
    const passwd = document.getElementById('password').value;
    const body = { username, lastname, firstname, passwd };
    const res = await trySignup(body);
    if(res.error){
      return setError(res.error);
    }
    const user = await loginTry(username, passwd);
    setLocalStorage(user);
    navigate('/');
  }
  
  return (
    <main id='signup'>
      <div className='login'>
        <h1>SignUp</h1>
        <form onSubmit={sign} >
        <TextField id="username" label="Username" variant="outlined" required className='margin-bottom'/>
        <TextField id="lastname" label="lastname" variant="outlined" required className='margin-bottom'/>
        <TextField id="firstname" label="firstname" variant="outlined" required className='margin-bottom'/>
        <TextField id="password" label="password" variant="outlined" type='password' required className='margin-bottom'/>
        {error !== null ? <span className="red-text">{ error }</span> : null}
        <button>Singup Now</button>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
