import React, { useState } from "react";

const Audio = ({ audioUrlSrc, pronunciationText }) => {
  //   const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audioDiv = document.getElementById("audio-div");
    const audioURL = audioDiv.getAttribute("data-src-mp3");
    const audioElement = document.getElementById("audio");

    audioElement.src = audioURL;
    var promise = audioElement.play();

    // Handle promise rejection to cyprus can test.
    if (promise !== undefined) {
      promise.catch(error => {
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
      }).then(() => {
          // Auto-play started
      });
  }

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
      <button onClick={playAudio} data-cy="btn-definition-pronouce" >Pronounce</button> {pronunciationText}
      {/* {audioUrlSrc} */}
    </div>
  );
};

export default Audio;
