import { Routes, Route } from "react-router-dom";
import { kunlunData } from "./data/kunlun";
import { jingjueData } from "./data/jingjue";
import { LangProvider } from "./i18n/context";
import HomePage from "./pages/HomePage";
import MapPlayerPage from "./pages/MapPlayerPage";

function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/klsg" element={<MapPlayerPage key="kunlun" mapData={kunlunData} />} />
        <Route path="/jjgc" element={<MapPlayerPage key="jingjue" mapData={jingjueData} />} />
      </Routes>
    </LangProvider>
  );
}

export default App;
