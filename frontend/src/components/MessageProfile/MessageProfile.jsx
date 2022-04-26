import './style.scss';
import { useState, useEffect } from 'react';
import { getLastMessages } from '../../services/callApi'

//***********//
// COMPOSANT //
//***********//
function MessageProfile(){
  console.log("haha")
  let [lastMessages, setLastMessages] = useState([]);

  console.log('ici',lastMessages)

  useEffect(()=>{
    const fetchLastMesssages = async () => {
      const data = await getLastMessages();
      setLastMessages(data) 
    }
    fetchLastMesssages();
  },[])
  
  //***********//
// RETURN HTML //
//***********//
  return(
    <section id="message-profile">
        <p class="section-title border-bottom"> The last messages </p>
      {lastMessages?.length === 0 ? 
        <div>
          <p>You didn't sent or received any message !</p>
        </div>
        :
        lastMessages.map((message)=>
          <div className='message'>
          <div  className="message__flex">
            <div className="message__details">
              <figure>
                <img className='message__avatar' src={ message.avatar } alt='avatar' />
              </figure>
              <p className='message__username'>{ message.username } </p>
            </div>
            {message.status !== 'sended' ? null :
            <p className ='message__status color-red'>Sended</p>
            }
            {message.status !== "received" ? null : 
            <p className ='message__status color-white'>Received</p>
            }
          </div>
          <p className="message__content">{ message.content }</p>
        </div>
        )
      }
    </section>
  )
}

export default MessageProfile;