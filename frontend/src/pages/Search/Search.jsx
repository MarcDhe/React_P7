import './style.scss';
import {useState} from "react";
import StandardSearch from '../../components/StandardSearch/StandardSearch'

function Search(){
  let [status, setStatus] = useState(null)
  return(
    <main id='search'>
      <h1 class='border-bottom'> Search </h1>
      <StandardSearch/>
    </main>
  )
}

export default Search;