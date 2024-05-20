"use-client";
import InputPage from "./inputPage";
import InfoPage from "./info";
export default function AllComp() {
//   const [isFile, setIsFile] = useState(false);
  return (
    <main>
      <InputPage />
      <hr style={{ marginBlock: "0vh" }} />
      <InfoPage />
    </main>
  );
}
