import AudioPlayer from 'react-modern-audio-player';
import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Base from '../../core/Base';
import classes from './NewMusicPlayer.module.css';
import { isAuthenticated } from '../../../controller/commonApi';

const NewMusicPlayer = ({currPlayId = 1}) => {

    const playerRef = useRef(null);
    // console.log(AudioPlayer.name)

    // useEffect(() => {

    //     playerRef.current.addEventListener('pause', () => {
    //         console.log('Pause')
    //     })

    //     // playerRef.current.src;

    //     console.log(playerRef)
    //     console.log(playerRef.current.attributes[0])
    //     // playerRef.current.autoPlay? console.log('AutoPlay'): console.log('Not AutoPlay');
    //     // playerRef.current.autoPlay = false
    //     // // console.log(playerRef.current)
    //     // playerRef.current.onEnded = () => {
    //     //     console.log('ENDED')
    //     // }
    //     // console.log(playerRef.current.src)
    // },[playerRef.current?.autoPlay])

    const {userId} = isAuthenticated();

    const allAudioList = useSelector((state) => state.allAudioList)

    const numberofSongs = allAudioList.numberOfAudios;
    let playList = [];

    for(let i=0; i<numberofSongs; i++){
        const audioId = allAudioList.audioList[i].audioId;
        playList = [...playList, {
            img: `${process.env.REACT_APP_SERVER_API}/getCoverPhoto/${userId}/${audioId}`,
            src: `${process.env.REACT_APP_SERVER_API}/getAudio/${userId}/${audioId}`,
            id: i+1,
            name: '',
            writer: '',
        }]
    };

    // console.log(playList);


    // const playList = [
    //     {
    //       name: '',
    //       writer: '',
    //       img: coverPhotoSrc, 
    //     //   'https://i.pinimg.com/736x/bd/7c/02/bd7c023464c09a677651d5204b6dd6b6--black-and-white-cover-photos-facebook-twitter-header-black-and-white.jpg',
    //       src: audioSrc,
    //       id: 1,
    //     },
    //     {
    //         name: 'Album',
    //         writer: 'Artist Sumit',
    //         img: coverPhotoSrc, 
    //       //   'https://i.pinimg.com/736x/bd/7c/02/bd7c023464c09a677651d5204b6dd6b6--black-and-white-cover-photos-facebook-twitter-header-black-and-white.jpg',
    //         src: audioSrc,
    //         id: 2,
    //       },
    //       {
    //         name: 'Album',
    //         writer: 'Artist Sumit',
    //         img: coverPhotoSrc, 
    //       //   'https://i.pinimg.com/736x/bd/7c/02/bd7c023464c09a677651d5204b6dd6b6--black-and-white-cover-photos-facebook-twitter-header-black-and-white.jpg',
    //         src: audioSrc,
    //         id: 3,
    //       },
    //   ]

      // console.log(playList)

      const pauseAudio = () => {
        playerRef.current.play();
      }
  return (
    <div className={classes.playerContainer}>
      <AudioPlayer
        audioRef={playerRef}
        // mainColor =
        // cssModule={classes}
        playList={playList}
        audioInitialState={{
          muted: false,
          volume: 0.8,
          curPlayId: currPlayId,
        }}
        coverImgsCss = {
            {backgroundColor: 'red', borderRadius: '40px'}
        }
        placement={{
          interface: {
            templateArea: {

                // artwork: "row1-5",
                // playList: "row1-7",
                // trackInfo: "row2-2",
                // trackTimeCurrent: "row3-1",
                // progress: "row3-2",
                // trackTimeDuration: "row3-3",
                // playButton: "row4-2",
                // repeatType: "row4-1",
                // volume: "row4-3"

                artwork: 'row1-1',
                trackInfo: 'row1-2',
                trackTimeCurrent: 'row1-4',
              trackTimeDuration: "row1-6",
              progress: "row1-5",
              playButton: "row1-3",
              repeatType: "row1-7",
              volume: "row1-8",
            },
          },
          player: "bottom",
          volumeSlider: 'top',
          playList: 'top'
        }}
        activeUI={{
          all: true,
          progress: "bar",
        }}

        rootContainerProps={{
            colorScheme: 'dark',
            // width
          }}
      />
    </div>
  );
}


export default NewMusicPlayer;