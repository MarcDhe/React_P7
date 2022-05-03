import './style.scss';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { getConversation, searchUserId, sendMessageToApi } from '../../../services/callApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../utils/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function Conversation(){
  
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  let [messages, setMessages] = useState(null);
  let [interlocutor, setInterlocutor] = useState([]);
  let [limit, setLimit] = useState(5);
  const params = useParams();

  useEffect(()=>{
    const fetchConversation = async () => {
      const data = await getConversation(params.id, limit);
      setMessages(data);
    }
    const fetchInterlocutor = async () => {
      const data = await searchUserId(params.id)
      setInterlocutor(data);
    }
    fetchConversation();
    fetchInterlocutor();
  },[limit, params]); // LIMIT EN DEPENDANCE PERMET LE RAFRAICHISSEMENT AUTO A SON CHAGNEMENT 

  //RETOUR AU MAIN MENU MESSAGE
  function backToAllMessages(){
    navigate('/messaging');
  }
  //AFFICHE PLUS DE MESSAGES
  function showMore(){
    const newLimit = limit + 5;
    setLimit(newLimit)
  }
  //GERE LENVOI D'UN NOUVEAU MESSAGE
  async function manageSendMessage(to_id, e){
    e.preventDefault();
    let content = document.getElementsByClassName('message__content')[0].value ;
    await sendMessageToApi(to_id, content)
    const data = await getConversation(params.id, limit); // APPEL A L'API FACILITE LAJOUT DE L'ID POUR LE .MAP
    setMessages(data) 
    
  };

 return(
  <section id='conversation'>
     <div className="interlocutor border-bottom">
    <figure>
      <img className='interlocutor__avatar' src={interlocutor.avatar} alt='avatar' />
    </figure>
    <h2 className='interlocutor__username'>{interlocutor.username}</h2>
  </div>
    {limit <= messages?.length ? 
      <button onClick={showMore}>Show more</button> 
      : 
      <p>user: {user.id}, longueur: {messages?.length} limit:{limit}</p>  // pour le test sinon null
    }
    
    <div className='reverse-order'>
      {/* ATTENTEND MESSAGES ET PLANTE SI PAS '?' */}
      {messages?.map((message) => // ATTENTION SI PPAS DE KEY NE MARCHE PAS
      <div key={message.id}>
        {message.from_id === user.id ? 
          <div className='text-right'>
            <p className='color-from'>{message.content}</p>
          </div>
          :
          <div className='text-left'>
            <p className='color-to'>{message.content}</p>
          </div>
        }
        </div> 
        )}
      </div>
      <form onSubmit={(e)=>manageSendMessage(params.id, e)}>
        <div id="ancre"></div>
        <textarea className="message__content" placeholder="Votre Message" maxLength="300" required={true} title="votre Message"></textarea>
        <button>
          <FontAwesomeIcon icon={ faPaperPlane } />
        </button>
      </form>
  <button className='previous' onClick={backToAllMessages}>retour</button>


  </section>
 )
}

export default Conversation;