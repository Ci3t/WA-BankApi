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
import CreateUser from "./jsx/CreateUser";



function App() {
 
  return (
    <div>
      <Routes>
        <Route path="/" element={'homepage'}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/create" element={<CreateUser/>}/>
        <Route path="/users/:id" element={<User/>}/>
      
      </Routes>
    
    </div>
  );
}

export default App;
