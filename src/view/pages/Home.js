import Base from '../core/Base';
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

import classes from './Home.module.css'
import { useEffect } from 'react';
import { isAuthenticated } from '../../controller/commonApi';

function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()){
      navigate('/allAudio', {replace: true})
    }
  },[])

  return (
    <Base>
      <div className={classes.welcome}>Welcome to</div>
      <div className={classes.title}>My song backup</div>

      
      <div className={classes.description2}>This is the place for <span className={classes.description3}>you!</span></div>
      
      <div className={classes.description1}>Can't afford premium music provider and fed up of having ads?</div>

      <div className={classes.description4}>You can upload your songs here and access it everywhere without worrying about your privacy.</div>

      
      <div className={classes.loginMessage}>Please login to access your songs</div>
      
    </Base>
  );
}

export default Home;
