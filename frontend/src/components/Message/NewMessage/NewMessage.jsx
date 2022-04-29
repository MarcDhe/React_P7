import './style.scss';
import { useState } from 'react';
import { searchUsername } from '../../../services/callApi'
import { useNavigate } from 'react-router-dom';
import { sendMessageToApi } from '../../../services/callApi'

//***********//
// FONCTION //
//***********//


//***********//
// COMPOSANT //
//***********//

function NewMessage(props){
  let [userSearch, setUserSearch] = useState([]);
  let [userFound, setUserFound] = useState(null);
  let [alertMessage, setAlertMessage] = useState(null); 
  const navigate = useNavigate();

  async function manageSearchUsername(){
    const tryUsername = document.getElementById('username').value;
    if(tryUsername.length === 0){
      console.log('pas assez long')
      return;
    }
    const response = await searchUsername(tryUsername);
    console.log('resulrt', response)
    if(response.error){
      return setUserSearch(response);
    }
    setUserSearch(response.userArray);
    console.log(userSearch)
    return;
  }

  async function sendMessage(user_id, e){  // ATTENTION LE PREVENT DEFAULT MARCHE PAS !
    e.preventDefault();
    const content = document.getElementsByClassName('message__content')[0].value;
    const response = await sendMessageToApi(user_id, content);
    console.log(response)
  };
  

  function selectedUser(user){
    setUserFound(userFound)
    document.getElementById('username').value= user.username // latence donc on n'utilise pas de suite userFound car non déf
    document.getElementsByClassName('message__content')[0].focus(); // met le focus sur l'element
    setUserSearch([]); // ne pas oublié pour enlever l aprécédente recherche du html
  }
  function backToMessagingMenu(navigate){ // ATTENTION ICI MARCHE BIZZAREMENT
    navigate('/messaging')
  };

  return(
    <section id='create-message'>
      <h3 className='border-bottom'>New Message</h3>
      <div className='message'>
      <form onKeyUp={manageSearchUsername}> {/* ATTENTION ICI onKeyUp STYNTAXE DIFFERENTE*/}
        <input  id="username" className="message__to" placeholder="To:" required  autoComplete="off" title='Destinataire' /> {/* autocomplete="off" ATTENTION UNE MAJ EN PLUS */}
      </form>
      {userSearch.error ? 
        <p className='found__user'>No user found!</p> :  
        userSearch.map((user)=> // pour MAP soit => {} mais faire retrun ou ne just pas mettre de {}
        <p key={user.id} onClick={()=>selectedUser(user)} className='found__user'>{user.username}</p>
        )
      }
      <form onSubmit={(e)=> sendMessage(userFound.id, e)}>
        <textarea className="message__content" placeholder="Your message" maxLength="300" title="Votre Message" required ></textarea>
        <div className='message__option'>
          <button type='submit'>Send</button>
          <button type='reset' onClick={()=>backToMessagingMenu(navigate)}>Cancel</button>
        </div>
      </form>
      </div>
    </section>
  )
}

export default NewMessage;