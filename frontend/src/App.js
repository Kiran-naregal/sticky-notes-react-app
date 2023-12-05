import "bootstrap/dist/css/bootstrap.css";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
