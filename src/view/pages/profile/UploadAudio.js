import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import * as jsmediatags from 'jsmediatags/dist/jsmediatags.min.js';
// import Dropzone  from 'react-dropzone'

import { isValidAudioFile, isValidCoverPhoto } from '../../../controller/validation'
import Base from '../../core/Base'
import Loading from '../../core/Loading';

import classes from './UploadAudio.module.css'
import defaultCover from '../../../media/defaultCover.png'
import { getAllAudio, uploadAudio } from '../../../controller/audioApi';
import { isAuthenticated } from '../../../controller/commonApi';

const UploadAudio = () => {

    const navigate = useNavigate();
  
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/',{replace: true})
        }
    },[])

    const [values, setValues] = useState({
        audioFile: null, 
        audioFileError: false,
        coverPhoto: '',
        coverPhotoError: false,
        defaultCoverPhoto: '',
        defaultCoverPhotoError: false,
        artist: '',
        artistError: false,
        title: '',
        titleError: false,
        description: '',
        descriptionError: false,
        duration: 0,

        

        serverError: false,
        serverRequestSent: false,
    })
    
    useEffect(() => {
        
        if(values.defaultCoverPhoto==''){
            fetch(defaultCover)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = () => {
                const dataURI = reader.result;
                    // console.log(dataURI);
                    setValues({...values, defaultCoverPhoto: dataURI})
                };
                reader.readAsDataURL(blob);
            })
            .catch(err => {
                setValues({...values, defaultCoverPhotoError: 'Something went wrong, Please Refresh Page.'})
            })
        }

        
    },[])

    const serverErrorMessage = () => {
        return <div className={classes.errorMessage}>
        <span className={classes.errorText}>{values.serverError}</span>
      </div>
    }

    const coverPhotoErrorMessage = () => {
        return <div className={classes.errorMessage}>
        <span className={classes.errorText}>{values.coverPhotoError}</span>
      </div>
    }

    const audioFileErrorMessage = () => {
        return <div className={classes.errorMessage}>
        <span className={classes.errorText}>{values.audioFileError}</span>
      </div>
    }

    const handleAudioFileChange = (name)=> (event) => {
        const value = event.target.files[0];
        const validationResult = isValidAudioFile(value);

        if(!validationResult.success){
            setValues({...values, audioFile: null, audioFileError: validationResult.error});
        }
        else{
            // const newForm = new FormData();
            // newForm.set("photo",value);
            setValues({...values, audioFile: value, audioFileError: false});

            // get duration 
            // const reader = new FileReader();
            // reader.readAsArrayBuffer(value);
            // reader.onload = () => {
            //     const context = new AudioContext();
            //         context.decodeAudioData(reader.result, (buffer) => {
            //             const duration = buffer.duration;
            //             // console.log(duration);
            //             extractMetadata(value, {...values, audioFile: value, duration: duration, audioFileError: false});
            //         })
            //     }
                
            extractMetadata(value, {...values, audioFile: value, duration: 0, audioFileError: false});
        }
    }
    

    const extractMetadata = async (file, values) => {
        jsmediatags.read(file, {
            onSuccess: (tag) => {
                // console.log(tag);
                let dataURL = values.defaultCoverPhoto, artist='', title='';

                if (tag.tags.picture) {
                    dataURL = "data:" + tag.tags.picture.format + ";base64," + arrayBufferToBase64(tag.tags.picture.data);
                    // console.log(dataURL);
                }

                // const audioData = tag.audioData;

                if(tag.artist){
                    artist = tag.artist;
                    // console.log(tag.artist);
                }
                if(tag.tags.title){
                    title = tag.tags.title;
                    // console.log(tag.tags.title);
                }else{
                    title = values.audioFile.name;
                }

                setValues({...values, coverPhoto: dataURL, artist: artist, title: title})
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
    // console.log(values);

    const onSubmit = () => {
        if(!values.audioFile){
            console.log('invalid file');
            return;
        }
        else if(!values.title || values.title == ''){
            setValues({...values, titleError: "Title can't be empty"});
            window.scrollTo(0,0);
            return;
        }
        window.scrollTo(0,document.body.scrollHeight)
        setValues({...values, serverRequestSent: true, serverError: false});

        const newForm = new FormData();
        newForm.set("audioFile",values.audioFile);
        newForm.set('title', values.title)
        newForm.set('artist', values.artist)
        newForm.set('description', values.description)
        newForm.set('coverPhoto', values.coverPhoto)
        newForm.set('duration', values.duration)

        uploadAudio(newForm)
        .then(res => {
            if(res.success){
                // send to all audio page
                navigate('/allAudio', {replace: true})
            }
            else{
                setValues({...values, serverRequestSent: false, serverError: res.error})
            }
        })
        .catch(err => {
            console.log('Err');
            setValues({...values, serverRequestSent: false, serverError: 'Something went wrong, please retry!'})
        })
    }

    const handleChange = (name) => (e) => {
        setValues({...values, [name]: e.target.value,[`${name}Error`]: false, serverError: false});
    }

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        const isValidPhoto = isValidCoverPhoto(file);

        if(!isValidPhoto.success){
            setValues({...values, coverPhotoError: isValidPhoto.error})
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const dataURI = reader.result;
            setValues({...values, coverPhoto: dataURI})
        };

        reader.readAsDataURL(file);
    }

    // console.log(values)

  return (
    <Base>
        

        {values.audioFile?
            <div>
                <div className={classes.inputBox}>
                    <span className={classes.details}>Cover Photo
                    </span>
                    <div/>
                    <img className={classes.coverPhoto} src={values.coverPhoto}/>
                    <div className={classes.updateCover}>Update Cover Photo</div>
                    <input accept='.png, .jpg, .jpeg' onChange={handleCoverPhotoChange} className={classes.updateCover} type="file" id="photo" />
                    {values.coverPhotoError? coverPhotoErrorMessage(): <></>}
                </div>
                {/* <p>Cover Photo</p> */}



                <div className={classes.inputBox}>
                    <span className={classes.details}>Title
                    </span>
                    <input className={!values.titleError? classes.input: classes.invalidInput} type="text" value={values.title} onChange={handleChange('title')} placeholder="Title of this audio file." required/>
                    <small>{values.titleError? values.titleError: ''}</small>
                </div>

                <div className={classes.inputBox}>
                    <span className={classes.details}>Artist
                    </span>
                    <input className={!values.artistError? classes.input: classes.invalidInput} type="text" value={values.artist} onChange={handleChange('artist')} placeholder="Please provide artist's name" required/>
                    <small>{values.artistError? values.artistError: ''}</small>
                </div>

                <div className={classes.inputBox}>
                    <span className={classes.details}>Description
                    </span>
                    <input className={!values.descriptionError? classes.input: classes.invalidInput} type="text" value={values.description} onChange={handleChange('description')} placeholder="You can edit this title" required/>
                    <small>{values.descriptionError? values.descriptionError: ''}</small>
                </div>
                <button style={{marginBottom: '10px'}} className={!values.serverRequestSent? classes.retryButton: classes.retryButtonDisabled} onClick={onSubmit}>
                    Upload Audio
                </button>
                {values.serverError? serverErrorMessage(): <></>}
                <div style={!values.serverRequestSent? {visibility: 'hidden'}: {}}>
                    <Loading/>
                </div>
            </div> 
            :<>
                <h3 style={{textAlign: 'center'}}>Upload Audio</h3>
                <div style={{height: '50vh', width: '100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <input accept=".mp3" onChange={handleAudioFileChange('audio')} type='file' id="mp3File"/>
                    {/* <label htmlFor="mp3File" className="photo">Choose Audio File</label> */}
                </div>
                
                {values.audioFileError? audioFileErrorMessage(): <></>}
            </>
        }
    </Base>
  )
}


export default UploadAudio