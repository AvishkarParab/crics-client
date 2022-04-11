import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Flip, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ScorePage = ({bat,open,setBat,setOpen,bowl,setBowl}) => {

  const navigate = useNavigate(); 
  const location = useLocation();
  const [team,setTeam] = useState({aname:"",bname:"",mtype:"",overs:""});
    const tosspage = async()=>{
      try{
  
        const res = await fetch('https://cricket-score-server.herokuapp.com/getmatchdata',{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        setTeam({...team,aname:data.aname,bname:data.bname,mtype:data.mtype,overs:data.overs});
  
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
//******************************* */
const [name,setname] = useState({pname:'', npname:''});
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
           setname({...name,pname:team.bname,npname:team.aname});
        else
        setname({...name,pname:team.aname,npname:team.bname});
      }else{
        if(data.elect==="bat")
        setname({...name,pname:team.aname,npname:team.bname});
        else
        setname({...name,pname:team.bname,npname:team.aname});
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

/////////
  ///////////
  const [bats,setBats] = useState({
    b1name:"",b1runs:0,b1balls:0,b1fours:0,b1sixes:0,b1sr:0.0,b1strike:false,
    b2name:"",b2runs:0,b2balls:0,b2fours:0,b2sixes:0,b2sr:0.0,b2strike:false,
  });

  const batsman1page = async ()=>{
    try{

      const res = await fetch('/afterchoosebat',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:open
        })
      });
       
      const data = await res.json();
      setBats({...bats,b1name:data.name,b1runs:data.runs,b1balls:data.balls,b1fours:data.fours,b1sixes:data.sixes,b1sr:data.sr});
      

      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(bats.b1name==="")
      batsman1page();
  },[]);


  const batsman2page = async ()=>{
    try{

      const res = await fetch('/afterchoosebat',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:bat
        })
      });
       
      const data = await res.json();
      setBats({...bats,b2name:data.name,b2runs:data.runs,b2balls:data.balls,b2fours:data.fours,b2sixes:data.sixes,b2sr:data.sr});

      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(bats.b2name==="")
      batsman2page();
  },[bats.b1name]);

//bowler
const [bowler,setBowler] = useState({
  bwname:"",bwovers:0,bwballs:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0.0,ismaid:0
});

const bowlerpage = async ()=>{
  try{

    const res = await fetch('/afterchoosebowl',{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:bowl
      })
    });
     
    const data = await res.json();
    // console.log(data);
    setBowler({...bowler,bwname:data.name,bwovers:data.overs,bwmaidens:data.maidens,bwruns:data.runs,bwwickets:data.wickets,bwer:data.er,bwballs:data.balls,ismaid:data.runs});

    if(!res.status=== 200){
      const error = new Error(res.error);
      throw error;
  }

  }catch(err){
    console.log(err);
  }
}

useEffect(()=>{
  bowlerpage();
},[]);

  const [score,setScore] = useState({
    totscore:0,totwicket:0,totover:0,totball:0,nb:"false",wb:"false",b:"false",lb:"false",one:-1,two:-1,three:-1,four:-1,five:-1,six:-1,zero:-1,timeline:"",target:0
  });
//  **********   Score       ****************
  const scorer = async ()=>{
    try{
  console.log("you also");
      const res = await fetch('/save',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
      });
       
      const data = await res.json();
      console.log(data);
      setScore({...score,totscore:data.totscore,totball:data.totball,totover:data.totovers,totwicket:data.totwicket,timeline:data.timeline});
  

      if(!res.status=== 201){
        const error = new Error(res.error);
        throw error;
    }
  
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    scorer();
  },[]);


  const st =(e)=>{
    if(e.target.style.backgroundColor === "yellow"){
      setScore({...score,[e.target.name]:Number(-1)});
      e.target.style.backgroundColor="transparent";
    }else{
      setScore({...score,[e.target.name]:Number(e.target.value)});
      e.target.style.backgroundColor="yellow";
    }
    
  }

  const et =(e)=>{
    if(e.target.style.backgroundColor === "red"){
      setScore({...score,[e.target.name]:"false"});
      e.target.style.backgroundColor="transparent";
    }else{
      setScore({...score,[e.target.name]:"true"});
      e.target.style.backgroundColor="red";
    }
    

  }
//check score
function targetCheck(run){
  if(score.totscore+run >= location.state.target){
    toast.success(`Congratulation ${name.pname} Won !!`,{
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
  navigate('/win',{state:{name:name.pname}});
  }
    
}




  const scoreupdate =(e)=>{
        e.preventDefault();
//******************  one  */
        if(score.one === 1){
          if(score.nb ==="true"){
            setScore({...score,totscore:score.totscore+2,nb:"false",one:-1,timeline:score.timeline+"  1NB"})
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+1,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2runs:bats.b2runs+1,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(2);
            document.getElementById('one').style.backgroundColor="transparent";
            document.getElementById('nb').style.backgroundColor="transparent";
          }
          else if(score.wb ==="true"){
            setScore({...score,totscore:score.totscore+2,one:-1,wb:"false",timeline:score.timeline+"  1WB"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(2);
            document.getElementById('one').style.backgroundColor="transparent";
            document.getElementById('wb').style.backgroundColor="transparent";
          }
          else if(score.b ==="true"){
            setScore({...score,totscore:score.totscore+1,totball:(score.totball+1)%6,one:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,b:"false",timeline:score.timeline+"  1B"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(1);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(1)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('one').style.backgroundColor="transparent";
            document.getElementById('b').style.backgroundColor="transparent";
          }
          else if(score.lb ==="true"){
            setScore({...score,totscore:score.totscore+1,totball:(score.totball+1)%6,one:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,lb:"false",timeline:score.timeline+"  1LB"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(1);
            strike()
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(1)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('one').style.backgroundColor="transparent";
            document.getElementById('lb').style.backgroundColor="transparent";
          }
          else{
            setScore({...score,totscore:score.totscore+1,totball:(score.totball+1)%6,one:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  1"});
            // savescore()
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+1,b1balls:bats.b1balls+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2),b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2runs:bats.b2runs+1,b2balls:bats.b2balls+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2),b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
            targetCheck(1);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(1)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('one').style.backgroundColor="transparent";
          }

          
        }
//******************   two *************** */
        if(score.two === 2){
          if(score.nb ==="true"){
            setScore({...score,totscore:score.totscore+3,two:-1,nb:"false",timeline:score.timeline+"  2NB"});
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+2,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2)});
            }else{
              setBats({...bats,b2runs:bats.b2runs+2,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2)});
            }
            setBowler({...bowler,bwruns:bowler.bwruns+3,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(3);
            document.getElementById('two').style.backgroundColor="transparent";
            document.getElementById('nb').style.backgroundColor="transparent";
          }else if(score.wb ==="true"){
            setScore({...score,totscore:score.totscore+3,two:-1,wb:"false",timeline:score.timeline+"  2WB"});
            setBowler({...bowler,bwruns:bowler.bwruns+3,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(3);
            document.getElementById('two').style.backgroundColor="transparent";
            document.getElementById('wb').style.backgroundColor="transparent";
          }
          else if(score.b ==="true"){
            setScore({...score,totscore:score.totscore+2,two:-1,totball:(score.totball+1)%6,b:"false",timeline:score.timeline+"  2B"});
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+2,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(2);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(2)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('two').style.backgroundColor="transparent";
            document.getElementById('b').style.backgroundColor="transparent";
          }else if(score.lb ==="true"){
            setScore({...score,totscore:score.totscore+2,totball:(score.totball+1)%6,two:-1,lb:"false",timeline:score.timeline+"  2LB"});
            targetCheck(2);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(2)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('two').style.backgroundColor="transparent";
            document.getElementById('lb').style.backgroundColor="transparent";
          }
          else{
            setScore({...score,totscore:score.totscore+2,totball:(score.totball+1)%6,two:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:score.timeline+"  2"});
            // savescore()
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+2,b1balls:bats.b1balls+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2)});
            }else{
              setBats({...bats,b2runs:bats.b2runs+2,b2balls:bats.b2balls+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2)});
            }
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+2,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
            targetCheck(2);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(2)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('two').style.backgroundColor="transparent";
          }
        }
//******************   three *************** */
        if(score.three === 3){
          if(score.nb ==="true"){
            setScore({...score,totscore:score.totscore+4,nb:"false",three:-1,timeline:score.timeline+"  3NB"})
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+3,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2runs:bats.b2runs+3,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwruns:bowler.bwruns+4,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(4);
            document.getElementById('three').style.backgroundColor="transparent";
            document.getElementById('nb').style.backgroundColor="transparent";
          }
          else if(score.wb ==="true"){
            setScore({...score,totscore:score.totscore+4,three:-1,wb:"false",timeline:score.timeline+"  3WB"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwruns:bowler.bwruns+4,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(4);
            document.getElementById('three').style.backgroundColor="transparent";
            document.getElementById('wb').style.backgroundColor="transparent";
          }
          else if(score.b ==="true"){
            setScore({...score,totscore:score.totscore+3,totball:(score.totball+1)%6,three:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,b:"false",timeline:score.timeline+"  3B"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(3);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(3)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('three').style.backgroundColor="transparent";
            document.getElementById('b').style.backgroundColor="transparent";
          }
          else if(score.lb ==="true"){
            setScore({...score,totscore:score.totscore+3,totball:(score.totball+1)%6,three:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,lb:"false",timeline:score.timeline+"  3LB"});
            if(bats.b1strike){
              setBats({...bats,b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2strike:false,b1strike:true});
            }
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+3,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(3);
            strike()
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(3)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('three').style.backgroundColor="transparent";
            document.getElementById('lb').style.backgroundColor="transparent";
          }
          else{
            setScore({...score,totscore:score.totscore+3,totball:(score.totball+1)%6,three:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  3"});
            // savescore()
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+3,b1balls:bats.b1balls+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2),b1strike:false,b2strike:true});
            }else{
              setBats({...bats,b2runs:bats.b2runs+3,b2balls:bats.b2balls+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2),b2strike:false,b1strike:true});
            }
            strike()
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
            targetCheck(3);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(3)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('three').style.backgroundColor="transparent";
          }
          
        }
 //******************   four *************** */
        if(score.four === 4){
          if(score.nb ==="true"){
            setScore({...score,totscore:score.totscore+5,nb:"false",four:-1,timeline:score.timeline+"  4NB"})
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+4,b1fours:bats.b1fours+1});
            }else{
              setBats({...bats,b2runs:bats.b2runs+4,b2fours:bats.b2fours+1});
            }
            setBowler({...bowler,bwruns:bowler.bwruns+5,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(5);
            document.getElementById('four').style.backgroundColor="transparent";
            document.getElementById('nb').style.backgroundColor="transparent";
          }
          else if(score.wb ==="true"){
            setScore({...score,totscore:score.totscore+5,four:-1,wb:"false",timeline:score.timeline+"  4WB"});
            setBowler({...bowler,bwruns:bowler.bwruns+5,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(5);
            document.getElementById('four').style.backgroundColor="transparent";
            document.getElementById('wb').style.backgroundColor="transparent";
          }
          else if(score.b ==="true"){
            setScore({...score,totscore:score.totscore+4,totball:(score.totball+1)%6,four:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,b:"false",timeline:score.timeline+"  4B"});
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
            targetCheck(4);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(4)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('four').style.backgroundColor="transparent";
            document.getElementById('b').style.backgroundColor="transparent";
          }
          else if(score.lb ==="true"){
            setScore({...score,totscore:score.totscore+4,totball:(score.totball+1)%6,four:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,lb:"false",timeline:score.timeline+"  4LB"});
            targetCheck(4);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(4)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('four').style.backgroundColor="transparent";
            document.getElementById('lb').style.backgroundColor="transparent";
          }
          else{
            setScore({...score,totscore:score.totscore+4,totball:(score.totball+1)%6,four:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  4"});
            // savescore()
            if(bats.b1strike){
              setBats({...bats,b1runs:bats.b1runs+4,b1balls:bats.b1balls+1,b1fours:bats.b1fours+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2)});
            }else{
              setBats({...bats,b2runs:bats.b2runs+4,b2balls:bats.b2balls+1,b2fours:bats.b2fours+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2)});
            }
            strike()
            setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+4,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
            targetCheck(4);
            if((bowler.bwballs+1)%6 ===0){
              batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
              batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
              var inni = bowlup(4)
              if(inni)
              {
                if(inni >= location.state.target)
                  navigate('/win',{state:{name:name.pname}});
                else
                  navigate('/win',{state:{name:name.npname}});
              }
              else
              navigate('/aselectbowl');
            }
            document.getElementById('four').style.backgroundColor="transparent";
          }
          
        }
//******************   five  *************** */
if(score.five === 5){
  if(score.nb ==="true"){
    setScore({...score,totscore:score.totscore+6,nb:"false",five:-1,timeline:score.timeline+"  5NB"})
    setBowler({...bowler,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(6);
    document.getElementById('five').style.backgroundColor="transparent";
    document.getElementById('nb').style.backgroundColor="transparent";
  }
  else if(score.wb ==="true"){
    setScore({...score,totscore:score.totscore+6,five:-1,wb:"false",timeline:score.timeline+"  5WB"});
    setBowler({...bowler,bwruns:bowler.bwruns+6,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(6);
    document.getElementById('five').style.backgroundColor="transparent";
    document.getElementById('wb').style.backgroundColor="transparent";
  }
  else if(score.b ==="true"){
    setScore({...score,totscore:score.totscore+5,totball:(score.totball+1)%6,five:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,b:"false",timeline:score.timeline+"  5B"});
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(5);
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(5)
      if(inni)
      {
        if(inni >= location.state.target)
          navigate('/win',{state:{name:name.pname}});
        else
          navigate('/win',{state:{name:name.npname}});
      }
      else
        navigate('/aselectbowl');
    }
    document.getElementById('five').style.backgroundColor="transparent";
    document.getElementById('b').style.backgroundColor="transparent";
  }
  else if(score.lb ==="true"){
    setScore({...score,totscore:score.totscore+5,totball:(score.totball+1)%6,five:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,lb:"false",timeline:score.timeline+"  5LB"});
    if(bats.b1strike){
      setBats({...bats,b1strike:false,b2strike:true});
    }else{
      setBats({...bats,b2strike:false,b1strike:true});
    }
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+5,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(5);
    strike()
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(5)
      if(inni)
        {
          if(inni >= location.state.target)
            navigate('/win',{state:{name:name.pname}});
          else
            navigate('/win',{state:{name:name.npname}});
        }
          else
            navigate('/aselectbowl');
    }
    document.getElementById('five').style.backgroundColor="transparent";
    document.getElementById('lb').style.backgroundColor="transparent";
  }
  else{
    setScore({...score,totscore:score.totscore+5,totball:(score.totball+1)%6,five:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  5"});
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+5,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
    targetCheck(5);
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(5)
      if(inni)
        {
          if(inni >= location.state.target)
            navigate('/win',{state:{name:name.pname}});
          else
            navigate('/win',{state:{name:name.npname}});
        }
          else
            navigate('/aselectbowl');
    }
    document.getElementById('five').style.backgroundColor="transparent";
  }
  
}

//******************   six   *************** */
if(score.six === 6){
  if(score.nb ==="true"){
    setScore({...score,totscore:score.totscore+7,nb:"false",six:-1,timeline:score.timeline+"  6NB"})
    if(bats.b1strike){
      setBats({...bats,b1runs:bats.b1runs+6,b1sixes:bats.b1sixes+1});
    }else{
      setBats({...bats,b2runs:bats.b2runs+6,b2sixes:bats.b2sixes+1});
    }
    setBowler({...bowler,bwruns:bowler.bwruns+7,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(7);
    document.getElementById('six').style.backgroundColor="transparent";
    document.getElementById('nb').style.backgroundColor="transparent";
  }
  else if(score.wb ==="true"){
    setScore({...score,totscore:score.totscore+7,six:-1,wb:"false",timeline:score.timeline+"  6WB"});
    setBowler({...bowler,bwruns:bowler.bwruns+7,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(7);
    document.getElementById('six').style.backgroundColor="transparent";
    document.getElementById('wb').style.backgroundColor="transparent";
  }
  else if(score.b ==="true"){
    setScore({...score,totscore:score.totscore+6,totball:(score.totball+1)%6,six:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,b:"false",timeline:score.timeline+"  6B"});
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(6);
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(6)
      if(inni)
      {
        if(inni >= location.state.target)
          navigate('/win',{state:{name:name.pname}});
        else
          navigate('/win',{state:{name:name.npname}});
      }
        else
          navigate('/aselectbowl');
    }
    document.getElementById('six').style.backgroundColor="transparent";
    document.getElementById('b').style.backgroundColor="transparent";
  }
  else if(score.lb ==="true"){
    setScore({...score,totscore:score.totscore+6,totball:(score.totball+1)%6,six:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,lb:"false",timeline:score.timeline+"  6LB"});
    targetCheck(6);
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(6)
      if(inni)
      {
        if(inni >= location.state.target)
          navigate('/win',{state:{name:name.pname}});
        else
          navigate('/win',{state:{name:name.npname}});
      }
        else
          navigate('/aselectbowl');
    }
    document.getElementById('six').style.backgroundColor="transparent";
    document.getElementById('lb').style.backgroundColor="transparent";
  }
  else{
    setScore({...score,totscore:score.totscore+6,totball:(score.totball+1)%6,six:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  6"});
    // savescore()
    if(bats.b1strike){
      setBats({...bats,b1runs:bats.b1runs+6,b1balls:bats.b1balls+1,b1sixes:bats.b1sixes+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2)});
    }else{
      setBats({...bats,b2runs:bats.b2runs+6,b2balls:bats.b2balls+1,b2sixes:bats.b2sixes+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2)});
    }
    strike()
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+6,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
    targetCheck(6);
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(6)
      if(inni)
      {
        if(inni >= location.state.target)
          navigate('/win',{state:{name:name.pname}});
        else
          navigate('/win',{state:{name:name.npname}});
      }
        else
          navigate('/aselectbowl');
    }
    document.getElementById('six').style.backgroundColor="transparent";
  }
  
}


//******************   zero   *************** */
if(score.zero === 0){
  if(score.nb ==="true"){
    setScore({...score,totscore:score.totscore+1,nb:"false",zero:-1,timeline:score.timeline+"  0NB"})
    setBowler({...bowler,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(1);
    document.getElementById('zero').style.backgroundColor="transparent";
    document.getElementById('nb').style.backgroundColor="transparent";
  }
  else if(score.wb ==="true"){
    setScore({...score,totscore:score.totscore+1,zero:-1,wb:"false",timeline:score.timeline+"  0WB"});
    setBowler({...bowler,bwruns:bowler.bwruns+1,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)});
    targetCheck(1);
    document.getElementById('zero').style.backgroundColor="transparent";
    document.getElementById('wb').style.backgroundColor="transparent";
  }
  else{
    setScore({...score,totscore:score.totscore+0,totball:(score.totball+1)%6,zero:-1,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:((score.totball+1)%6 ===0)?" ":score.timeline+"  0"});
    // savescore()
    if(bats.b1strike){
      setBats({...bats,b1runs:bats.b1runs+0,b1balls:bats.b1balls+1,b1sr:((bats.b1runs/bats.b1balls)*100).toFixed(2)});
    }else{
      setBats({...bats,b2runs:bats.b2runs+0,b2balls:bats.b2balls+1,b2sr:((bats.b2runs/bats.b2balls)*100).toFixed(2)});
    }
    setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwruns:bowler.bwruns+0,bwer:(bowler.bwruns/bowler.bwovers).toFixed(2)})
    if((bowler.bwballs+1)%6 ===0){
      batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
      batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
      var inni = bowlup(0)
      if(inni)
      {
        if(inni >= location.state.target)
          navigate('/win',{state:{name:name.pname}});
        else
          navigate('/win',{state:{name:name.npname}});
      }
        else
          navigate('/aselectbowl');
    }
    document.getElementById('zero').style.backgroundColor="transparent";
  }
  
}

  }


 const out = async() =>{
  console.log(bowler.bwname , bowler.bwovers , bowler.bwmaidens , bowler.bwruns, bowler.bwwickets+1 , bowler.bwer, (bowler.bwballs+1)%6);
    console.log("out section");
    try{
      const res = await fetch('/afterupdatebowler',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:bowler.bwname,
          overs:bowler.bwovers,
          maidens:bowler.bwmaidens,
          runs:bowler.bwruns,
          wickets:bowler.bwwickets+1,
          er:bowler.bwer,
          balls:(bowler.bwballs+1)%6
        })
      });  
      const data = await res.json();
      console.log(data);
    //   // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
      console.log(err);
    }

    console.log(score.totscore,score.totball,score.totover,score.timeline);
    try{
      const res = await fetch('/save',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          totscore:score.totscore,
          totovers:score.totover,
          totball:(score.totball+1)%6,
          totwicket:score.totwicket+1,
          timeline:score.timeline+" W"
        })
      });  
      const data = await res.json();
      console.log(data);
    //   // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
      console.log(err);
    }

  }
function wicket(){
// e.preventDefault();
if(bats.b1strike){
  setScore({...score,totball:(score.totball+1)%6,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:score.timeline+"  W",totwicket:score.totwicket+1});
  setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwwickets:bowler.bwwickets+1});
  out()
  batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
  batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
  navigate('/aselectbat');
  setOpen(bat);

}else if(bats.b2strike){
  setScore({...score,totball:(score.totball+1)%6,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:score.timeline+"  W",totwicket:score.totwicket+1});
  setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwwickets:bowler.bwwickets+1});
  out()
  batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
  batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)

  console.log((bowler.bwballs+1)%6);
  navigate('/aselectbat');

}
if((bowler.bwballs+1)%6 ===0){
  setScore({...score,totball:(score.totball+1)%6,totover:((score.totball+1)%6 ===0)?score.totover+1:score.totover,timeline:score.timeline+"  W",totwicket:score.totwicket+1});
  setBowler({...bowler,bwballs:(bowler.bwballs+1)%6,bwwickets:bowler.bwwickets+1});
  batup(bats.b1name,bats.b1runs,bats.b1balls,bats.b1fours,bats.b1sixes,bats.b1sr)
  batup(bats.b2name,bats.b2runs,bats.b2balls,bats.b2fours,bats.b2sixes,bats.b2sr)
  outbowl(0)
  var inni = bowlup(1)
    if(inni)
      navigate('/aselectbat');
     else
      navigate('/aselectbowl');
}

}


  function strike (){
    // e.preventDefault();
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    if(bats.b1strike){
      p1.innerHTML = bats.b1name;
      p2.innerHTML = bats.b2name + " *";
      bats.b1strike=false;
      bats.b2strike=true;
    }
    else if(bats.b2strike){
      p1.innerHTML = bats.b1name + " *";
      p2.innerHTML = bats.b2name;
      bats.b1strike=true;
      bats.b2strike=false;
    }else{
      p1.innerHTML += " *";
      bats.b1strike=true;
    }
  }


  async function batup(name,runs,balls,fours,sixes,sr){
    try{
      const res = await fetch('/afterupdatebatsman',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,runs,balls,fours,sixes,sr
        })
      });  
      const data = await res.json();
      setBats({...bats,b1name:"",b2name:""});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
      console.log(err);
    }
  }

  async function bowlup(runs){
    try{
      console.log("here");
      console.log(bowler.bwname , bowler.bwovers+1 , bowler.bwmaidens , bowler.bwruns, bowler.bwwickets , bowler.bwer, bowler.bwballs);
      const res = await fetch('/afterupdatebowler',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:bowler.bwname,
          overs:bowler.bwovers+1,
          maidens:(bowler.ismaid!==bowler.bwruns)?bowler.bwmaidens+1:bowler.bwmaidens,
          runs:bowler.bwruns,
          wickets:bowler.bwwickets,
          er:bowler.bwer,
          balls:(bowler.bwballs+1)%6
        })
      });  
      const data = await res.json();
      // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
      console.log(err);
    }

    ////////
    console.log(score.totscore,score.totball,score.totover,score.timeline);

    try{
      const res = await fetch('/save',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          totscore:score.totscore+runs,
          totovers:score.totover+1,
          totball:(score.totball+1)%6,
          totwicket:score.totwicket,
          target:score.totscore+1,
          timeline:""
        })
      });  
      const data = await res.json();
      console.log(data);
    //   // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    var target = score.totscore+runs;
    if(score.totover+1 >= team.overs){
      console.log("enterted");
      setScore({...score,target:score.totscore+1});
      toast.success(`Innings Over target ${score.totscore+1} !!`,{
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
    return target;
    }
    return false;
    }catch(err){
      console.log(err);
    }
  }
  //wicket on last ball
  async function outbowl(runs){
    try{
      console.log("here outbowl");
      console.log(bowler.bwname , bowler.bwovers+1 , bowler.bwmaidens , bowler.bwruns, bowler.bwwickets+1 , bowler.bwer, bowler.bwballs);
      const res = await fetch('/afterupdatebowler',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:bowler.bwname,
          overs:bowler.bwovers+1,
          maidens:(bowler.ismaid===bowler.bwruns)?bowler.bwmaidens+1:bowler.bwmaidens,
          runs:bowler.bwruns,
          wickets:bowler.bwwickets+1,
          er:(bowler.bwruns/bowler.bwovers).toFixed(2),
          balls:(bowler.bwballs+1)%6
        })
      });  
      const data = await res.json();
      // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    }catch(err){
      console.log(err);
    }
    console.log(score.totscore,score.totball,score.totover,score.timeline);
    try{
      const res = await fetch('/save',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          totscore:score.totscore+runs,
          totovers:score.totover+1,
          totball:(score.totball+1)%6,
          totwicket:score.totwicket+1,
          timeline:""
        })
      });  
      const data = await res.json();
      console.log(data);
    //   // setBowler({...bowler,bwname:"",bwovers:0,bwmaidens:0,bwruns:0,bwwickets:0,bwer:0});
      if(!res.status=== 200){
        const error = new Error(res.error);
        throw error;
    }
    var target = score.totscore+1;
    if(score.totover+1 >= team.overs){
      console.log("enterted");
      setScore({...score,target:score.totscore+1});
      toast.success(`Innings Over target ${score.totscore+1} !!`,{
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
    return target;
    }
    return false;
    }catch(err){
      console.log(err);
    }
  }

  return (
     <>
        <div className='headerbox d-flex align-items-center justify-content-center' style={{height:"60px"}}><h2 className=''>SCORE PAGE <i class="fa-solid fa-tennis-ball"></i></h2></div>
        <div className='container-fluid scorebox d-flex justify-content-center'>
          <div className='scorecontainer'>
          <div className='text-center bg-warning d-flex justify-content-center align-items-center' style={{backgroundColor:"#f5f505",color:"black",borderRadius:"7px",padding:"5px"}}>
            <h5 className=''>{team.aname} v/s {team.bname}</h5>
          </div>
          <div className='bg-info row mx-0' style={{backgroundColor:"#f5f505",color:"black",borderRadius:"5px",paddingTop:"3px"}}>
          <h6 className='col-6 text-center text-uppercase '>Innings : {name.pname} </h6>
          <h6 className='col-6 text-center text-uppercase' style={{color:"red"}}><strong> Target : {location.state.target} </strong></h6>
          </div>
          <div className='viewscore mt-1'>
            <div className=' row mx-0'>
                <div className='score col-lg-3 col-md-3 col-4 text-center p-3'>
                  <h1>{score.totscore}/{score.totwicket}</h1>
                </div>
                <div className=' col-lg-9 col-md-9 col-8 text-center'>
                  <h3 className=''>{score.totover} . {score.totball}  overs</h3>
                  <div className='col-12 text-start'>
                  <h5 className='' style={{color:"yellow"}}> {score.timeline}</h5>
                  </div>
                </div>
            </div>

            <div className=' row mx-0 mb-1 mt-4'>
              <div className='playername col-4 text-center'>
                  <div className='batname text-start'>
                    <h6>Batsman</h6>
                  </div>
              </div>
              <div className='playerdetails row  col-8 text-center mx-0'>
                  <div className='r col-3 '>
                    <h6>R</h6>
                  </div>
                  <div className='b col-2  '>
                    <h6>B</h6>
                  </div>
                  <div className='4s col-2  '>
                    <h6>4s</h6>
                  </div>
                  <div className='6s col-2  '>
                    <h6>6s</h6>
                  </div>
                  <div className='sr col-3  '>
                    <h6>S.R</h6>
                  </div>
              </div>
            </div>

            <div className=' row mx-0 mb-2'>
              <div className='player1name  col-4 text-center'>
                  <div className='bat1name text-start'>
                    <h6 className='' id='p1' name='p1' style={{color:"yellow"}}>{bats.b1name?bats.b1name:"Player1"}</h6>
                  </div>
              </div>
              <div className='player1details row col-8 text-center mx-0' style={{color:"yellow"}}>
                  <div className='r col-3 '>
                    <h6>{bats.b1runs?bats.b1runs:0 }</h6>
                  </div>
                  <div className='b col-2  '>
                    <h6>{bats.b1balls?bats.b1balls:0 }</h6>
                  </div>
                  <div className='4s col-2  '>
                    <h6>{bats.b1fours?bats.b1fours:0} </h6>
                  </div>
                  <div className='6s col-2  '>
                    <h6>{bats.b1sixes?bats.b1sixes:0 }</h6>
                  </div>
                  <div className='sr col-3  '>
                    <h6>{bats.b1sr?bats.b1sr:0 }</h6>
                  </div>
              </div>
            </div>
            
            <div className=' row mx-0 mb-4'>
              <div className='player2name col-4 text-center'>
                  <div className='bat2name text-start' style={{color:"yellow"}}>
                    <h6 className='' id='p2' name='p2'>{bats.b2name?bats.b2name:"Player2"}</h6>
                  </div>
              </div>
              <div className='player2details row  col-8 text-center mx-0' style={{color:"yellow"}}>
                  <div className='r col-3 '>
                    <h6>{bats.b2runs?bats.b2runs:0 }</h6>
                  </div>
                  <div className='b col-2  '>
                    <h6>{bats.b2balls?bats.b2balls:0 }</h6>
                  </div>
                  <div className='4s col-2  '>
                    <h6>{bats.b2fours?bats.b2fours:0 }</h6>
                  </div>
                  <div className='6s col-2  '>
                    <h6>{bats.b2sixes?bats.b2sixes:0 }</h6>
                  </div>
                  <div className='sr col-3  '>
                    <h6>{bats.b2sr?bats.b2sr:0 }</h6>
                  </div>
              </div>
            </div>

            <div className=' row mx-0 mb-1'>
              <div className='playername  col-4 text-center'>
                  <div className='bowlname text-start'>
                    <h6>Bowler</h6>
                  </div>
              </div>
              <div className='playerdetails row  col-8 text-center mx-0'>
                  <div className='r col-3 '>
                    <h6>O</h6>
                  </div>
                  <div className='b col-2  '>
                    <h6>M</h6>
                  </div>
                  <div className='4s col-2  '>
                    <h6>R</h6>
                  </div>
                  <div className='6s col-2  '>
                    <h6>W</h6>
                  </div>
                  <div className='sr col-3  '>
                    <h6>E.R</h6>
                  </div>
              </div>
            </div>

            <div className=' row mx-0 mb-4'>
              <div className='player1name col-4 text-center'>
                  <div className='bat1name text-start' style={{color:"yellow"}}>
                    <h6>{bowler.bwname?bowler.bwname:"bowler1" }</h6>
                  </div>
              </div>
              <div className='player1details row col-8 text-center mx-0' style={{color:"yellow"}}>
                  <div className='r col-3 '>
                    <h6>{bowler.bwovers}.{bowler.bwballs} </h6>
                  </div>
                  <div className='b col-2  '>
                    <h6>{bowler.bwmaidens?bowler.bwmaidens:0 }</h6>
                  </div>
                  <div className='4s col-2  '>
                    <h6>{bowler.bwruns?bowler.bwruns:0 }</h6>
                  </div>
                  <div className='6s col-2  '>
                    <h6>{bowler.bwwickets?bowler.bwwickets:0 }</h6>
                  </div>
                  <div className='sr col-3  '>
                    <h6>{bowler.bwer?bowler.bwer:0 }</h6>
                  </div>
              </div>
            </div>


          </div>
          <div className='scorebtns'>
            <div className='bg-success text-light text-center'>
              <h6>Update Score</h6>
            </div>

            <div className='row mx-0 text-center mb-2'>
              <div className='col-2 '>
                  <button className='exbt' id='exbt' name='nb' id="nb" onClick={et}> NB</button>
              </div>
              <div className='col-2 '>
                  <button className='exbt' id='exbt' name='wb' id="wb" onClick={et}> WB</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={1} name='one' id="one" onClick={st}> 1</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={2} name='two' id="two" onClick={st}> 2</button>
              </div>
              <div className='col-4 '>
                  <button className='spbt strike' onClick={strike}> STRIKE CHANGE</button>
              </div>
            </div>

            <div className='row mx-0 text-center mb-2'>
              <div className='col-2 '>
                  <button className='exbt' id='exbt' name='b' id="b" onClick={et}> B</button>
              </div>
              <div className='col-2 '>
                  <button className='exbt' id='exbt' name='lb' id="lb" onClick={et}> LB</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={3} name='three' id="three" onClick={st}> 3</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={4} name='four' id="four" onClick={st}> 4</button>
              </div>
              <div className='col-4 '>
                  <button className='spbt out' onClick={wicket}> Out <i class="fa-solid fa-hand-point-up"></i></button>
              </div>
            </div>

            <div className='row  mx-0 text-center'>
              <div className='col-2 '>
                  <button className='exbt' id='exbt'> <i class="fa-solid fa-circle-left"></i></button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={0} name='zero' id="zero" onClick={st}> 0</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={5} name='five' id="five" onClick={st}> 5</button>
              </div>
              <div className='col-2 '>
                  <button className='scbt' value={6} name='six' id="six" onClick={st}> 6</button>
              </div>
              <div className='col-4 '>
                  <button className='spbt update' onClick={scoreupdate}> UPDATE <i class="fa-solid fa-circle-check"></i></button>
              </div>
            </div>


          </div>
          </div>
        </div>




     </>

  )
};

export default ScorePage;
