import React from "react";
import "./App.css";
import User from "./jsx/User";
import Users from "./jsx/Users";
import {  
    
  Routes,  
  Route,  

}   
from 'react-router-dom';  
import CreateUser from "./jsx/CreateUser";



function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/create" element={<CreateUser/>}/>
        <Route path="/users/:id" element={<User/>}/>
      
      </Routes>
    
    </div>
  );
}

export default App;
