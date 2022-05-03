import './style.scss';
import PostText from '../../components/PostText/PostText';
import { newPost } from '../../services/callApi';
import {useNavigate} from 'react-router-dom';

function CreatePost (){
  const navigate = useNavigate();
  async function sendPost(e){
    e.preventDefault();
    const title = document.getElementById('create-post__title').value;
    const content = document.getElementById('create-post__content').value; 
    const post = JSON.stringify({title, content})
    //https://stackoverflow.com/questions/48284011/how-to-post-image-with-fetch
    const fileInput = document.getElementById('create-post__file');  //https://www.tech-wiki.online/fr/how-to-upload-files-fetch.html
    const formData = new FormData(); // utilisation de .append() https://serversideup.net/file-uploads-using-fetch-api-and-vuejs/
    formData.append('post',post); // A FAIRE ATTENTION ICI
    formData.append('image',fileInput.files[0]);// nommé image a cause de multer

    const response = await newPost(formData);
    navigate(`/post/${response.new_post_id}`);
  }
  return(
    <main id="create-post">
      <h1> Create your post </h1>
      <form onSubmit={sendPost}>
        <PostText/>
        <button>Post</button>
      </form>
    </main>
  )
}

export default CreatePost;