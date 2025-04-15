import { Routes, Route, Navigate } from "react-router-dom";
import UnicornsContainer from "./layouts/unicorns";
import { UnicornProvider } from "./context/UnicornContext";


function App() {
  return (
    <UnicornProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/unicornios" />} />
        <Route path="/unicornios" element={<UnicornsContainer />} />
      </Routes>
    </UnicornProvider>
  );
}

export default App;
