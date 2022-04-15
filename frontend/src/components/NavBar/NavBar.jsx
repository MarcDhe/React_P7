import './style.scss';
import logo from '../../assets/white_logo.webp';
import mobileLogo from '../../assets/mobile_logo.webp';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react'


function NavBar() {

  // const history = useHistory();
  // const log = () => {
  //   console.log('tata')
  //   history.push('/login')
  // }
  
  return (
    <div>
      <header>
        <div className='flex-row'>
          <h1>
            <img className="logo mobile-off" src={ logo } alt="logo groupomania" />
            <img className="logo mobile-on" src={ mobileLogo } alt="logo groupomania" />
          </h1>
          <form className='search'>
            <input id="search__bar" type="search" placeholder="Search Groupomania"  title="Recherche" required/>
            <FontAwesomeIcon className='search-icone' icon={ faMagnifyingGlass } />
          </form>
        </div>
        <button id="logout"  aria-label='login/logout'>
         <FontAwesomeIcon icon={ faPowerOff } />
        </button>
      </header>
    </div>
  );
}

export default NavBar;
