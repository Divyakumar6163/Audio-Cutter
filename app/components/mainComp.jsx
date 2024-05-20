"use-client";
import InputPage from "./inputPage";
import InfoPage from "./info";
export default function AllComp() {
  return (
    <main>
      <InputPage />
      <hr style={{ marginBlock: "0vh" }} />
      <InfoPage />
    </main>
  );
}
