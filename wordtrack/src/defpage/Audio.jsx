import React, { useState } from 'react';

const Audio = ({audioUrlSrc, pronunciationText}) => {
//   const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audioDiv = document.getElementById('audio-div');
    const audioURL = audioDiv.getAttribute('data-src-mp3');
    const audioElement = document.getElementById('audio');

    audioElement.src = audioURL;
    audioElement.play();

    // if (isPlaying) {
    //   audioElement.pause();
    // } else {
    //   audioElement.play();
    // }

    // setIsPlaying(!isPlaying);
  };

  return (
    <div>
   
      <div id="audio-div" data-src-mp3={audioUrlSrc}></div>
      <audio id="audio"></audio>
      {/* <button onClick={playAudio}>{isPlaying ? 'Pause' : 'Play'}</button> */}
      <button onClick={playAudio}>Pronounce</button>     {pronunciationText} 
      {/* {audioUrlSrc} */}
    </div>
  );
};

export default Audio;
