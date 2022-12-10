import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './users.css'

function Users() {

    const [getUsers,setGetUsers] = useState([])
    const [firstNameInp,setFirstNameInp] = useState('')
    const [lastNameInp,setLastNameInp] = useState('')
    const [errorMsg,setErrorMsg] = useState('')

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get('https://bankapi-s007.onrender.com/users')
            console.log(data);
            setGetUsers(data)
        }
        fetchUsers()
    },[getUsers])
    const createUser =async()=>{
          
      try{

        await axios.post(`https://bankapi-s007.onrender.com/users`,{
          firstName:firstNameInp,
          lastName:lastNameInp
        })
      }catch(e){
        setErrorMsg(e);
      }

    }
  return (
    <div className='containerusers'>
          <h1>User Accounts</h1>
       <InputGroup id='maxWidth2' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        
          FirstName
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        type={'text'}
        value={firstNameInp}
        onChange={(e)=>{setFirstNameInp(e.target.value)}}
        />
          <InputGroup.Text id="inputGroup-sizing-default">
        
        LastName
      </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        type={'text'}
        value={lastNameInp}
        onChange={(e)=>{setLastNameInp(e.target.value)}}
        />
        <Button onClick={createUser} variant="primary">Create User</Button>
      </InputGroup>
      <div>
        {errorMsg && errorMsg?.response.data}
      </div>
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