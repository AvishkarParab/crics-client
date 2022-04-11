import React from 'react';
import { useLocation,NavLink } from 'react-router-dom';

const Win = () => {
    const location = useLocation();
  return (
    <>
      <div className='maincont'>
        <div className='winbox'>
        <h1 className='text-uppercase' style={{color:"yellow"}}>Congratulations !! {location.state.name}</h1><br />
        <NavLink to='/matchdetails'>  <h6 className='text-light text-center'> Go back to Match Details</h6></NavLink>
      
        </div>
      </div>

    </>
    


  )
};

export default Win;
