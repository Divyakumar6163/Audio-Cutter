"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const AudioCutter = () => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const waveformRef = useRef(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wavesurfer.js").then((WaveSurfer) => {
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

        return () => ws.destroy();
      });
    }
  }, []);

  const handleFileSelect = (file) => {
    const url = URL.createObjectURL(file);
    wavesurfer.load(url);
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
    }
  };

  return (
    <div>
      <Button onFileSelect={handleFileSelect} />
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
        <button onClick={handleCut} style={buttonStyle}>
          Cut
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#9b59b6",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
};

export default AudioCutter;
