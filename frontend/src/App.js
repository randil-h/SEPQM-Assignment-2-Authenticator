import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Signup from "./pages/Register";
import Login from "./pages/Login";


function App() {
  return (

      <div className="App font-abcd">
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>


  );
}

export default App;
