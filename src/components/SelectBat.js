import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SelectBat = ({bat,open,setBat,setOpen}) => {
const navigate = useNavigate(); 
const location = useLocation();

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

const [name,setname] = useState('');
const teamapage = async()=>{
    try{

      const res = await fetch('/toss',{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      
//**************************       to be changed                  ****************************** */
      if(data.won ===team.aname){
        if(data.elect==="bat")
           setname(team.aname);
        else
          setname(team.bname);
      }else{
        if(data.elect==="bat")
           setname(team.bname);
        else
          setname(team.aname);
      }

      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    teamapage();
  },[team]);
//************   Select Batsman    ************** */
const [player,setPlayer] = useState({
  p1:"",p2:"",p3:"",p4:"",
    p5:"",p6:"",p7:"",
    p8:"",p9:"",p10:"",p11:""
});

  const select = async()=>{
    try{

      const res = await fetch('/selectbat',{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      setPlayer({...player,p1:data.p1,p2:data.p2,p3:data.p3,p4:data.p4,p5:data.p5,p6:data.p6,p7:data.p7,p8:data.p8,p9:data.p9,p10:data.p10,p11:data.p11});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    select();
  },[]);

//ithun uchala
  
const handleInputs = (e) =>{
    let name = e.target.value;
    if(!open){
      setOpen(name);
    }
    setBat(name);
}
const check = async (e) =>{
  e.preventDefault();
      console.log(bat);
      const res = await fetch('/choosebat',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:bat
        })
    });

    const data = await res.json();
    console.log(data);

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
    toast.success(`${bat} Choosed !!`,{
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
    }

}  
const proceed=(e)=>{
  e.preventDefault();
  if(open){
    navigate('/selectbowl',{state:{bat,open}});
  }
  
}
  
  return (
    <>
          <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>SELECT BATSMAN</h2></div>
          <div className='titlebox d-flex align-items-center justify-content-center'><h2 className=''>TEAM {name}</h2></div>
          <div className='mt-2 mb-2 selbatbox container'>
          <form className='mt-2 p-2 mb-2 align-self-center text-light' method='POST'>

          <div className='mt-3 playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p1}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p1} onClick ={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p2}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p2} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p3}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p3} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p4}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p4} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p5}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p5} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p6}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p6} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p7}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p7} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p8}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p8} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p9}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p9} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p10}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p10} onClick={handleInputs}/>
              </div>
          </div>
          <br />

          <div className='playerbox row'>
              <div className='col-lg-7 col-md-6 col-8'>
              <label name="p1" id="p1" className='mx-3 col-md-8 col-10'>{player.p11}</label>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
              <input className="form-check-input mx-3" type="radio" name="r1" id="r1" value={player.p11} onClick={handleInputs}/>
              </div>
          </div>
          <br />

            <div className='mt-2 text-center'>
              <button className='btn btn-outline-light' type='submit' onClick={check} style={{borderRadius:"20px"}}>Select</button>
              <button className='btn btn-outline-light mx-5' type='submit' onClick={proceed} style={{borderRadius:"20px"}}>Proceed</button>
            </div>
           </form>
          </div>
    </>
  );
};

export default SelectBat;
