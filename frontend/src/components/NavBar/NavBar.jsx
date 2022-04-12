import './style.scss';
import logo from '../../assets/white_logo.webp'
import mobileLogo from '../../assets/mobile_logo.webp'

function NavBar() {
  return (
    <div>
      <header>
        <div className='flex-row'>
          <h1>
            <img className="logo mobile-off" src={logo} alt="logo groupomania" />
            <img className="logo mobile-on" src={mobileLogo} alt="logo groupomania" />
          </h1>
          <form className='search'>
            <input id="search__bar" type="search" placeholder="Search Groupomania"  title="Recherche" required/>
            <i className="search-icone fa-solid fa-magnifying-glass"></i> {/* VOIR POUR import fontawesome */}
          </form>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
