import React, { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Start from './Start';

const Login = () => {
const navigate = useNavigate();
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

 const verify = async (e)=>{
    e.preventDefault();
    const res = await fetch('/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    })

    const data = await res.json();
    if( res.status === 400 || !data){
        setEmail("");
        setPassword("");
        toast.error("Inavlid Username or Password !!",{
            position: "top-center",
            transition: Flip,
            className:"text-light",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }else{
        
        toast.success("Login Successfully !!",{
            position: "top-center",
            transition: Flip,
            className:"text-dark mx-3",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        navigate('/start');
    }
 }

  return (
      <>
         <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>Login</h2></div>

          <br />
          <br />
          <br />
          <div className='d-flex mt-5 align-content-center container align-self-center justify-content-center logbox'>
          <form className='mt-2 p-2 mb-2 w-50 align-self-center' method='POST'>
            <div className="mb-3">
                <label labelfor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label labelfor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={verify}>Submit</button>
            </form>
          </div>
          <div className='d-flex justify-content-center align-items-center mt-3'>
              <h5>New User Register Now !!!!</h5>
              <button className='btn btn-danger mx-2'><NavLink to='/register' className=' text-decoration-none text-light'>Register</NavLink></button>
          </div>
      </>
  );
};

export default Login;
