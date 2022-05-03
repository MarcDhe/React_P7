import './style.scss';
import { useState, useEffect, setState } from 'react';
import { getOnePost } from '../../services/callApi';
import { useNavigate, useParams } from 'react-router-dom';
import { setDate } from '../../services/Date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../utils/selectors';
import { newComment, updatePost, deletePost, addLikeToApi, unLikeToApi, deleteComment, updateComment } from '../../services/callApi';
import  PostText  from '../../components/PostText/PostText'
import produce from 'immer';


function PostDetails(){

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const params = useParams();

  let [onePost, setOnePost]= useState([]);
  let [alertMessage, setAlertMessage] = useState("");
  let [method, setMethod] = useState("read");
  let [commentMethod, setCommentMethod] = useState( {status:"read", comment_id: null, index: null} );
  let [alertComment, setAlertComment] = useState("");
  let [likeStatus, setLikeStatus] = useState(false)

  useEffect(()=>{
    async function mountOnePost(post_id){
      const response = await getOnePost(post_id)
      setOnePost(response)
      console.log('tata',response)
      if(response=== null){ // CAS OU ID DU POST INVALID
        navigate('/error')
      }
      console.log(checkUserLike(response))
    }
    mountOnePost(params.id)
  },[params.id]);

  // TEST SI L UTILISATEUR A LIKE LE POST 
  function checkUserLike(data){
    for(let i in data.Liked){
      if(data.Liked[i].user_id === user.id){
        setLikeStatus(true);
      }
    }
    return likeStatus
  }

  // PRETIRE EL MODE UPDATE
  function cancelUpdate(){
    const copyCommentMethod = produce(commentMethod, draft => {
      draft.status = "read"
    })
    document.getElementById('new-comment__content').value = '';
    setCommentMethod(copyCommentMethod);
    setMethod('read');
  }

  //PASSAGE VERS LA PARTIE UPDATE DU POST
  function updatePostMode(){
    setMethod('update')
  };

  //DELETE DU POST
  async function manageDeletePost(){
    //http://www.fobec.com/tuto/910/afficher-popup-message-confirmation-invite-saisie.html
    const answer = window.confirm("Are you sure to want delete this post ?")
    if(answer === false){
      return 0;
    }
    console.log(params.id)
    const response = await deletePost(params.id);
    console.log(response)
    navigate('/');
  };

  //UPDATE DU POST 
  async function sendUpdatePost(e){
    e.preventDefault();
    const title = document.getElementById('create-post__title').value;
    const content = document.getElementById('create-post__content').value; 
    const post = JSON.stringify({title, content})
    //https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
    const fileInput = document.getElementById('create-post__file');  //https://www.tech-wiki.online/fr/how-to-upload-files-fetch.html
    const formData = new FormData(); // utilisation de .append() https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
    formData.append('post',post); // A FAIRE ATTENTION ICI
    formData.append('image',fileInput.files[0]);// nommé image a cause de multer
    const response = await updatePost(formData, params.id);
    console.log(response);
    navigate(`/post/${params.id}`);
  };

  // AJOUT UN LIKE AU POST
  function manageAddLike(){
    addLikeToApi(params.id);
    setLikeStatus(true);
     const likedCopy = produce( onePost, draft =>{
       draft.Liked.push({post_id: params.id, user_id: user.id})
     })
    setOnePost(likedCopy)
  };
  //ENLEVE UN LIKE AU POST
  function manageUnLike(){
    unLikeToApi(params.id);
    setLikeStatus(false);
    const result = onePost.Liked.filter( cas => cas.user_id !== user.id); // ATTENTION USTILISATION UN PEU SPECIAL https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const likedCopy = produce( onePost, draft =>{
      draft.Liked = result;
    })
   setOnePost(likedCopy)
  };
  // ENVOIE D'UN NOUVEAU COMMENTAIRE (API + STATE)
  async function sendComment(e){
    e.preventDefault()
    let content = document.getElementById('new-comment__content').value;
    if(content === ""){
        return setAlertComment("Contenu obligatoire !");
    }
    if(alertComment!== null ){
      setAlertComment("")
    }
    const commentPush = await newComment(params.id, content);
    if(commentPush.error){
      return displayAlertComment('error');
    }

    const userInfo= { avatar : user.avatar, username: user.username, id: user.id}
    console.log('User:', userInfo);
    console.log('this to push',commentPush);
    commentPush.User = userInfo;

    const copyComment  = produce( onePost, draft => {
      draft.Comment.unshift(commentPush);
    })
    setOnePost(copyComment);
    displayAlertComment('new');
  }
//UPDATE COMMENTAIRE API + STATE
  async function manageUpdateComment(e){
    e.preventDefault();
    const index= commentMethod.index;
    const comment_id = commentMethod.comment_id;
    const contentUpdate = document.getElementById('new-comment__content').value;
    if(contentUpdate === ''){
      return displayAlertComment('error');
    }
    console.log('l index est ', index);
    const response = await updateComment(comment_id, contentUpdate);
    if(response.error){
      return displayAlertComment('error');
    }
    const commentCopy = produce(onePost, draft => {
      draft.Comment[index].content = contentUpdate;
    })
    setOnePost(commentCopy);
    displayAlertComment('update');
  }

  //GESTION DE LA SUPPRESSION DU COMMENT 
  async function manageDeleteComment(comment,index){
    console.log('ratata');
    const status  = await  deleteComment(comment.id);
    if(status.error){
      return displayAlertComment('error');
    }

    const result = onePost.Comment.filter(cas => cas.id !== comment.id);
    const commentCopy = produce(onePost, draft => {
      draft.Comment = result
    });

    setOnePost(commentCopy);
    return displayAlertComment('delete')
  }

  //GESTION AFFICHAGE ALERTCOMMENT
  function displayAlertComment(status){
    const alertMessage = document.getElementsByClassName('alert__text')[0];  
    alertMessage.classList.remove('green-background', 'red-background');
    if(status === 'error'){
      alertMessage.classList.add('red-background')
     return  setAlertComment('An error as occured !');
    }
    if(status === 'update'){
      alertMessage.classList.add('green-background');
     return setAlertComment('Comment updated !');
    }
    if(status === 'new'){
      alertMessage.classList.add('green-background');
      return setAlertComment('Comment sended !');
    }
    if(status === 'delete'){
      alertMessage.classList.add('green-background');
      return setAlertComment('Comment deleted !');
    }
    return;
  }
  
  // RENVOI A LA POSSIBILITE DE MODIFICATION DU COMMENTAIRE
  // VERIFICATION DU NAVIGATE VERS ANCRE
  function goToUpdateComment(comment, index){
    const commentDetails = {status: 'update', comment_id: comment.id, index: index }
    setCommentMethod(commentDetails);
    document.getElementById('new-comment__content').value = comment.content;
    console.log('pcomment', commentMethod)
  }
  
  return(
    <main id='one-post'>
     <div className='post'>
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
        {method !== 'update' ? null :
          <form onSubmit={sendUpdatePost}>
            <PostText imageUrl={onePost.imageUrl} title={onePost.title} content={onePost.content} />
            <button type='submit'>Send</button>
            <button type="button" onClick={cancelUpdate}>Cancel</button>
          </form>
        }
        <div className='post__add'>
          {likeStatus === false ?  // CONDITION
            <p id="like-post" onClick={manageAddLike}>
              <FontAwesomeIcon icon={ faHandHoldingHeart } className='red-color' />
              &nbsp;{onePost.Liked?.length}
            </p>
            :
            <p id="unlike-post" onClick={manageUnLike}>
              <FontAwesomeIcon icon={ faHandHoldingHeart } className='red-color' />
              &nbsp;{onePost.Liked?.length}
            </p>
          }
          <p id="delete-post" onClick={manageDeletePost}>
            <FontAwesomeIcon icon={ faTrashCan } className='red-color' />
            &nbsp;Delete
          </p>
          <p id="update-post" onClick={updatePostMode}>
            <FontAwesomeIcon icon={ faPenToSquare } className='red-color' />
            &nbsp;Update
          </p>
        </div>
        {/*ANCRE */}
        <div id="comment-zone" className='ancre'></div>

        <form className="new-comment">
          <textarea id='new-comment__content'  placeholder='Ecrivez votre commentaire' maxLength="300" required></textarea>
          <div className="new-comment__option">
            {commentMethod.status !== "read" ? null :
              <button onClick={sendComment}>Send</button>  
            }
            {commentMethod.status !== "update" ? null :
              <button onClick={cancelUpdate}>Cancel</button> 
            }
            {commentMethod.status !== "update" ? null :
              <button onClick={manageUpdateComment}>Save</button>           
            }       
          </div>
          <p className="alert__text">{ alertComment }</p>
        </form>
        { onePost.Comment?.length === 0 ? 
          <p>Be first to post a comment !</p>
          :
          <div>
            <p>{onePost.Comment?.length}</p>
            <div>
             {onePost.Comment?.map((comment, index)=> // ATTENTION ICI LE ? TRES IMPORTANT 
                <div className='commentary'>
                  <p>id:{comment.id}, index: {index}</p>
                    <figure > 
                      <img className="commentary__avatar" src={comment.User.avatar} alt="avatar" />
                    </figure>
                    <div className="commentary__details">
                      <p className="commentary__details__username"> { comment.User.username }<strong className="date"> {setDate(comment.updatedAt)}</strong></p>
                      <p className="commentary__details__content">{ comment.content }</p>
                      <div className="commentary__update">
                        {comment.user_id === user.id || user.power === 'admin' ? 
                        // <p className='commentary__update__delete' >
                        <p className='commentary__update__delete' onClick={(e)=>manageDeleteComment(comment,index)}>
                          <FontAwesomeIcon icon={ faTrashCan} />
                          Delete
                        </p>
                          : null
                        }
                        {comment.user_id === user.id || user.power === 'admin' ? 
                        <p className='commentary__update__update' onClick={(e)=>goToUpdateComment(comment, index)}>
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
          </div>
        }
        {/* <p>{JSON.stringify(onePost.Comment[1].User?.avatar)}</p>  */}
        <div>
          {/* {onePost.Comment.map((comment)=> 
          <p>1</p>)} */}
        </div>
      </div>
    </main>
  )
}

export default PostDetails;