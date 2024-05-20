"use-client";
// import { useState } from "react";
import style from "./inputPage.module.css";
import Button from "./Button";
// import AudioFile from "./audioFile";
import AudioCutter from "./audioCutter";
export default function InputPage() {
  // const [fileSelect, onFileSelect] = useState(null);
  return (
    <section className={style.section}>
      <div className={style.buttonDiv}>
        <button className={style.button}>HOW IT WORKS</button>
        <button className={style.button}>JOINER</button>
      </div>
      <h1 className={style.h1}>Audio Cutter</h1>
      <p className={style.p}>
        Free editor to trim and cut any audio file online
      </p>
      {/* <Button /> */}
      <AudioCutter />
      {/* <AudioFile src={fileSelect} controls></AudioFile> */}
    </section>
  );
}
