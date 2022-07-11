import Home from "./Pages/Home"
import ImageEditor from "./Pages/ImageEditor"
import Crop from "./Pages/ImageCropper"
import Canvas from "./Pages/Canvas"
import ObjectDetector from "./Pages/ObjectDetector"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

/* ----------- APP -----------*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ImageEditor" element={<ImageEditor />} />
        <Route path="/ObjectDetector" element={<ObjectDetector />} />
        <Route path="/Crop" element={<Crop />} />
        <Route path="/Canvas" element={<Canvas />} />
      </Routes>
    </Router >
  );
}

export default App

