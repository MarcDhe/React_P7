import './style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { setDate } from '../../services/Date';
import { myPosts, myLikes } from '../../services/callApi'

//***********//
// FONCTION  //
//***********//

function removeBorderBottom(){
  const blocPost = document.getElementsByClassName('select-post')[0];
  const blocLiked  = document.getElementsByClassName('select-liked')[0];
  blocPost.classList.remove('border-bottom');
  blocLiked.classList.remove('border-bottom');
};

//***********//
// COMPOSANT //
//***********//

function Activity (){
  let [select, setSelect] = useState('post');
  let [allPosts, setAllPosts] = useState([])
  let [allLiked, setAllLiked] = useState([]);

  useEffect(()=>{
    const fetchMyPosts = async () => {
      const data = await myPosts();
      setAllPosts(data) 
    }
    const fetchMyLikes = async () => {
      const data = await myLikes();
      setAllLiked(data);
    }
    fetchMyPosts();
    fetchMyLikes();
  },[]); // LIMIT EN DEPENDANCE PERMET LE RAFRAICHISSEMENT AUTO A SON CHAGNEMENT 

  // useEffect(()=> {  // NE JAMAIS FAIRE CA USEEFFECT PAS ASYNC
  //   let data = await myPosts
  // },[])

  //AFFICHAGE CONTENU MY POST
  function selectPost(){
    removeBorderBottom();
    const blocPost = document.getElementsByClassName('select-post')[0];
    blocPost.classList.add('border-bottom');  
    setSelect('post');
  };
  //AFFICHAGE CONTENU MYLIKES
  function selectLiked(){
    removeBorderBottom();
    const blocLiked = document.getElementsByClassName('select-liked')[0];
    blocLiked.classList.add('border-bottom');  
    setSelect('liked')
  }
  
  return(
    <section id="activity">
      <div class="menu">
        <p onClick={selectPost} className='select-post border border-bottom'>My posts</p>
        <p onClick={selectLiked} className='select-liked border'>My Likes</p>
      </div>
      {/* MY POSTS */}
        { select !== 'post' ? 
            null :
            allPosts?.length === 0 ?  // PAS BESOIN DE RAJOUTER DES PARENTHESE ICI ON PEU DIRECTEEMENT MARQUE NOTRE CONDITION ATTENTION PROPRET2 DE LECTURE
              <div className="default-message">
                <p>You still not post !</p>
              </div>
              :
              allPosts.map((post) => 
                // on n'importe pas le composant  post car nous ne voulons pas du cadres de l'utilisateur
                <article className='post'>
                <Link to={`/post/${post.id}`} className='unlink'> 
                  <div className="post__info">
                    <div className="align-start">
                      <h2 className="post__title">{post.title}:</h2>
                      <p className="post__release">- {setDate(post.createdAt)} -</p>
                    </div>
                      <p><FontAwesomeIcon icon={ faHandHoldingHeart } className='red-color' /> {post.Liked?.length}</p>
                  </div>
                  <div className="post__body">
                    {post.imageUrl === null  ?  null :
                      <figure>
                      <img className='post__picture' src={post.imageUrl} alt="post details" />
                      </figure>
                    }
                    <p className="post__content">{post.content}</p>
                  </div>
                </Link>
              </article>
              )
      }
      {/* POSTS LIKED */}
      { select !== 'liked' ? 
          null : 
          allLiked?.length === 0 ?
            <div className="default-message">
              <p>You still not like !</p>
            </div>
            :
            allLiked.map((liked) => 
              <article className='post'>
              <Link to={`/post/${liked.Post.id}`} className='unlink'>
              <div className="post__info">
                    <div className="align-start">
                      <h2 className="post__title">{liked.Post.title}:</h2>
                      <p className="post__release">- {setDate(liked.Post.createdAt)} -</p>
                    </div>
                      <p><FontAwesomeIcon className='red-color' icon={ faHandHoldingHeart } /> {liked.Post.Liked.length}</p>
                  </div>
                  <div className="post__body">
                    {liked.Post.imageUrl === null  ?  null :
                      <figure>
                      <img className='post__picture' src={liked.Post.imageUrl} alt="post details" />
                      </figure>
                    }
                    <p className="post__content">{liked.Post.content}</p>
                  </div>
              </Link>
            </article>
            )
      }
    </section>
  )
}
export default Activity;
