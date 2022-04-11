import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TeamA = () => {
const navigate = useNavigate(); 
const [aname,setaname] = useState('');
  const teamapage = async()=>{
    try{

      const res = await fetch('/getmatchdata',{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      setaname(data.aname);
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
  },[]);

  const [player,setPlayer] = useState({
    p1:"",r1:"",p2:"",r2:"",p3:"",r3:"",p4:"",r4:"",
    p5:"",r5:"",p6:"",r6:"",p7:"",r7:"",
    p8:"",r8:"",p9:"",r9:"",p10:"",r10:"",p11:"",r11:"",
  });

  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setPlayer({...player,[name]:value});
}

var wk=false, cap=false;

const update = async (e) =>{
  e.preventDefault();
  const {p1,r1,p2,r2,p3,r3,p4,r4,p5,r5,p6,r6,p7,r7,p8,r8,p9,r9,p10,r10,p11,r11}= player;

  let arr =  {r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11};

  var roles = Object.keys(arr).map(function(key) {
    return arr[key];
});

roles.forEach(ele => {
  console.log(ele);

  if(ele==="wk/bat" || ele ==="cap/wk"){
    if(!wk){
      wk=true;
    }else{
    toast.error("Oppps Only 1 WK Allowed !!",{
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
    
}
if(ele==="cap/bat" || ele ==="cap/bowl" || ele==="cap/alr" || ele ==="cap/wk"){
      if(!cap){
        cap=true;
      }else{
        toast.error("Oppps Only 1 Captain Allowed !!",{
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
}
    
});

if(wk && cap){
  const res = await fetch('/teama',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      p1,r1,p2,r2,p3,r3,p4,r4,p5,r5,p6,r6,p7,r7,p8,r8,p9,r9,p10,r10,p11,r11
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
toast.success(`Team ${aname} Updated Successfully !!`,{
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
 navigate('/teamb');
}
}
else{
  toast.error("Select Your Captain and Wk Allowed !!",{
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
  
}   
  
  return (
    <>
        {/* <div className='text-center headerbox'>
            <h2 className=''>{aname} Details</h2>
          </div> */}
          <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>{aname} Details</h2></div>
          <div className='mt-2 batbox container'>
          <form className='mt-2 p-2 mb-2 align-self-center' method='POST'>

          <div className='mt-3 row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p1" id="p1" className='col-md-8 col-10' placeholder='Player 1' value={player.p1} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r1" id="r1" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className='row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p2" id="p2" className='col-md-8 col-10' placeholder='Player 2' value={player.p2} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r2" id="r2" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p3" id="p3" className='col-md-8 col-10' placeholder='Player 3' value={player.p3} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r3" id="r3" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p4" id="p4" className='col-md-8 col-10' placeholder='Player 4' value={player.p4} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r4" id="r4" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p5" id="p5" className='col-md-8 col-10' placeholder='Player 5' value={player.p5} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r5" id="r5" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p6" id="p6" className='col-md-8 col-10' placeholder='Player 6' value={player.p6} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r6" id="r6" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p7" id="p7" className='col-md-8 col-10' placeholder='Player 7' value={player.p7} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r7" id="r7" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p8" id="p8" className='col-md-8 col-10' placeholder='Player 8' value={player.p8} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r8" id="r8" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p9" id="p9" className='col-md-8 col-10' placeholder='Player 9' value={player.p9} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r9" id="r9" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p10" id="p10" className='col-md-8 col-10' placeholder='Player 10' value={player.p10} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r10" id="r10" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

          <div className=' row'>
              <div className='col-lg-7 col-md-6 col-8'>
                <input type="text" name="p11" id="p11" className='col-md-8 col-10' placeholder='Player 11' value={player.p11} onChange={handleInputs}/>
              </div>
              <div className='col-lg-5 col-md-6 col-4 text-end'>
                <select name="r11" id="r11" className='col-lg-6 col-md-6 col-10' onChange={handleInputs} >
                 <option value="">Role</option>
                 <option value="bat">Batsman</option>
                 <option value="bowl">Bowler</option>
                 <option value="alr">AllRounder</option>
                 <option value="wk/bat">WK/Batsman</option>
                 <option value="cap/bat">Batsman/CAP</option>
                 <option value="cap/bowl">Bowler/CAP</option>
                 <option value="cap/alr">AllRounder/CAP</option>
                 <option value="cap/wk">WK/CAP</option>
                 </select>
              </div>
          </div>
          <br />

            <div className='mt-4 text-end'>
              <button className='btn btn-primary' type='submit' onClick={update}>Go Play</button>
            </div>
           </form>
          </div>
    </>
  );
};

export default TeamA;
