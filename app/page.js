"use-client";
import styles from "./page.module.css";
import AllComp from "./components/mainComp";
export default function Home() {
  return (
    <main>
      <AllComp className={styles.section} />
    </main>
  );
}
