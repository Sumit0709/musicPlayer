import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";

import classes from './AudioPreview.module.css'

import likedSvg from '../../../media/liked.svg'
import notLikedForDarkSvg from '../../../media/notLikedDark.svg'
import notLikedForLightSvg from '../../../media/notLikedLight.svg'
import deleteForLightPng from '../../../media/deleteForLight.png'
import deleteForDarkPng from '../../../media/deleteForDark.png'

import loadingForLightPng from '../../../media/loadingForLight.png'
import loadingForDarkPng from '../../../media/loadingForDark.png'

import { deleteAudio, updateLikedStatusOfAudio } from '../../../controller/audioApi'
import Loading from '../../core/Loading';

const AudioPreview = ({audioId, title,artist, description, isLikedProps,isDarkMode}) => {
    // console.log(audioId)
    const [isLiked, setIsLiked] = useState(isLikedProps);
    
    const [values, setValues] = useState({
        
        serverRequestSentToDelete: false,
        deletionServerError: false,
    })
    const navigate = useNavigate();

    const onChangeLike = () => {
        updateLikedStatusOfAudio(audioId, {isLiked: !isLiked})
            .then(res => {
                if(res.success){
                    setIsLiked(prevValue => !prevValue)
                }
                else{
                    console.log('Error in updating liked status')
                    console.log(res.error)
                }
            })
            .catch(err => {
                console.log('Error in updating liked status, CATCH')
                console.log(err.message)
            })
    }


    const openPlayer = () => {
        navigate('/player', {state: {audioId: audioId, artist: artist, title: title, description: description}})
    }

    // const playForDark = () => {
    //     return (
    //         <div onClick={onPlay} style={{minHeight:"30px", minWidth:"30px", backgroundImage: `url(${likedSvg})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
    //     )
    // }

    const liked = () => {
        return (
            <div className={classes.hoverLiked} onClick={onChangeLike} style={{marginRight: '10px',minHeight:"30px", minWidth:"30px", backgroundImage: `url(${likedSvg})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const notLikedForDark = () => {
        return (
            <div className={classes.hoverLiked} onClick={onChangeLike} style={{ marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${notLikedForDarkSvg})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const notLikedForLight = () => {
        return (
            <div className={classes.hoverLiked} onClick={onChangeLike} style={{marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${notLikedForLightSvg})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }

    const deleteForLight = () => {
        return (
            <div className={classes.hoverLiked} onClick={onDeleteAudio} style={{marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${deleteForLightPng})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const deleteForDark = () => {
        return (
            <div className={classes.hoverLiked} onClick={onDeleteAudio} style={{marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${deleteForDarkPng})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }

    const loadingForLight = () => {
        return (
            <div className={classes.hoverLiked} style={{marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${loadingForLightPng})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }
    const loadingForDark = () => {
        return (
            <div className={classes.hoverLiked} style={{marginRight: '10px', minHeight:"30px", minWidth:"30px", backgroundImage: `url(${loadingForDarkPng})`, backgroundSize:'contain', backgroundRepeat:"no-repeat", backgroundPosition:"center"}}></div>
        )
    }

    const onDeleteAudio = () => {
        setValues({...values, serverRequestSentToDelete: true, deletionServerError: false})
        deleteAudio(audioId)
            .then(res => {
                if(res.success){
                    reload();
                    // setValues({...values, serverRequestSentToDelete: false, deletionServerError: false})
                }
                else{
                    setValues({...values, serverRequestSentToDelete: false, deletionServerError: res.error})
                }
            })
            .catch(err => {
                console.log(err);
                setValues({...values, serverRequestSentToDelete: false, deletionServerError: 'something went wrong!'})
            })
    }

    const notDeletedMessage = () => {
        return <div style={{marginTop: '50px'}} className="errorMessage">
        <span className="errorText">{values.deletionServerError}</span>
      </div>
    }

    const successfullyDeletedMessage = () => {
        return <div style={{marginTop: '50px'}} className="errorMessage">
        <span className="errorText">{'Audio Deleted Successfully'}</span>
      </div>
    }

    const reload = () => {
        window.location.reload();
    }
  return (
    <div className={classes.container}>
        {
            isLiked? liked() :
                isDarkMode? notLikedForDark() : notLikedForLight()
        }
        <div onClick={openPlayer} className={classes.titleAndArtist}>{`${title} ${artist? `by ${artist}`: ''}`}</div>
        <div>{
            values.serverRequestSentToDelete? 
            isDarkMode? loadingForDark() : loadingForLight()
             :
            isDarkMode? deleteForDark() : deleteForLight()
        }</div>
        
    </div>
  )
}

export default AudioPreview