import './style.scss';
import { Link } from 'react-router-dom'
import { setDate} from '../../services/Date'

function Post(props, {children}){ // VOIR SI CHILDREN FONCTIONNE BIEN COMME <SLOT/>

  return(
    <article className='post-overview'>
      <Link className='unlink' to={`/post/${props.post.id}`} > {/* BONNE ECRITURE ? PAS COMME VUE AVEC NAME ET PARAMs */}
        <div className='post__info'>
          <div className='owner'>
            <figure>
              <img className='owner__avatar' src={props.post.User.avatar} alt='avatar'/>
            </figure>
            <div className='owner__details'>
              <div className='owner__username'>{ props.post.User.username }</div>
              <div className='owner__release'>posted {setDate(props.post.createdAt)} ago</div>
            </div>
          </div>
        </div>
        <div className='post__content'>
          <h2>{ props.post.title }</h2>
          {props.post.imageUrl === null ?  null : 
          <figure className='post__picture'>
              <img src={props.post.imageUrl} alt="post details" />
            </figure>
          }
          <p>{ props.post.content }</p>
        </div>
         <div>{props.children}</div> {/*pour l'ajout d'un contenu dont on ne sait rien */}
      </Link>
    </article>
  );
}

export default Post;