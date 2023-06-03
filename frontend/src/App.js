import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/pages/Login.js"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login></Login>} ></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
