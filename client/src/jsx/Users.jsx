import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Users() {

    const [getUsers,setGetUsers] = useState([])

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get('https://bankapi-s007.onrender.com/users')
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
        <p>credit :{user.credit}</p>
        <p>Total Balance :{user.cash + user.credit}</p>
        </React.Fragment>
       ))}
      
      
    </div>
  )
}

export default Users