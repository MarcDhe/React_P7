import './style.scss';
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faFileInvoice, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { setDate } from '../../services/Date';
import { globalSearch } from '../../services/callApi';

function StandardSearch(){
  const params = useParams()
  const termSearch = params.id;
  const navigate = useNavigate;
  let [select, setSelect] = useState('post');
  let [postResult, setPostResult] = useState([]);
  let [userResult, setUserResult] = useState([])
  let [commentResult, setCommentResult] = useState([])

  useEffect(()=>{
    async function getPostsResult(){
      const response = await globalSearch(termSearch); 
      console.log("retourAPI:", response)
      setUserResult(response[0].User);
      setPostResult(response[1].Post);
      setCommentResult(response[2].Comment);
    }
    getPostsResult();
  }, [])
  function switchToPost(){

  }
  function switchToCommentary(){

  }
  function switchToUser(){

  }
  function printVar(){
    console.log("print", userResult, postResult, commentResult)
  }

  return(
  <section id='standard-search'>
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
      { select !== 'post' ? null : 
        (postResult?.length === 0 ?
        <div> 
          <p>No Result</p>
        </div>
        :
        <div>
          {postResult.map((post)=>
            <div className='post'>
              <Link className=" unlink" to={`/post/${post.id}`}> {/* si pas de '/' au début nous fait continué sur la meme route  */}
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
      
    </div>
  </section>
  )
}

export default StandardSearch