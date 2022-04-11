import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Start = () => {
    const navigate = useNavigate();
    const notify = () => {
        toast.info(" Start Match!",{
          position: "top-right",
          transition: Flip,
          className:"text-light",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        navigate('/matchdetails');
    }

    return (
        <>
        <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>START MATCH</h2></div>
        <div className='d-grid start'>
          <div className='container h-25 w-50 cont'>
                <button className='text-center btn btn-danger' onClick={notify}> Start Match </button>
          </div>  
        </div>
          <ToastContainer position="top-center" />
        </>
    )
}

export default Start
