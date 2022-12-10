import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import './users.css'

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
    <div className='containerusers'>
          <h1>User Accounts</h1>
        <div className='container-card'>
       
      
       {getUsers.map(user=>(
        <React.Fragment key={user.passportId}>
           <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Name : {user.firstName} {user.lastName} </Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>ID : {user.passportId}</ListGroup.Item>
        <ListGroup.Item>Cash :{user.cash}</ListGroup.Item>
        <ListGroup.Item>credit :{user.credit}</ListGroup.Item>
        <ListGroup.Item>Total Balance :{user.cash + user.credit}</ListGroup.Item>
      </ListGroup>
        <Button variant="primary"><Link to={`/users/${user.passportId}`}>More Info</Link></Button>
      </Card.Body>
    </Card>
      
        </React.Fragment>
       ))}

       
      
</div>
    </div>
  )
}

export default Users