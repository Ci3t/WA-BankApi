import React, { useState } from "react";
import "./App.css";
import User from "./jsx/User";
import Users from "./jsx/Users";
import {  
    
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  



function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/:passportId" element={<User/>}/>
      
      </Routes>
    
    </div>
  );
}

export default App;
