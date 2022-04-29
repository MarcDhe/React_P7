import './style.scss';
import {useState} from "react";
import StandardSearch from '../../components/StandardSearch/StandardSearch'
import UserSearch from '../../components/UserSearch/UserSearch';

function Search(){ // UTILISATION PROPS + CHANGEMENT DEPUIS ENFANT 
  let [status, setStatus] = useState("all")
  let [userId, setUserId] = useState();
  return(
    <main id='search'>
      <h1 className='border-bottom'> Search </h1>
      {status !== 'all' ? null : 
        <StandardSearch setStatus={setStatus} setUserId={setUserId}/>
      }
      {status !== 'userPost' ? null :
        <div>
          <UserSearch userId={userId}/> 
        </div>
      }
    </main>
  )
}

export default Search;