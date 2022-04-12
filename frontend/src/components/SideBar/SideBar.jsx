import './style.scss';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div>
      <nav id='nav__inside'>
        <Link class="nav__link mobile-off" to="/">
          <h2><i class="fa-solid fa-house-chimney-window"></i> Accueil</h2>
        </Link> 
        <Link class="nav__link mobile-on" to="/">
          <i class="h2-style fa-solid fa-house-chimney-window"></i>
        </Link> 
        <Link class="nav__link mobile-off" to='/messaging'>
          <h2><i class="fa-solid fa-envelope"></i> Message</h2>
        </Link>
        <Link class="nav__link mobile-on" to='/messaging'>
          <i class="h2-style fa-solid fa-envelope"></i>
        </Link>
        <Link  class="nav__link mobile-off" to="/profil">
          <h2><i class="fa-solid fa-user"></i> Profil</h2>
        </Link> 
        <Link  class="nav__link mobile-on" to="/profil">
          <i class="h2-style fa-solid fa-user"></i>
        </Link> 
        <Link class='make_post mobile-off' to='/createPost'>
          <h2>Poster</h2>
        </Link>      
        <Link  class='make_post mobile-on' to='/createPost'>
          <h2>Poster</h2>
        </Link>
      </nav>
    </div>
  );
}

export default SideBar;
