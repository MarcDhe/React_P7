import { useEffect } from 'react';
import './style.scss';
import { foundAllUserPosts } from '../../services/callApi';
import { useState } from 'react';
import Post, {} from '../Post/Post';

function UserSearch(props){

  const user_id = props.userId;
  let [allPostsFound, setAllPostsFound] = useState([]);
  useEffect(()=>{
    async function oneUserPosts(){
      const response = await foundAllUserPosts(user_id);
      setAllPostsFound(response);
      console.log(response)
    }
    oneUserPosts();
  },[user_id])

  return (
    <div>
      {allPostsFound.length === 0 ?
        <p>This user didn't make post</p>
        :
        (allPostsFound.map((post)=>
          <Post post={post}/>
        ))
      }
    </div>
  )
}

export default UserSearch;