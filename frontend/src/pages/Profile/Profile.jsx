import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import store from '../../utils/store';
import { useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from '../../utils/selectors';
import { setDate} from '../../services/Date';

//***********//
// FONCTION //
//***********//

//SUPPRESION ATTRIBUT BORDER BOTTOM
function removeBorderBottom(){
  const blocActivity = document.getElementsByClassName('activity')[0];
  const blocMessage = document.getElementsByClassName('message')[0];
  const blocEdit = document.getElementsByClassName('edit')[0];
  blocActivity.classList.remove('border-bottom');
  blocMessage.classList.remove('border-bottom');
  blocEdit.classList.remove('border-bottom');
}

//***********//
// COMPOSANT //
//***********//

function Profile(){
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  //RENVOI VERS COMPOSANT ACTIVITY
  function switchToActivity(){
    removeBorderBottom()
    const blocActivity = document.getElementsByClassName('activity')[0];
    blocActivity.classList.add('border-bottom');
    navigate('/profile/activity');
  }
  // RENVOI VERS COMPOSANT MESSAGE PROFILE
  function switchToMessage(){
    removeBorderBottom()
    const blocActivity = document.getElementsByClassName('message')[0];
    blocActivity.classList.add('border-bottom');
    navigate('/profile/message');
  }
  //RENVOI VERS COMPOSANT EDITPROFILE
  function switchToEdit(){
    removeBorderBottom()
    const blocActivity = document.getElementsByClassName('edit')[0];
    blocActivity.classList.add('border-bottom');
    navigate('/profile/edit');
  }

  return (
    <main id='profile'>
      <div className="banner"></div>
        <div className="user">
          <figure>
            <img className="user__avatar" src={user.avatar} alt='avatar'/>
          </figure>
          <div className="user__details">
            <h1 className="username">{user.username}</h1> 
            <p className="create-at">Member since: {setDate(user.createdAt)}</p>
          </div>
        </div>
        <div className="container">
          <div className='row-icon'>
            <div onClick={switchToActivity} className='activity border-bottom'>
              <FontAwesomeIcon icon={faNewspaper} />
              <p>Activity</p>
            </div>
            <div onClick={switchToMessage} className='message'>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>Message</p>
            </div>
            <div onClick={switchToEdit} className='edit'>
              <FontAwesomeIcon icon={faAddressCard} />
              <p>Edit </p>
            </div>
          </div>
          <Outlet/> {/*IMPORTANT PERMET D'AFFICHER LE SOUS CONTENU ! https://www.robinwieruch.de/react-router-nested-routes/ */}
        </div>
    </main>

  )
}

export default Profile