import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateAudioList } from '../../../store/allAudioListSlice'

import { getAllAudio } from '../../../controller/audioApi';
import Base from '../../core/Base'
import Loading from '../../core/Loading';
import NewMusicPlayer from '../player/NewMusicPlayer';

import classes from './AllAudios.module.css'
import AudioPreview from './AudioPreview';
import { isAuthenticated } from '../../../controller/commonApi';

const AllAudio = () => {

    // const allAudioList = useSelector((state) => state.allAudioList.audioList)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const {userId} = isAuthenticated();

    // console.log(allAudioList);
  
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/',{replace: true})
        }
    },[])


    const [values, setValues] = useState({
        allAudios: false,
        allAudiosError: false,

        audioIdList: [],
        currentPlayingId: 1,

        serverRequestSent: true,
        serverError: false,

    })

    const [isDarkMode, setIsDarkMode] = useState(true)

    const onGetAllAudios = () => {
        getAllAudio(userId).then(res => {
            if(res.success){
                

                let newAudioIdList = [];
                const len = res.audios.length;

                for(let i=0; i<len; i++){
                    newAudioIdList = [...newAudioIdList, res.audios[i].audioId];
                    // newAudioIdList = [...newAudioIdList, res.audios[i].audioId];
                }
                // console.log(res.audios)
                // console.log(newAudioIdList);
                dispatch(updateAudioList({audios: res.audios, numberOfAudios: len}));
                setValues({...values, allAudios: res.audios, audioIdList: newAudioIdList, serverRequestSent: false, serverError: false})
            }else{
                
                setValues({...values, allAudios: false, serverRequestSent: false, serverError: res.error})
            }
            // console.log(res.audios);
        })
        .catch(err => {
            setValues({...values, allAudios: false, serverRequestSent: false, serverError: 'Something went wrong! Please retry.'})
        })
    }

    useEffect(() => {
        onGetAllAudios()
    },[])


    const retryToFetchAllAudios = () => {
        setValues({...values, serverRequestSent: true, serverError: false})
        onGetAllAudios()
    }

    const goToUploadSong = () => {
        navigate('/new/audio')
    }


    const serverErrorMessage = () => {
        return <div style={{marginTop: '50px'}} className="errorMessage">
        <span className="errorText">{values.serverError}</span>
      </div>
    }

    const noAudioMessage = () => {
        return <div className={classes.noAudioMessage}>
        <span className={classes.noAudioText}>{"You have not uploaded any song. Go and upload your first song now."}</span>
      </div>
    }

    const getCurrentTheme = (isDarkMode) => {
        setIsDarkMode(isDarkMode)
    }

    const onUploadAudio = () => {
        navigate('/new/audio')
    }

    // console.log(values.allAudios)

  return (
    <Base getTheme={getCurrentTheme}>
        {
            values.serverRequestSent? <Loading/>
            :
            <div>
            {values.serverError? 
                <>
                    {serverErrorMessage()}
                    <button className={!values.serverRequestSent? classes.retryButton: classes.retryButtonDisabled} onClick={retryToFetchAllAudios}>
                        Retry
                    </button>
                </> 
                :
                <>
                    {
                        values.allAudios.length? 
                        <div className={classes.allAudioContainer}>
                            <div className={classes.heading}>
                                <h2>Your Uploaded Audio List</h2>
                                <button className={classes.uploadAudio} onClick={onUploadAudio}>
                                    New Audio
                                </button>
                            </div>
                            {values.allAudios.map((audio,index) => {
                                return (
                                    <div key={index} style={isDarkMode? {padding: '15px', margin:'10px', marginLeft:'0px', borderRadius: '4px', backgroundColor: '#4e4e54'}: {padding: '15px', margin:'10px', marginLeft:'0px', borderRadius: '4px', backgroundColor: '#eee'}}>
                                        <AudioPreview audioId={audio.audioId} title={audio.title} artist={audio.artist} description={audio.description} isLikedProps={audio.isLiked} isDarkMode={isDarkMode}/>
                                    </div>
                                )
                            })}
                            
                            <NewMusicPlayer />

                        </div>
                        :
                        <>
                            {noAudioMessage()}
                            <button className={!values.serverRequestSent? classes.retryButton: classes.retryButtonDisabled} onClick={goToUploadSong}>
                                Upload Your First Song
                            </button>
                        </>
                    }
                </>
            }
            </div>
        }
    </Base>
  )
}

export default AllAudio