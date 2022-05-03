import './style.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  userUpdating } from '../../features/user'
import { selectUser } from '../../utils/selectors';
import { deleteUser, updateAvatar, changePassword } from '../../services/callApi';
import { useNavigate } from 'react-router-dom';

//***********//
// FONCTION //
//***********//


//SUPPRESSION ATTRIBUT BORDER BOTTOM
function removeBorderBottom(){
  const blocAvatar = document.getElementsByClassName('select-avatar')[0];
  const blocDelete  = document.getElementsByClassName('select-delete')[0];
  const blocPassword = document.getElementsByClassName('select-password')[0];
  blocAvatar.classList.remove('border-bottom');
  blocDelete.classList.remove('border-bottom');
  blocPassword.classList.remove('border-bottom');
}

//***********//
// COMPOSANT //
//***********//

function EditProfile (){
  let user = useSelector(selectUser);
  let [select, setSelect] = useState("avatar")
  let [url, setUrl] = useState(user.avatar);
  let [alertMessage, setAlertMessage] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //AFFICHE LA PARTIE EDIT AVATAR
  function selectEditAvatar(){
    removeBorderBottom()
    const blocPassword = document.getElementsByClassName('select-avatar')[0];
    blocPassword.classList.add('border-bottom');
    setSelect("avatar");
    console.log('avatar? =>', select);

  }
  // AFFICHE LA PARTIE DELETE USER
  function selectEditDelete(){
    removeBorderBottom()
    const blocPassword = document.getElementsByClassName('select-delete')[0];
    blocPassword.classList.add('border-bottom');
    setSelect("delete");
    console.log('delete? =>', select);

  }
  //AFFICHE LA PARTIE EDIT PASSWORD
  function selectEditPassword(){
    removeBorderBottom()
    const blocPassword = document.getElementsByClassName('select-password')[0];
    blocPassword.classList.add('border-bottom');
    setSelect("password");
    console.log('password? =>', select);
  }
  //PERMET DE PREVIEW LIMAGE UPLOAD
  function previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
  }
  //SUPPRIME LE COMPTE
  function deleteAccount (){
    const answer = window.confirm("Are you sure to delete your account ? \n(All yours informations gonna be loose)")
    if(answer === false){
      return 0;
    }
    deleteUser();
    localStorage.clear(user);
    navigate('/login');
  }
  //CHANGE L'AVATAR
  async function changeAvatar(e){
    e.preventDefault();
    const fileInput = document.getElementById('new-avatar');
    const avatarRefresh = await updateAvatar(fileInput.files[0]);
    const userUpdate = {...user, avatar: avatarRefresh.avatar};
    dispatch(userUpdating(userUpdate))
    localStorage.setItem('user', JSON.stringify(userUpdate));
    // localStorage.setItem('user', JSON.stringify(user));  // PROBLEME LATENCE
  }
  // ENVOI ET MODIFICATION DU PASSWORD
  async function sendNewPassword(e){
    e.preventDefault();
    const currentPassword = document.getElementById('current-password').value ;
    const passwd = document.getElementById('new-password').value; // Format pôur le faire passé dans password validator 
    const newPasswordCheck = document.getElementById('new-password-check').value;
    const response = await changePassword(currentPassword, passwd, newPasswordCheck);
    if(response.error){
      return setAlertMessage(response.error)
    }
    return setAlertMessage(response.message)
  }
  //***********//
// RETURN HTML //
//***********//
  return(
    <section id="edit-profile">
      <div className="menu">
        <p onClick={selectEditAvatar} className='select-avatar border border-bottom'>Avatar</p>
        <p onClick={selectEditPassword} className='select-password border'>Password</p>
        <p onClick={selectEditDelete} className='select-delete'>Delete</p>
    </div>
    { select !== "avatar" ? null :
      <div className='option__avatar'>
        <figure>
          <img src={url} alt='new avatar'/>
        </figure>
        <label for='new-avatar'>Select new avatar</label>
        <input id='new-avatar' type="file" onChange={previewFile} /> 
        <button onClick={changeAvatar}>Send</button>
      </div> 
    }
    { select !== "delete" ? null :
      <div>
        <p>Delete your Account ?</p>
        <p></p>
        <button onClick={deleteAccount}> Delete </button>
      </div>
    }
    {select !== 'password' ? null :
    <div className='option__password'>
      <h2>Change password</h2>
      <form onSubmit={sendNewPassword} className='password-form'>
        <label for='current-password'>Current password :</label>
        <input id='current-password' placeholder="password" type='password' required/>
        <label for="new-password">New password :</label>
        <input id='new-password' placeholder="new password" type='password' required />
        <label for="new-password-check">Check new password :</label>
        <input id='new-password-check' placeholder="confirm password" type='password' required />
        <button>Send</button>
        <p className="red-color">{alertMessage}</p>
      </form>
    </div>
    }

    </section>

  )
};

export default EditProfile;