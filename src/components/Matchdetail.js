import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Matchdetail = () => {
    const navigate = useNavigate();
    const [match,setMatch] = useState({
       email:"",mtype:"",overs:3,aname:"",bname:""
    });
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setMatch({...match,[name]:value});
    }
    const settype = (e) =>{
        const num = parseInt(e.target.value,10);
        
        switch(num){
            case 3:
                setMatch({...match,mtype:"3 Overs",overs:num});
                break;
            case 10:
                setMatch({...match,mtype:"T10" ,overs:num});
                console.log(num);
                break;
            case 20:
                setMatch({...match,mtype:"T20",overs:num});
                break;
            case 50:
                setMatch({...match,mtype:"ODI",overs:num});
                break;
            default:
                setMatch({...match,mtype:"Custom"});
                break;
        }
    }
    const checkSelect = (e) =>{
        const num = parseInt(e.target.value,10);  
        setMatch({...match,overs:num});
    }

    const MatchPage = async () =>{
            try{
            const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            setMatch({...match, email:data.email});

            if(!res.status=== 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        MatchPage();
     }, []);

    const Book = async (e) =>{
        e.preventDefault();
        const {email,mtype,overs,aname,bname}= match;
        const res = await fetch('/matchdetails',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                mtype:mtype,
                overs:overs,
                aname:aname,
                bname:bname
            })
        })

        const data = await res.json();
        if(res.status === 400 || !data){
            setMatch({email:"",mtype:"",overs:0,aname:"",bname:""});

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
        toast.success("Match Placed Successfully !!",{
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
         navigate('/teama');
        }   
    }

    return (
        <>
          <div className='headerbox d-flex align-items-center justify-content-center'><h2 className=''>MATCH DETAILS</h2></div>
         <br />
         <br /><br />
          <div className='d-flex  align-content-center border border-dark container align-self-center justify-content-center matchbox'>
          <form className='mt-2 p-2 mb-2 w-50 align-self-center' method='POST'>
          <div className="mb-3">
                <label labelfor="email" className="form-label">User Email</label>
                <input type="email" className="form-control" id="email" name="email" value={match.email} onChange={handleInputs}/>
            </div>
            <div className="mb-3">
                <label labelfor="mtype" className="form-label">Match Type</label>
                <select className="form-select" onChange={settype}>
                    <option value="3" defaultChecked>3 overs</option>
                    <option value="10">T10</option>
                    <option value="20">T20</option>
                    <option value="50">ODI</option>
                    <option value={0}> Custom</option>
                </select>
                {/* <input type="text" className="form-control" id="mtype" name="mtype" value={match.mtype} onChange={handleInputs}/> */}
            </div>
            <div className="mb-3">
                <label labelfor="overs" className="form-label">Overs</label>
                <input type="number" className="form-control" id="overs" name="overs" value={match.overs} onChange={checkSelect}/>
            </div>
            {/* <div className="mb-3">
                <label labelfor="mtype" className="form-label">Date</label>
                <input type="text" className="form-control" id="mtype" name="mtype" value={match.emaile} onChange={handleInputs}/>
            </div> */}
            <div className="mb-3">
                <label labelfor="aname" className="form-label"> Team A Name </label>
                <input type="text" className="form-control" id="aname" name="aname" value={match.aname} onChange={handleInputs}/>
            </div>
            <div className="mb-3">
                <label labelfor="bname" className="form-label">Team B Name </label>
                <input type="text" className="form-control" id="bname" name="bname" value={match.bname} onChange={handleInputs}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={Book}>Submit</button>
            </form>
          </div>
        </>
    )
}

export default Matchdetail
