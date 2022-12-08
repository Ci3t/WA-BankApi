import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {passportId} = useParams
    const [getUser,setGetUser] = useState({})

    useEffect(()=>{
        const fetchUser = async ()=>{
            const {data} = await axios.get(`http://localhost:5000/users`,passportId)
            console.log(data);
            setGetUser(data)
        }
        fetchUser()
    },[passportId])
  return (
    <div>{getUser.firstName}</div>
  )
}

export default User