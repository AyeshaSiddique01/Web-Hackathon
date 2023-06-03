import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login"
import Home from "./Components/Home"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login></Login>} ></Route>
          <Route path='/home' element={<Home></Home>} ></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
