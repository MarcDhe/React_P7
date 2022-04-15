import './style.scss';
import { Link } from 'react-router-dom'


function Post(post,{children}){ // VOIR SI CHILDREN FONCTIONNE BIEN COMME <SLOT/>
  return(
    <article className='post'>
      <Link className='unlink' to='/post/:id' > {/* BONNE ECRITURE ? PAS COMME VUE AVEC NAME ET PARAMs */}
        <div className='post__info'>
          <div className='owner'>
            <figure>
              <img className='owner__avatar' src={post.User.avatar} alt='avatar'/>
            </figure>
            <div className='owner__details'>
              <div className='owner__username'>{ post.User.username }</div>
              <div className='owner__release'>posted (importer setDate) ago</div>
            </div>
          </div>
        </div>
        <div className='post__Content'>
          <h2>{ post.title }</h2>
          {post.iamgeUrl ? 
            <figure>
              <img src={post.imageUrl} alt="post details" />
            </figure>
            : null
          }
          <p>{ post.content }</p>
        </div>
        <div>{children}</div>
      </Link>
    </article>
  );
}

export default Post;