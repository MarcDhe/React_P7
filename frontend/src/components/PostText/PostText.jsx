import { useState } from 'react';
import './style.scss';


function PostText(props){
  let {title, imageUrl, content} = props;
  let [url, setUrl] = useState((imageUrl));

  function previewFile(e) { // interessant de voir e.target qui est lendroit ou ce declenche levent
    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
  };

 return(
  <div className='create-post'>
  <input id='create-post__title' value={title} placeholder='Titre' maxLength="125" required aria-label='title' />
    {!url ? null :
      <figure>
        <img src={url} alt='new postPicture'/>
      </figure>
    }
    <textarea  id='create-post__content' value={content} placeholder='Texte' maxlength="300" required aria-label='content'></textarea>
    <label for='create-post__file'>Ajouter une image ou une vidéo :</label>
    <input id='create-post__file' type="file" onChange={previewFile} /> 
  </div>
 )
}

export default PostText;