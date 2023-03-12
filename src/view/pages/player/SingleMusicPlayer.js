import AudioPlayer from 'react-modern-audio-player';
import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Base from '../../core/Base';
import { isAuthenticated } from '../../../controller/commonApi';
// import classes from './SingleMusicPlayer.module.css';

const SingleMusicPlayer = ({audioId, currPlayId = 1}) => {

  const {userId} = isAuthenticated();

    const playList = [
        {
          name: '',
          writer: '',
          img: `${process.env.REACT_APP_SERVER_API}/getCoverPhoto/${userId}/${audioId}`,
          src: `${process.env.REACT_APP_SERVER_API}/getAudio/${userId}/${audioId}`,
          id: 1,
        }
      ]

    //   console.log(playList)

  return (
    <div>
      <AudioPlayer

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
          player: "bottom-left",
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


export default SingleMusicPlayer;