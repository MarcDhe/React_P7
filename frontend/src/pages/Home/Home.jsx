import './style.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAllPost, selectUser } from '../../utils/selectors';
import { getAllPost, addLikeToApi, unLikeToApi } from '../../services/callApi';
import { useEffect, useState } from 'react';
import store from '../../utils/store';
import Post from '../../components/Post/Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faCommentDots }  from '@fortawesome/free-solid-svg-icons'
import { newComment } from '../../services/callApi';
import produce from 'immer';


//***********//
// FUNCTIONS //
//***********//

//***********//
// COMPOSANT //
//***********//

function Home() {
  let [userLiked, setUserLiked] = useState([]); 
  let [writeComment, setWriteComment] = useState(null);
  let [commentStatus, setCommentStatus] = useState(null);
  let [errMessage, setErrMessage] = useState(null);
  let [resMessage, setResMessage] = useState();
  const user = useSelector(selectUser);
  const allPost = useSelector(selectAllPost);
  console.log(allPost.data);
  console.log('store init ',store);

  
  // async function setData(){
  //   await getAllPost(store);
  //   console.log('test')
  // //   console.log('ok')
  // //   console.log('==== ',allPost);
  // //   addPostLike();
  // //   console.log('apres init');
  // //   console.log(userLiked)
  // console.log('/.//')
  // }
  // setData();
  useEffect(()=> {
    async function setData(){
      await getAllPost(store);
      console.log('ok')
      console.log('==== ',allPost);
      addPostLike();
      console.log('apres init');
      console.log(userLiked)
    }
    setData();

    console.log('premier lieu ',allPost);
 
  },[]) // DEPENDANCE ALLPOST IMPORTANT CAR AU D2BUT PROMISE
 
  //AJOUT LES POST LIKE AU TABLEAU USERLIKED POUR CONNAITRE LES POSTS LIKE 
  function addPostLike(){
    const posts = allPost.data 
    for(let i in posts){ // ATTENTION ICI NE MARCHE PAS CAR NOUSN N4AVONS PAS ENCORE LE RETOUR DE ALLPOST.DATA 
      for(let y in posts[i].Liked){
        console.log("longueur tableau Liked", posts[i].Liked.length)
        if(posts[i].Liked[y].user_id === user.id){
          if(posts[i].Liked?.length === 0){
            setUserLiked(posts[i].id)
          }else{
          console.log('++++',posts[i])
          setUserLiked(oldArray => [...oldArray, posts[i].id])
          console.log("tableau like", userLiked)
          }
        }
      }
    }
  }

 
  //TEST LIKE
  function testLike(post_id){
     console.log(userLiked.includes(post_id),'sur le post', post_id) // true or false
     return userLiked.includes(post_id)
  }

  //AJOUT D'UN LIKE 
  async function addLike(post){
    const response  = await addLikeToApi(post.id)
    if(response.error){
      return;
    }
    console.log("avant", userLiked)
    setUserLiked( oldArray => [...oldArray, post.id]) // https://prograide.com/pregunta/74951/methode-push-dans-react-hooks-usestate
    console.log('Apres', userLiked)
    post.Liked.length++;

  }

  // RETIRE UN LIKE 
  async function unLike(post){ // ATTENTION ICI RETIRE LE USERLIKED PROPREMENT 
    const response  = await unLikeToApi(post.id)
    if(response.error){
      return;
    }
    setUserLiked(userLiked.filter(item => item !== post.id))
    console.log('////////////',userLiked)

  }

  // MONTRE LA PARTIE COMMENTAIRE
  function showCommentSection(post_id){
    return setWriteComment(post_id);
  }
  //ANNULE LA PARTIE COMMENTAIRE
  function cancelCommentary(){
    return setWriteComment(null);
  }

  async function sendComment(post_id,e){
    e.preventDefault();
    const commentContent = document.getElementById("comment__content").value;
    const response = await newComment(post_id, commentContent);
    setCommentStatus(post_id);
    setWriteComment(null)
    if(response.error){
      return setErrMessage('An error as occrued')
    }
    console.log(response)
    return setResMessage('Comment sent!');
  }

  function printUserLiked(){
    console.log(userLiked)
  }

  return ( 
    <main id='home'>
      <button onClick={addPostLike}>initialisé le tableau </button>
      <button onClick={printUserLiked}>affichez useRLiked</button>
      <p>res:{resMessage}, err:{errMessage}, status: {commentStatus}</p>
      <h1>Home</h1>
      <div className="move-to-post">
      <div className="user">
        <figure>
          <img className="user__avatar" src={user.avatar} alt="user avatar"/>
        </figure>
        <p>{user.username}</p>
      </div>
      <Link to="/createPost" className='unlink'>
        <p className="input-post">Write your post.</p>
      </Link>
       {/* {allPost.data.map((post) => (
        <p>{post}</p>
      ))} */}
    {allPost.data !== null ?  
      allPost.data.map((post)=>( // ATTENTION ICI CAR TOUJOURS PAS LOAD 
        <div>
          <Post post={post} />
          <div className='post__action'>
            { testLike(post.id) ? 
            <p className='unlike' onClick={()=> unLike(post)}>
              <FontAwesomeIcon icon={ faHandHoldingHeart } className='red-color' />
              &nbsp;Like: ({post.Liked?.length})
            </p>
            : 
            <p className='like' onClick={() => addLike(post)}>pas de like
              <FontAwesomeIcon icon={ faHandHoldingHeart } className='red-color' />
              &nbsp;Like: ({post.Liked?.length})
            </p>
            }
          <p onClick={()=> showCommentSection(post.id)} className='commentary'>
            <FontAwesomeIcon icon={ faCommentDots } /> 
            &nbsp;Comment

          </p>
          </div>
          { commentStatus === post.id && resMessage.error ? 
            <div className='red-background'>
              <p>{resMessage}</p>
            </div>
            : null
          }
          { commentStatus === post.id && !resMessage.error ? 
            <div className='green-background'>
              <p>{resMessage}</p>
            </div>
            : null
          }
          {post.id === writeComment ? 
          <div className='comment'>
             <form onSubmit={(e)=> sendComment(post.id, e)}>
             <textarea id='comment__content' placeholder='Ecrivez votre commentaire' maxLength="300" required></textarea>
             <div className="comment__option">
               <button onClick={cancelCommentary}>Annulez</button>
               <button>Envoyez</button>
             </div>
           </form>
          </div>
          : null }
        </div>
      ))
     : null 
    }
    </div>  
    </main >
  );
}

export default Home;
