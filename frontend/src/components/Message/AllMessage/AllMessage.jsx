import './style.scss';
import { useEffect, useState } from 'react';
import { getAllMessages } from '../../../services/callApi';
import { useNavigate } from 'react-router-dom';
import { setDate } from "../../../services/Date"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';


function AllMessage(){
  let [messages, setMessages] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => { // UTILISE ASYNC DE LA BONNE MANIERE https://devtrium.com/posts/async-functions-useeffect
    const fetchMessages = async () =>{
      const data = await getAllMessages();
      setMessages(data);
      console.log(data);
    }
    fetchMessages();
  }, [])
  // RENVOI VERS UNE CONVERSATION AVEC UN USER PARTICULIER
  function  sendToConversation(message){
    navigate(`/messaging/user/${message.user_id}`)
  }
  // RENVOI VERS LE COMPOSANT NEWMESSAGE
  function showNewMessage(){
    navigate("/messaging/newMessage");
  }
  return(
    <section id='all-message'>
      <div className='button-propriety border-bottom'>
        <button onClick={showNewMessage}>
          Write new message <FontAwesomeIcon icon={ faFeatherPointed }/>
        </button>
      </div>
      {!messages[0] ? 
      <p>No message</p> 
      : 
      <div className='colonne-description'>
        <p>Message(s)</p>
        <p>Not Read</p>
      </div>
      }
      <ul>      
      {messages.map((message)=>
        <li key={message.user_id}>
          <div onClick={()=>sendToConversation(message)} className='message'>
            <div className='display-flex'>
              <figure>
                <img className='message__avatar' src={message.avatar} alt='avatar'/>
              </figure>
              <div className='message__details'>
              <p className="message__username">{message.username}</p> 
              <p className='message__createdat'>last message {setDate(message.createdAt)} ago</p>
              </div>
            </div>
            {!message.not_read > 0  ? null :
            <p className='message__not-read'>{message.not_read}</p>
            }
          </div>
        </li>
      )}
       </ul>
      
    </section>
      
  )
}

export default AllMessage;