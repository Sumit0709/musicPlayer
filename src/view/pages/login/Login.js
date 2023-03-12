import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { login, register } from '../../../controller/authApi'
import { authenticate, isAuthenticated } from '../../../controller/commonApi'
import { validEmail, validName, validPassword, validUserName } from '../../../controller/validation'
import Base from '../../core/Base'
import Loading from '../../core/Loading'

import classes from '../register/Register.css'
// CSS is same as register's, so we will not create separate css file
const Login = () => {

    const navigate = useNavigate();
  
    useEffect(() => {
        if(isAuthenticated()){
            navigate('/allAudio',{replace: true})
        }
    },[])

    const [values, setValues] = useState({
        email: '',
        emailError: false,
        password: '',
        passwordError: false,

        serverRequestSent: false,
        serverError: false,
    })

    const mandatoryField = () => {
        return <span style={{color: '#71b8e7', fontWeight:600, fontSize:'1.1rem'}}>*</span>
    }

    const serverErrorMessage = () => {
        return <div className="errorMessage">
        <span className="errorText">{values.serverError}</span>
      </div>
    }

    const handleChange = (name) => (e) => {
        setValues({...values, [name]: e.target.value, [`${name}Error`]: false, serverError: false});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({...values, serverError: false, serverRequestSent: true});

        let errors = {};
        let errorFound = false;

        if(!validEmail(values.email)){
            errors = {...errors, emailError: 'Invalid email id!'}
            errorFound = true;
        }
        if(!validPassword(values.password)){
            errors ={...errors, passwordError: 'Invalid Password!'}
            errorFound = true;
        }

        if(errorFound){
            setValues({...values, ...errors})
            window.scrollTo(0,0);
            return;
        }
        // scroll to bottom to show loading animation
        window.scrollTo(0,document.body.scrollHeight);
        login({
            email: values.email,
            password: values.password,
        })
        .then(response => {
            
            if(response.success){
                console.log(response.message)
                authenticate({'userId': response.userId, 'token': response.token}, ()=>{
                    // redirect to all audio Page
                    navigate('/allAudio', {replace: true})
                    setValues({...values, serverError: false, serverRequestSent: false})
                })
                
            }
            else{
                console.log(response.error)
                setValues({...values, serverError: response.error, serverRequestSent: false})
            }
        })
        .catch(err => {
            setValues({...values, serverError: 'Something went wrong! Please retry', serverRequestSent: false})
        })
        


    }
  return (
    <Base>
        <div>
            <div className="container">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit}>
                    <div className="user_details">
                        
                        
                        <div className="input_box">
                            <span className="datails">Email{mandatoryField()}</span>
                            <input className={!values.emailError? 'input': 'invalidInput'} type="email" value={values.email} onChange={handleChange('email')} placeholder="Enter your Email..." required/>
                            <small>{values.emailError? values.emailError: ''}</small>
                        </div>
                        <div className="input_box">
                            <span className="datails">Password{mandatoryField()}</span>
                            <input className={!values.passwordError? 'input': 'invalidInput'} type="password" value={values.password} onChange={handleChange('password')} placeholder="Enter your Password..." required/>
                            <small>{values.passwordError? values.passwordError: ''}</small>
                        </div>
                    </div>

                    <div className="button">
                        <input disabled={values.serverRequestSent} className={values.serverRequestSent? 'btnDisabled': 'btnActive'} type="submit" value="Login"/>
                    </div>
                    {values.serverError? serverErrorMessage(): <></>}
                    
                    <div style={!values.serverRequestSent? {visibility: 'hidden'}: {}}>
                        <Loading/>
                    </div>
                </form>
            </div>
        </div>
    </Base>
  )
}

export default Login