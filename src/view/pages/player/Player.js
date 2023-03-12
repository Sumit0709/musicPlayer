import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getAudio, getCoverPhoto } from '../../../controller/audioApi'
import Base from '../../core/Base'
import Loading from '../../core/Loading';
import MusicPlayer from './MusicPlayer';
import NewMusicPlayer from './NewMusicPlayer';

import classes from './Player.module.css'
import SingleMusicPlayer from './SingleMusicPlayer';
import { isAuthenticated } from '../../../controller/commonApi'

const Player = () => {

    const {userId} = isAuthenticated();
    const allAudioList = useSelector((state) => state.allAudioList)
    
    useEffect(() => {
        console.log(allAudioList)
    },[])

    const location = useLocation();
    // const availableAudios = allAudioList.audi
    // TO DO
    console.log(location.state);

    const {audioId} = location.state? location.state :{audioId: '640cf5e8981d57646ad9a874'};
    const {title} = location.state? (location.state.title? location.state: '') : ''; 
    const {artist} = location.state? location.state.artist? location.state: '' : ''; 
    const {description} = location.state? location.state.description? location.state: '' : ''; 

    // console.log(location.state.title, artist);

    const [values, setValues] = useState({
        coverPhotoUrl: false,
    })

    const [audioData, setAudioData] = useState([])
    const [audioUrl, setAudioUrl] = useState({
        url: false,
        data: []
    })

    const onGetAudio = () => {
        getAudio(audioId)
        .then(result => {
            if(result.success){
                console.log(result.blob)

                // const audioURL = URL.createObjectURL(result.blob);
                // setAudioUrl({url: audioURL})
                // setAudioData((prevData) => [...prevData, blob]);
                appendBlobs([...audioData, result.blob])
            }
        })
    }

    const appendBlobs = (newAudioData) => {
        const audioBlob = new Blob(newAudioData, { type: 'audio/mpeg' });

        console.log('Concatenated audio blob size:', audioBlob.size);
        console.log('Concatenated audio blob type:', audioBlob.type);

        console.log(audioBlob);
        // create a URL for the audio blob
        const audioURL = URL.createObjectURL(audioBlob);
        console.log(audioURL);
        setAudioUrl({...values, url:audioURL, data: newAudioData});
    }

    const getCover = () => {
        getCoverPhoto(audioId)
        .then(result => {
            if(result.success){
                console.log(result);
                setValues({coverPhotoUrl: result.coverPhoto});
            }else{

            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        // onGetAudio()
        // getCover();
    },[])


    // https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
  return (
    <Base>
        { true? 
        <div>
            <div className={classes.playerContainer}>
                <div className={classes.rotatingContainer}>
                    <img className={classes.rotatingCover} style={{}} src={`${process.env.REACT_APP_SERVER_API}/getCoverPhoto/${userId}/${audioId}`}/>
                </div>

                <div className={classes.details}>
                    {/* <span>Title:</span> */}
                    <div className={`${classes.title} ${classes.elipses}`}>{title}</div>
                    {/* <div/> */}
                    {/* <span>Artist:</span> */}
                    <div className={`${classes.artist} ${classes.elipses}`}>{artist}</div>
                    <div className={`${classes.description}`}>{description}</div>
                </div>
            </div>

            {/* TO DO */}
            <SingleMusicPlayer audioId={audioId} />
            {/* <NewMusicPlayer audioIdList={values.audioIdList}  currPlayId={values.currentPlayingId}  /> */}
        </div>
        : <Loading/>
        }

    </Base>
  )
}

export default Player