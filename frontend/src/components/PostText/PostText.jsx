import { useEffect, useState } from 'react';
import './style.scss';


function PostText(props){
  let {title, imageUrl, content} = props;
  let [url, setUrl] = useState();

  useEffect(()=>{ // SI NON FAIT DE CETTE FACON NE PAS DE RENDU DE LA PORPS IMAGEURL DANS URL ex : let [url, setUrl] = useState(imageUrl) 
    setUrl(imageUrl)
  },[imageUrl])

  //PREVUALISATION IMAGE
  function previewFile(e) { 
    const file = e.target.files[0];
    setUrl(URL.createObjectURL(file));
  };

 return(
  <div className='create-post'>
  <input id='create-post__title' value={title} placeholder='Title' maxLength="125" required aria-label='title' />
    {!url ? null :
      <figure>
        <img src={url} alt='new postPicture'/>
      </figure>
    }
    <textarea  id='create-post__content' value={content} placeholder='Text' maxLength="300" required aria-label='content'></textarea>
    <label for='create-post__file'>Add picture or video :</label>
    <input id='create-post__file' type="file" onChange={previewFile} /> 
  </div>
 )
}

export default PostText;