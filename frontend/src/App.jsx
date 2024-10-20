import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
