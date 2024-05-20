"use-client";
import style from "./info.module.css";
import { MdLockOutline } from "react-icons/md";

export default function InfoPage() {
  return (
    <section className={style.section}>
      <h1 className={style.h1}>How to Cut Audio</h1>
      <p className={style.p}>
        <span style={{ paddingBottom: "20rem" }}>
          This app can be used to trim and/or cut audio tracks, remove an audio
          fragments. Fade in and fade out your music easily to make the audio
          harmoniously.
        </span>
        <br />
        <span style={{ marginBottom: "2vh" }}>
          It fast and easy to use. You can save the audio file in any format
          &#40;codec parameters are configured&#41;
        </span>
        <br />
        <span style={{ marginBottom: "2vh" }}>
          It works directly in the browser, no needs to install any software, is
          available for mobile devices.
        </span>
      </p>
      <div className={style.bottomText}>
        <MdLockOutline className={style.lockIcon} />
        <h1 className={style.h1}>Privacy and Security Guaranteed</h1>
      </div>
      <p className={style.p}>
        This is serverless app. Your files does not leave your device
      </p>
    </section>
  );
}
