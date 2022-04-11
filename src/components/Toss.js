import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toss = () => {
const navigate = useNavigate();
const [team,setTeam] = useState({aname:"",bname:"",mtype:""});

  const tosspage = async()=>{
    try{

      const res = await fetch('/getmatchdata',{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      setTeam({...team,aname:data.aname,bname:data.bname,mtype:data.mtype});

      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    tosspage();
  },[]);

const [result,setResult] = useState({won:"",elect:""});
const handleInputs =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(name , value);
    setResult({...result,[name]:value});
};

const update = async(e)=>{
    e.preventDefault();
    const {won,elect}= result;
        const res = await fetch('/toss',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                won,elect
            })
        })

        const data = await res.json();
        if(res.status === 400 || !data){
        toast.error("Inavlid Details !!",{
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
        toast.success("Toss Updated Successfully !!",{
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
         navigate('/selectbat');
        }   
};

  return (
    <>
      {/* <div className='mt-2 text-center'>
       <h2>Toss Page</h2>
      </div> */}
      <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>Toss Details</h2></div>
      <div className='tosspage'>
      <br /><br /><br />
      <div className='mt-2 text-center'>
       <h5 className='text-light fs-2'>Match Type: {team.mtype}</h5>
      </div>
      <form method='POST' className='mt-5'>
      <div className='row mx-0'>
          <div className='container-fluid col-lg-8 col-md-10 col-12 tossbox'>
              <div className='mb-3 mt-4  row w-100 mx-1'>
                <label labelfor="tw" className=''>Toss Won : </label>

                <div className="col-6  d-flex justify-content-center">
                    <input className="form-check-input" type="radio" name="won" id="w1" value={team.aname} onClick={handleInputs}/>
                    <label className="form-check-label mx-3 text-capitalize" labefor="w1">{team.aname}</label>
                </div>
                <div className="col-6   d-flex justify-content-center">
                    <input className="form-check-input" type="radio" name="won" id="w2" value={team.bname} onClick={handleInputs}/>
                    <label className="form-check-label mx-3 text-capitalize" labelfor="w2">{team.bname}</label>
                </div>
              </div>
              <br />
              <div className='mb-3 mt-4  row w-100 mx-1'>
                <label labelfor="tw" className=''>Elected to : </label>
                <div className="col-6  d-flex justify-content-center">
                    <input className="form-check-input" type="radio" name="elect" id="e1" value="bat" onClick={handleInputs}/>
                    <label className="form-check-label mx-3" labefor="e1">Batting</label>
                </div>
                <div className="col-6   d-flex justify-content-center">
                    <input className="form-check-input" type="radio" name="elect" id="e2" value="bowl" onClick={handleInputs}/>
                    <label className="form-check-label mx-3" labelfor="e2">Bowling</label>
                </div>

              </div>
              <br />
                <div className='mt-3 mb-3 text-center'>
                <button className='btn btn-danger' onClick={update}> Proceed </button>
                </div>
          </div>  
      </div>
      </form>
      </div>
    </>
  )
};

export default Toss;
