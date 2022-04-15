import './style.scss';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectAllPost, selectUser } from '../../utils/selectors'
import { getAllPost } from '../../services/callApi'
import { useEffect } from 'react';
import store from '../../utils/store';
import Post from '../../components/Post/Post'


function Home() {
useEffect( ()=> {getAllPost(store)},[])
const user = useSelector(selectUser);
const allPost = useSelector(selectAllPost);
console.log(allPost.data)
console.log('store init ',store)

  return ( 
    <main id='home'>
      <h1>Home</h1>
      <div className="move-to-post">
      <div className="user">
        <figure>
          <img className="user__avatar" src={user.avatar} alt="user avatar"/>
        </figure>
        <p>{user.username}</p>
      </div>
      <Link to="/createPost" className='unlink'>
        <p className="input-post">Écrivez votre post.</p>
      </Link>
       {/* {allPost.data.map((post) => (
        <p>{post}</p>
      ))} */}
    {allPost.data !== null ?  
      allPost.data.map((post)=>( // ATTENTION ICI CAR TOUJOURS PAS LOAD 
        <Post post={post}/>
      ))
     : null 
    }
    </div>  
    </main >
  );
}

export default Home;
