
import './style.scss';
import { useState, useEffect } from 'react';
import { getOnePost } from '../../services/callApi';
import { useNavigate, useParams } from 'react-router-dom';
import { setDate } from '../../services/Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors'
import { newComment } from '../../services/callApi'



function updateComment(){

}






function PostDetailsxxx (){
  let user = useSelector(selectUser)
  let [onePost, setOnePost] = useState(null);
  let [method, setMethod] = useState("read");
  let [alertMessage, setAlertMessage] = useState("tata");
  let [alertComment, setAlertComment] = useState();
  let [commentMethod, setCommentMethod] = useState("read");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPost =  async (post_id) => {
      const data = await getOnePost(post_id)
      setOnePost(data);
    }
    fetchPost();
  },[params.id]);

  console.log(onePost)
  console.log('l id est:', params)

  // const result = tryPost(params.id) // ATTENTION CERTAINES FOIS OBUCLE A L'INFINI 
  // const id=  new URLSearchParams(this.props.location.search).get("id")
  // console.log('id url: ', id)
  // setOnePost(getOnePost(3))
  

  // A VERIFIER UNE FOIS PAGE NON PLANTÉ
  async function sendComment(e){
    e.preventDefault();
    let content = document.getElementById('new-comment__content').value;
    if(content === ""){
       return setAlertComment("Contenu obligatoire !");
    }
    if(this.alertComment!== null ){
      setAlertComment("")
    }
    const commentPush = await newComment(params.id, content);
    if(commentPush.error){
      return 0;
    }
    const User= { avatar : user.avatar, username: user.username, id: user.id}
    commentPush.User = User;
    setOnePost(onePost.unshift(commentPush)) // unshift "push" au début d'un tableau
  }

  function cancelUpdate(){
    setCommentMethod("read");
  }

  function deleteComment(){

  }
  // RENVOI A LA POSSIBILITE DE MODIFICATION DU COMMENTAIRE
  // VERIFICATION DU NAVIGATE VERS ANCRE
  function goToUpdateComment(){
    setCommentMethod("update");
    navigate(`/post/${params.id}/#new-comment__content`);
  }
  
  
  
  return ( // ATTENTION DEELETE LE CONTENU DU RETURN POUR AFFICH2 LA PAGE
    <main id='one-post'>
      <div className='post'>
      {!alertMessage ? null :
        <div id="alert">
          <div> </div>
          <p class="alert__text">{ alertMessage }</p>
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        </div>
      }
      {method !== "read" ? null :
      <div>
        <div className="owner"> 
            <figure>
              <img className="owner__avatar" src={onePost.User?.avatar} alt="avatar"/>
            </figure>
          <div className="owner__details">
            <p className="owner__details__username"> { onePost.User?.username }</p>
            <p className="owner__details__updatedAt"> { setDate(onePost?.updatedAt)}</p>
          </div>
        </div>
        <h1>{ onePost.title} :</h1>
        <div className="post__content">
          {!onePost.imageUrl ? null :
            <figure className="post__file">
              <img src={onePost?.imageUrl} alt="post details"/>
            </figure>
           }
          <p>{onePost.content}</p>
        </div>
      </div>
      }
      <div id="comment-zone" class='ancre'></div>
      <form className="new-comment">
        <textarea id='new-comment__content'  placeholder='Ecrivez votre commentaire' maxlength="300" required></textarea>
        <div className="new-comment__option">
          {commentMethod !== "read" ? null :
            <button onClickt={(e)=>sendComment()}>Envoyez</button>  
          }
          {commentMethod !== "update" ? null :
            <button onClick={cancelUpdate}>Annuler</button> 
          }
          {commentMethod !== "update" ? null :
            <button onClick={updateComment}>Sauvegardez</button>           
          }       
        </div>
        <p className="alert__text">{ alertComment }</p>
      </form>
        { onePost.Comment.map((comment, index)=> 
          <div className='commentary'>
            <figure > 
              <img className="commentary__avatar" src={comment.User.avatar} alt="avatar" />
            </figure>
            <div className="commentary__details">
              <p className="commentary__details__username"> { comment.User.username }<strong class="date"> {setDate(comment.updatedAt)}</strong></p>
              <p className="commentary__details__content">{ comment.content }</p>
              <div className="commentary__update">
                {comment.user_id === user.id || user.power === 'admin' ? 
                <p className='commentary__update__delete' onClick={(e)=>deleteComment(comment, index)}>
                  <FontAwesomeIcon icon={ faTrashCan} />
                  Delete
                </p>
                  : null
                }
                {comment.user_id === user.id || user.power === 'admin' ? 
                <p className='commentary__update__update' onClick={goToUpdateComment(comment, index)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Update
                 </p>
                : null
                }  
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default PostDetailsxxx;