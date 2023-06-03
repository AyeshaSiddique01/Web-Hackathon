import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login"
import Home from "./Components/Home"
import CreateEvent from "./Components/CreateEvent"
import SideBar from './Components/SideBar';
function App() {
  if (localStorage.getItem() != null){
    
  }
  return (
    <>

      <Router>        
        <div style={{ display: "flex" }}>
          <div style={{ flex: 2 }} id='nav_'>
            <SideBar></SideBar>
          </div>
          <Routes>
            <Route path='/' element={<Login></Login>} ></Route>
            <Route path='/home' element={<Home></Home>} ></Route>
            <Route path='/CreateEvent' element={<CreateEvent></CreateEvent>} ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
