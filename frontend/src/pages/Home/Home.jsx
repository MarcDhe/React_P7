import './style.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAllPost, selectUser } from '../../utils/selectors'
import { getAllPost, addLikeToApi, unLikeToApi } from '../../services/callApi'
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
  let [resMessage, setResMessage] = useState();
  const user = useSelector(selectUser);
  const allPost = useSelector(selectAllPost);
  console.log(allPost.data);
  console.log('store init ',store);

  
  useEffect(()=> {
    async function setData(callback){
      await getAllPost(store);
      console.log('ok')
      console.log('==== ',allPost);
      callback();
    }
    setData(addPostLike);

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

  function showCommentSection(post_id){
    return setWriteComment(post_id);
  }
  function cancelCommentary(){
    return setWriteComment(null);
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


async function sendComment(post_id,e){
  e.preventDefault();
  const commentContent = document.getElementById("comment__content").value;
  const response = await newComment(post_id, commentContent);
  console.log(response)
  setResMessage(response);
  setWriteComment(null);
  setCommentStatus(post_id)
  // on veut que la response soit set sur CommentStatus en attente mentorat
}

  function printUserLiked(){
    console.log(userLiked)
  }

  return ( 
    <main id='home'>
      <button onClick={printUserLiked}>affichez useRLiked</button>
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
        {/* NE MARCHE PAS A CAUSE DU TABLEAU undefined */}
          {/* { testLike(userLiked, post.id) ? 
            <p onClick={ unLike } className='unlike'>
              <FontAwesomeIcon icon={ faHandHoldingHeart } />
            </p>
             : 
             <p onClick={ Like } className='like'>
             <FontAwesomeIcon icon={ faHandHoldingHeart } />
             </p>
          } */}
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
          <p onClick={()=> showCommentSection(post.id) }>
            <FontAwesomeIcon icon={ faCommentDots } /> 
            &nbsp;Commenter 

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
