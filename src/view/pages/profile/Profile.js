import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from '../../../controller/commonApi';
import { isValidAudioFile } from '../../../controller/validation';
import Base from '../../core/Base'

import classes from './Profile.module.css'

const Profile = () => {

    
    const navigate = useNavigate();
  
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/',{replace: true})
        }
    },[])

    const [isDarkMode, setIsDarkMode] = useState(null); // this value doesnot matter, its value will be set from menu

    const setCurrentTheme = (isDarkMode) => {
        setIsDarkMode(isDarkMode)
    }


  return (
    <Base getTheme={setCurrentTheme} >
        <div className={classes.profileContainer}>
            <div className={classes.left}>
            </div>
            <div className={classes.right}>
                <h1>User's Profile</h1>
            </div>
        </div>
    </Base>
  )
}

export default Profile