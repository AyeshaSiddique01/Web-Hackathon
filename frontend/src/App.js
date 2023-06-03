import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login"
import Home from "./Components/Home"
import CreateEvent from "./Components/CreateEvent"
import SideBar from './Components/SideBar';
function App() {
  return (
    <>
     
    <Router>
      <div style = {{display:"flex"}}>
      <div style = {{flex:2}}>
    <SideBar></SideBar>
    </div>
        <Routes>
          <Route path='/Login' element={<Login></Login>} ></Route>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/CreateEvent' element={<CreateEvent></CreateEvent>} ></Route>
        </Routes> 
      </div>
    </Router>
    </>
  );
}

export default App;
