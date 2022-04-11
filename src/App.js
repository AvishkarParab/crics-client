import React,{useState} from 'react';
import { Route,Routes } from 'react-router-dom';
import Start from './components/Start';
import Matchdetail from './components/Matchdetail';
import "./App.css"
import Register from './components/Register';
import Login from './components/Login';
import TeamA from './components/TeamA';
import TeamB from './components/TeamB';
import { ToastContainer } from 'react-toastify';
import Toss from './components/Toss';
import SelectBat from './components/SelectBat';
import SelectBowl from './components/SelectBowl';
import ScorePage from './components/ScorePage';
import AfterSelectBat from './components/AfterSelectBat';
import AfterSelectBowl from './components/AfterSelectBowl';
import AfterScorePage from './components/AfterScorePage';
import Win from './components/Win';

const App = () => {
const [bat,setBat] = useState('');
const [open,setOpen] = useState('');
const [bowl,setBowl] = useState('');

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/start' element={<Start/>} />
        <Route  path='/matchdetails' element={<Matchdetail/>} />
        <Route  path='/teama' element={<TeamA/>} />
        <Route  path='/teamb' element={<TeamB/>} />
        <Route  path='/toss' element={<Toss/>} />
        <Route  path='/selectbat' element={<SelectBat bat={bat} setBat={setBat}  open={open} setOpen={setOpen}/>} />
        <Route  path='/selectbowl' element={<SelectBowl bat={bat} open={open} bowl={bowl} setBowl={setBowl}/>} />
        <Route  path='/scorepage' element={<ScorePage bat={bat} setBat={setBat} open={open} setOpen={setOpen} bowl={bowl} setBowl={setBowl}/>} />
        <Route  path='/aselectbat' element={<AfterSelectBat bat={bat} setBat={setBat} open={open} setOpen={setOpen}/>} />
        <Route  path='/aselectbowl' element={<AfterSelectBowl bat={bat} open={open} bowl={bowl} setBowl={setBowl}/>} />
        <Route  path='/afterscorepage' element={<AfterScorePage bat={bat} setBat={setBat} open={open} setOpen={setOpen} bowl={bowl} setBowl={setBowl}/>} />
        <Route  path='/win' element={<Win/>} />
      </Routes>
      <ToastContainer theme="colored" />
    </>
  )
}

export default App
