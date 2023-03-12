import React, { useState } from 'react'
import classes from './Base.module.css'
import Menu from './Menu';

const Base = ({getTheme ,children}) => {

  const [isDarkMode, setIsDarkMode] = useState(null); // this value doesnot matter, its value will be set from menu
  const handleThemeChange = (isDarkMode) => {
    if(getTheme){
      getTheme(isDarkMode)
    }
    setIsDarkMode(isDarkMode)
  }

  return (
    <div className={isDarkMode? classes.darkMode: classes.lightMode}>
      <div className={classes.base}>
        <Menu onThemeChange={handleThemeChange}/>
        {children}
      </div>
    </div>
  )
}

export default Base;