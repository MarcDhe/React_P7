import './style.scss';
import { Outlet } from 'react-router-dom';

function Message(){
  return(
    <main id='messaging'>
      <h1 className='border-bottom'> Messaging </h1>
       <Outlet />   {/* SI PASSAGE PROPS DEPUIS OUTLET https://reactrouter.com/docs/en/v6/api#useoutletcontext */}
    </main>
  )
}

export default Message;