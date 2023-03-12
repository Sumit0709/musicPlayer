import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import classes from './Menu.module.css'

import { isAuthenticated } from '../../controller/commonApi'

import moonDarkTheme from '../../media/moonDark.png'
import sunLightTheme from '../../media/sunLight.svg'

import logoutForDark from '../../media/logoutForDark.png'
import logoutForLight from '../../media/logoutForLight.png'
import { logout } from '../../controller/authApi'

const Menu = ({onThemeChange}) => {

    const loggedIn = isAuthenticated();
    const [isDarkMode, setIsDarkMode] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        onThemeChange(isDarkMode);
    },[])
    
    const handleThemeChange = () => {
        onThemeChange(!isDarkMode);
        setIsDarkMode(!isDarkMode);
    }

    const  onLogin = () => {
        navigate('/login')
    }
    const onRegister = () => {
        navigate('/register')
    }
    const onProfile = () => {
        navigate('/profile')
    }

    const darkTheme = () => {
        return (
            <div className={classes.hoverTheme} onClick={handleThemeChange} style={{minHeight:"30px", minWidth:"30px", backgroundImage: `url(${moonDarkTheme})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const lightTheme = () => {
        return (
            <div className={classes.hoverTheme} onClick={handleThemeChange} style={{minHeight:"30px", minWidth:"30px", backgroundImage: `url(${sunLightTheme})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }


    const logoutForDarkTheme = () => {
        return (
            <div className={classes.hoverTheme} onClick={onLogout} style={{minHeight:"30px", minWidth:"30px", backgroundImage: `url(${logoutForDark})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const logoutForLightTheme = () => {
        return (
            <div className={classes.hoverTheme} onClick={onLogout} style={{minHeight:"30px", minWidth:"30px", backgroundImage: `url(${logoutForLight})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }

    const onUploadAudio = () => {
        navigate('/new/audio')
    }

    const onLogout = () => {
        console.log('logout');
        logout()
            .then(res => {
                if(res.success){
                    // successfully logout done
                    navigate('/', {replace: true});
                }
                else{
                    console.log('Something went wrong');
                }
            })
            .catch(err => {
                console.log('Something went wrong');
            })
    }

  return (
    <div>
    <div className={classes.menu}>
        <div className={classes.menuLeft}>
            {!loggedIn? 
                <>
                    <span className={classes.hoverTheme} onClick={onLogin}>Login / </span>
                    <span className={classes.hoverTheme} onClick={onRegister}>Register</span>
                </>
                :
                isDarkMode? logoutForDarkTheme() : logoutForLightTheme()
                // <button className={classes.uploadAudio} onClick={onUploadAudio}>
                //     New Audio
                // </button>
            }
        </div>
        <div className={classes.menuRight}>
            <div onClick={handleThemeChange} >
                {isDarkMode? darkTheme() : lightTheme()}
            </div>         
        </div>
    </div>
    {/* <hr/> */}
    </div>
  )
}

export default Menu;