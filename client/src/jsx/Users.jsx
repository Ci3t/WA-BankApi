import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Users() {

    const [getUsers,setGetUsers] = useState([])

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get('http://localhost:5000/users')
            console.log(data);
            setGetUsers(data)
        }
        fetchUsers()
    },[])
  return (
    <div>
       {getUsers.map(user=>(
        <React.Fragment key={user.id}>
        {/* <p>{user.passportId}</p> */}
        <p>FirstName: {user.firstName}</p>
        <p>lastName :{user.lastName}</p>
        <p>Cash :{user.cash}</p>
        </React.Fragment>
       ))}
      
      
    </div>
  )
}

export default Users