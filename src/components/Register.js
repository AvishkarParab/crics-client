import React,{useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",email:"",phone:"",password:""
    });
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user,[name]:value});
    }
    const post = async (e) =>{
        e.preventDefault();

        const {name,phone,email,password}= user;
        const res = await fetch('/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                phone:Number(phone),
                email,
                password
            })
        })
        const data = await res.json();
        if(res.status === 400 || !data){
            setUser({name:"",email:"",phone:"",password:""});
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
        }
        else{
             
        toast.success("Registered Successfully !!",{
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
            navigate('/');
        }
    }

  return (
      <>
        <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>Register</h2></div>
          <br />
          <br />
          <br />
          <div className='d-flex mt-5 align-content-center border border-dark container align-self-center justify-content-center logbox'>
          <form className='mt-2 p-2 mb-2 w-50 align-self-center' method='POST'>
          <div className="mb-3">
                <label labelfor="email" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputs}/>
            </div>
            <div className="mb-3">
                <label labelfor="email" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputs}/>
            </div>
            <div className="mb-3">
                <label labelfor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputs}/>
            </div>
            <div className="mb-3">
                <label labelfor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={handleInputs}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={post}>Submit</button>
            </form>
          </div>
          <div className='d-flex justify-content-center align-items-center mt-3'>
              <h5>Already a  user  ?  </h5>
              <button className='btn btn-warning mx-2'><NavLink to='/' className="text-decoration-none text-dark">Login</NavLink></button>
          </div>
      </>
  );
};

export default Register;
