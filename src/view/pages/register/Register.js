import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { register } from '../../../controller/authApi'
import { isAuthenticated } from '../../../controller/commonApi';
import { validEmail, validName, validPassword, validUserName } from '../../../controller/validation'
import Base from '../../core/Base'
import Loading from '../../core/Loading'

import classes from './Register.css'

const Register = () => {

    const navigate = useNavigate();
  
    useEffect(() => {
        if(isAuthenticated()){
            navigate('/allAudio',{replace: true})
        }
    },[])

    const [values, setValues] = useState({
        name: '',
        nameError: false,
        userName: '',
        userNameError: false,
        email: '',
        emailError: false,
        password: '',
        passwordError: false,
        confirmPassword: '',
        confirmPasswordError: false,

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

        if(!validName(values.name)){
            errors = {...errors, nameError: 'Name should be a combination of 3 to 40 alphabates and spaces.'}
            errorFound = true;
        }
        if(!validUserName(values.userName)){
            errors = {...errors, userNameError: 'User Name should be a combination of 2-30 alphabates, numbers and underscore(_)'}
            errorFound = true;
        }
        if(!validEmail(values.email)){
            errors = {...errors, emailError: 'Invalid email id!'}
            errorFound = true;
        }
        if(!validPassword(values.password)){
            errors ={...errors, passwordError: 'Invalid Password!'}
            errorFound = true;
        }
        if(!(values.password === values.confirmPassword)){
            errors = {...errors, confirmPasswordError: 'Confirm password should match password'}
            errorFound = true;
        }

        if(errorFound){
            setValues({...values, ...errors})
            window.scrollTo(0,0);
            return;
        }
        // scroll to bottom to show loading animation
        window.scrollTo(0,document.body.scrollHeight);
        register({
            name: values.name,
            userName: values.userName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
        .then(response => {
            if(response.success){
                // navigate to login page
                navigate('/login', {replace: true})
                console.log(response.message)
                setValues({...values, serverError: false, serverRequestSent: false})
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
                <div className="title">Registation</div>
                <form onSubmit={handleSubmit}>
                    <div className="user_details">
                        <div className="input_box">
                            <span className="datails">Full Name{mandatoryField()}</span>
                            <input className={!values.nameError? 'input': 'invalidInput'} type="text" value={values.name} onChange={handleChange('name')} placeholder="Enter your full name..." required/>
                            <small>{values.nameError? values.nameError: ''}</small>
                        </div>
                        <div className="input_box">
                            <span className="datails">Username
                                {mandatoryField()} 
                                <small style={{color: '#71b8e7'}}>(It should be unique)</small>
                            </span>
                            <input className={!values.userNameError? 'input': 'invalidInput'} type="text" value={values.userName} onChange={handleChange('userName')} placeholder="choose a unique user name..." required/>
                            <small>{values.userNameError? values.userNameError: ''}</small>
                        </div>
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
                        <div className="input_box">
                            <span className="datails">Confirm Password{mandatoryField()}</span>
                            <input className={!values.confirmPasswordError? 'input': 'invalidInput'} type="password" value={values.confirmPassword} onChange={handleChange('confirmPassword')} placeholder="Confirm your Password..." required/>
                            <small>{values.confirmPasswordError? values.confirmPasswordError: ''}</small>
                        </div>
                    </div>
                    <div>
                        <h5>NOTE: </h5>
                        <ul style={{ listStyleType: "disc" }}>
                            <li>{`-> Fields marked with `}{mandatoryField()}{` are mandatory.`}</li>
                            <li>{`-> Password should be a combination of atleast six numbers, letters and special characters (such as @ . ! &)`}</li>
                        </ul>
                    </div>

                    <div className="button">
                        <input disabled={values.serverRequestSent} className={values.serverRequestSent? 'btnDisabled': 'btnActive'} type="submit" value="Register"/>
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

export default Register