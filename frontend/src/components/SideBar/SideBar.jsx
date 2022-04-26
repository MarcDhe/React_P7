import './style.scss';
import { Link } from 'react-router-dom';
//UTILISATION FONT AWESOME https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react-fr
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faHouseChimneyWindow, faEnvelope, } from '@fortawesome/free-solid-svg-icons'


function SideBar() {
  return (
    <div>
      <nav id='nav__inside'>
        <Link className="nav__link mobile-off" to="/">
          <h2><FontAwesomeIcon icon={faHouseChimneyWindow} /> Home</h2>
        </Link> 
        <Link className="nav__link mobile-on" to="/">
          <FontAwesomeIcon icon={faHouseChimneyWindow} />
        </Link> 
        <Link className="nav__link mobile-off" to='/messaging'>
          <h2><FontAwesomeIcon icon={faEnvelope} /> Message</h2>
        </Link>
        <Link className="nav__link mobile-on" to='/messaging'>
          <FontAwesomeIcon icon={faEnvelope} />
        </Link>
        <Link  className="nav__link mobile-off" to="/profile/activity">
          <h2><FontAwesomeIcon icon={faUser} /> Profile</h2>
        </Link> 
        <Link  className="nav__link mobile-on" to="/profile/activity">
          <FontAwesomeIcon icon={faUser} />
        </Link> 
        <Link className='make_post mobile-off' to='/createPost'>
          <h2>Post</h2>
        </Link>      
        <Link  className='make_post mobile-on' to='/createPost'>
          <h2>Post</h2>
        </Link>
      </nav>
    </div>
  );
}

export default SideBar;
