import './style.scss';
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faFileInvoice, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { setDate } from '../../services/Date';
import { globalSearch } from '../../services/callApi';

function StandardSearch(props){
  const params = useParams()
  const termSearch = params.id;
  const navigate = useNavigate();
  let [select, setSelect] = useState('post');
  let [postResult, setPostResult] = useState([]);
  let [userResult, setUserResult] = useState([])
  let [commentResult, setCommentResult] = useState([])

  useEffect(()=>{
    async function getPostsResult(termSearch){
      const response = await globalSearch(termSearch); 
      console.log("retourAPI:", response)
      setUserResult(response[0].User);
      setPostResult(response[1].Post);
      setCommentResult(response[2].Comment);
    }
    getPostsResult(params.id);
  }, [params.id])

  function switchToPost(){
    removeBorderBottom();
    setSelect("post");
    const blocActivity = document.getElementsByClassName('select__post')[0];
    blocActivity.classList.add('border-bottom');
  }
  function switchToCommentary(){
    removeBorderBottom();
    setSelect("commentary");
    const blocMessage = document.getElementsByClassName('select__commentaire')[0];
    blocMessage.classList.add('border-bottom');
  }
  function switchToUser(){
    removeBorderBottom();
    setSelect("user");
    const blocEdit = document.getElementsByClassName('select__user')[0];
    blocEdit.classList.add('border-bottom');
  }

  function removeBorderBottom(){
    const blocPost = document.getElementsByClassName('select__post')[0];
    const blocCommentaire = document.getElementsByClassName('select__commentaire')[0];
    const blocUser = document.getElementsByClassName('select__user')[0];
    blocPost.classList.remove('border-bottom');
    blocCommentaire.classList.remove('border-bottom');
    blocUser.classList.remove('border-bottom');
  }
  function printVar(){
    console.log("print", userResult, postResult, commentResult)
  }

  function searchAllUserPost(user_id){
    props.setStatus('userPost');
    props.setUserId(`${user_id}`);
  }
  function updateStatus(){
    props.setStatus('userPost');
  }

  return(
  <section id='standard-search'>
    <button onClick={updateStatus}>update props</button>
    <button onClick={printVar}>show variabel</button>
    <h3 className='border-bottom'>Term Of Search : '{termSearch}'</h3>
    <div className="container">
      <div className='select'>
        <div onClick={switchToPost} className='select__post border-bottom'>
          < FontAwesomeIcon icon={ faFileInvoice } className='red-color' /> 
          <p>Posts</p>
        </div>
        <div onClick={switchToCommentary} className='select__commentaire'>
          < FontAwesomeIcon icon={ faCommentDots } className='red-color' /> 
          <p>Comments</p>
        </div>
        <div onClick={switchToUser} className='select__user'>
        < FontAwesomeIcon icon={ faAddressCard } className='red-color' /> 
          <p>Users</p>
        </div>
      </div>  
      {/* CONDITION SELECT = POST */}
      { select !== 'post' ? null : 
        (postResult?.length === 0 ?
        <div> 
          <p>No Result</p>
        </div>
        :
        <div>
          {postResult.map((post)=>
            <div className='post'>
              <Link to={`/post/${post.id}`} className="unlink"> {/* si pas de '/' au début nous fait continué sur la meme route  */}
                <div className="info">
                  <div className="owner">
                      <figure>
                        <img className="owner__avatar" src={post.avatar} alt="avatar"/>
                      </figure>
                    <div className="owner__details">
                      <div className="owner__username"> {post.username} { post.id }</div>
                      <div className="owner__relase" >posted {setDate(post.createdAt)}</div>
                    </div>
                  </div>
                </div>
                <div className="post__details">
                  <h2>{post.title} :</h2>
                  {!post.imageUrl ?  null : 
                    <figure className='post__picture'>
                      <img src={ post.imageUrl } alt='post pic'/>
                    </figure>
                  }
                </div>
              </Link>
            </div>
          )}
        </div>
        )
      }
      {/* CONDITION SELECT = COMMENTARY */}
      {select !== 'commentary' ? null : 
        (postResult?.length === 0 ?
          <div> 
            <p>No Result</p>
          </div>
          :
          <div>
            {commentResult.map((comment)=>
            <Link className="commentary unlink" to={`/post/${comment.post_id}`}>
            <figure > 
              <img className="commentary__avatar" src={comment.avatar} alt="avatar" />
            </figure>
            <div className="commentary__details">
              <p className="commentary__details__username"> {comment.username}<strong className="date">{setDate(comment.updatedAt)}</strong></p>
              <p className="commentary__details__content">{comment.content}</p>
            </div>
          </Link>
            )}
          </div>
        )
      }
      {/* CONDITION SELECT = USER */}
      {select !== 'user' ? null : 
        (userResult?.length === 0 ?
          <div> 
            <p>No Result</p>
          </div>
          :
          <div>
            {userResult.map((user)=>
              <div onClick={()=>searchAllUserPost(user.id)} className="user">
                <figure>
                  <img className="user__avatar" src={user.avatar} alt="avatar"/>
                </figure>
                <div className="user__details">
                  <p className="user__username"> {user.username} </p>
                  <p className="user__name"> {user.firstname} {user.lastname}</p>
                </div>
              </div>
            )}
          </div>
        ) 
      }
    </div>
  </section>
  )
}

export default StandardSearch