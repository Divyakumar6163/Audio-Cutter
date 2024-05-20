"use client";

import React, { useState, useRef, useEffect } from "react";

const AudioManipulation = () => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const waveformRef = useRef(null);
  const fileInputRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [downloadLink, setDownloadLink] = useState(null);

  useEffect(() => {
    const initWaveSurfer = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;

      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ddd",
        progressColor: "#9b59b6",
        backend: "MediaElement",
      });

      ws.on("ready", () => {
        setEnd(ws.getDuration());
      });

      setWavesurfer(ws);
    };

    initWaveSurfer();

    return () => {
      if (wavesurfer) wavesurfer.destroy();
    };
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      wavesurfer.load(url);
    }
  };

  const handleCut = () => {
    if (!wavesurfer) return;

    const startTime = parseFloat(start);
    const endTime = parseFloat(end);

    if (startTime >= 0 && endTime > startTime) {
      const originalBuffer = wavesurfer.backend.buffer;
      const length = endTime - startTime;
      const sampleRate = originalBuffer.sampleRate;
      const numOfChannels = originalBuffer.numberOfChannels;
      const newBuffer = wavesurfer.backend.ac.createBuffer(
        numOfChannels,
        sampleRate * length,
        sampleRate
      );

      for (let i = 0; i < numOfChannels; i++) {
        const oldData = originalBuffer.getChannelData(i);
        const newData = newBuffer.getChannelData(i);
        newData.set(
          oldData.subarray(startTime * sampleRate, endTime * sampleRate)
        );
      }

      wavesurfer.loadDecodedBuffer(newBuffer);

      // Create a download link for the edited audio
      const audioBlob = bufferToWave(newBuffer);
      const url = URL.createObjectURL(audioBlob);
      setDownloadLink(url);
    }
  };

  const handlePlayPause = () => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
    } else {
      wavesurfer.play();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Utility function to convert an AudioBuffer to a WAV Blob
  const bufferToWave = (buffer) => {
    const numOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length * numOfChannels * 2 + 44;
    const output = new DataView(new ArrayBuffer(length));
    let offset = 0;

    const writeString = (s) => {
      for (let i = 0; i < s.length; i++) {
        output.setUint8(offset + i, s.charCodeAt(i));
      }
    };

    const writeInt16 = (data, value) => {
      output.setInt16(data, value, true);
    };

    // Write WAV header
    writeString("RIFF");
    output.setUint32(4, 36 + buffer.length * 2, true);
    writeString("WAVE");
    writeString("fmt ");
    output.setUint32(16, 16, true);
    output.setUint16(20, 1, true);
    output.setUint16(22, numOfChannels, true);
    output.setUint32(24, sampleRate, true);
    output.setUint32(28, sampleRate * numOfChannels * 2, true);
    output.setUint16(32, numOfChannels * 2, true);
    output.setUint16(34, 16, true);
    writeString("data");
    output.setUint32(40, buffer.length * numOfChannels * 2, true);

    // Write audio data
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, buffer.getChannelData(channel)[i])
        );
        output.setInt16(
          44 + i * 4 + channel * 2,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
      }
    }

    return new Blob([output], { type: "audio/wav" });
  };

  return (
    <div>
      <button onClick={triggerFileInput}>Browse File</button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <div
        ref={waveformRef}
        style={{ width: "100%", height: "128px", backgroundColor: "#1a1a1a" }}
      ></div>
      <div>
        <label>
          Start:
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            step="0.1"
            min="0"
            max={end}
          />
        </label>
        <label>
          End:
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            step="0.1"
            min={start}
            max={wavesurfer?.getDuration() || 0}
          />
        </label>
        <button onClick={handleCut}>Cut</button>
        <button onClick={handlePlayPause}>
          {wavesurfer && wavesurfer.isPlaying() ? "Pause" : "Play"}
        </button>
        {downloadLink && (
          <button>
            <a href={downloadLink} download="edited-audio.wav">
              Download Edited Audio
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioManipulation;
