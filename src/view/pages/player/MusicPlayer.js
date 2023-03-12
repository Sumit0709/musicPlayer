// import React, { useState, useEffect, useRef } from 'react';

// const MusicPlayer = ({ src }) => {
//   const [audioSource, setAudioSource] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentRange, setCurrentRange] = useState(null);
//   const audioRef = useRef(null);
// // console.log(currentRange);

//   const fetchAudio = async (range = null) => {
//     const headers = range ? { 'Range': `bytes=${range.start}-${range.end}` } : {};
//     const response = await fetch(src, { headers });
//     if (response.ok) {
//       const data = await response.blob();
//       if (range) {
//         setCurrentRange(range);
//         setAudioSource(prevSource => prevSource ? new Blob([prevSource, data]) : data);
//       } else {
//         setAudioSource(data);
//       }
//     } else {
//       console.error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
//     }
//   };

//   const handlePlay = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(prevIsPlaying => !prevIsPlaying);
//   };

//   useEffect(() => {
//     fetchAudio();
//   }, [src]);

//   useEffect(() => {
//     if (audioSource) {
//       const objectUrl = URL.createObjectURL(audioSource);
//       audioRef.current.src = objectUrl;
//       setIsPlaying(true);
//     }
//   }, [audioSource]);

//   const handleTimeUpdate = () => {
//     if (audioRef.current.buffered.length > 0) {
//       const range = {
//         start: audioRef.current.buffered.start(0),
//         end: audioRef.current.buffered.end(0)
//       };
//       console.log(range == currentRange);
//       console.log(audioRef.current.duration);
//       if (!currentRange || range.start > currentRange.end) {
//         fetchAudio(range);
//       }
//     }
//   };
// //   console.log(audioRef.current.buffered);
  
//   return (
//     <>
//       <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handlePlay} />
//       <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
//     </>
//   );
// };

// export default MusicPlayer;












import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({ src, title }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    audioElement.addEventListener('loadeddata', handleLoadedData);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    console.log(src);

    if (isPlaying) {
        // audioRef.onCanPlay(() => {
        //     console.log('Audio')
        // })
      audioRef.current.pause();
    } else {
        if(isPlayable){
            console.log('Playable')
            audioRef.current.play();
        }
        else{
            console.log('Not Playable')
        }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (event) => {
    audioRef.current.currentTime = event.target.value;
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const audioIsPlayable = () => {
    setIsPlayable(true);
    // audioRef.current.play();
    // setIsPlaying(!isPlaying);
  }

  const audioError = () => {
    setIsPlayable(false);
    // audioRef.current.pause();
    // setIsPlaying(!isPlaying);
  }

  return (
    <div>
      <h2>{title}</h2>
      <audio style={{width: '100%'}} src={src} ref={audioRef} onCanPlay={audioIsPlayable} onError={audioError} autoPlay/>
      <div>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <div>{formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default MusicPlayer;
