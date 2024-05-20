import React, { useState, useRef } from "react";
import Crunker from "crunker";

const AudioManipulation = () => {
  const [audioURL, setAudioURL] = useState("");
  const audioRef = useRef(null);
  const crunker = new Crunker();

  const start = () => {
    audioRef.current.currentTime = 0;
  };

  const end = () => {
    audioRef.current.currentTime = audioRef.current.duration;
  };

  const play = () => {
    audioRef.current.play();
  };

  const pause = () => {
    audioRef.current.pause();
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "audio.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const cut = async () => {
    const startTime = 0; // Example start time
    const endTime = 10; // Example end time
    const buffer = await crunker.cut(audioURL, startTime, endTime);
    const blob = new Blob([buffer]);
    setAudioURL(URL.createObjectURL(blob));
  };

  const remove = () => {
    setAudioURL("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer]);
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <audio controls ref={audioRef}>
        <source src={audioURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={end}>End</button>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={download}>Download</button>
        <button onClick={cut}>Cut</button>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  );
};

export default AudioManipulation;
