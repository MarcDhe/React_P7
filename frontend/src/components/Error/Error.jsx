import './style.scss';
import image from '../../assets/licorne.jpeg'

function Error() {
  console.log('++++')
  return (
    <div id="error">
      <div className='frame'>
      <img src={image} alt='licorn' />
      <p>ERROR 404</p>
      <p>PAGE NOT FOUND</p>
      </div>
    </div>
  );
}

export default Error;
