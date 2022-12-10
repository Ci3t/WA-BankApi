import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './user.css'
function User() {
    const {id} = useParams()
    const [getUser,setGetUser] = useState([])
    const [cashInp,setCashInp] = useState('')
    const [creditInp,setCreditInp] = useState('')
    const [withdrawInp,setWithdrawInp] = useState('')

    const [toIdInp,setToIdInp] = useState('')
    const [toAmountInp,setToAmountInp] = useState('')
    const [errorMsg,setErrorMsg] = useState('')

    useEffect(()=>{
        const fetchUser = async ()=>{
            const {data} = await axios.get(`https://bankapi-s007.onrender.com/users/${id}`)
            console.log(data);
            setGetUser(data)
          }
          fetchUser()
        },[id,getUser])

        const deposit =async()=>{
          
          try{

            await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/deposit`,{
              cash:+cashInp 
            })
          }catch(e){
            setErrorMsg(e);
          }

        }
        const credit =async()=>{
          
      try{
        await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/update`,{
          credit:+creditInp 
        })
      }catch(e){
        setErrorMsg(e);
      }
      

        }
        const withdraw =async()=>{
        
          try{

            await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/withdraw`,{
              amount:+withdrawInp 
            })
          }catch(e){
            setErrorMsg(e);
          }

        }
        const transfer =async()=>{
        
          try{
   
           
            await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/trans/${toIdInp}`,{
              amount:+toAmountInp
            })
          }catch(e){
            setErrorMsg(e);
          }

        }
     
  return (
    <div className='container-User'>
      {getUser && 
      <>
   
      <Card style={{ marginBottom:'1em', width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Name : {getUser.firstName} {getUser.lastName} </Card.Title>
        <ListGroup variant="flush">
        <ListGroup.Item>ID : {getUser.passportId}</ListGroup.Item>
        <ListGroup.Item>Cash :{getUser.cash}</ListGroup.Item>
        <ListGroup.Item>credit :{getUser.credit}</ListGroup.Item>
        <ListGroup.Item>Total Balance :{getUser.cash + getUser.credit}</ListGroup.Item>
      </ListGroup>
       
      </Card.Body>
    </Card>
      </>
      }
      <InputGroup id='maxWidth' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        Deposit:
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={cashInp} onChange={(e)=>setCashInp(e.target.value)} type={'number'}
        />
        <Button onClick={deposit} variant="primary">Deposit</Button>
      </InputGroup>
      <InputGroup id='maxWidth' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        Withdraw: 
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={withdrawInp} onChange={(e)=>setWithdrawInp(e.target.value)} type={'number'}
        />
        <Button onClick={withdraw} variant="primary">Withdraw</Button>
      </InputGroup>
      <InputGroup id='inputWidth' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        Transfer To: (by Id)
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
           value={toIdInp} onChange={(e)=>setToIdInp(e.target.value)} type={'text'}
        />
        </InputGroup>
        
        <InputGroup id='inputWidth' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        Amount:
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={toAmountInp} onChange={(e)=>setToAmountInp(e.target.value)} type={'number'}
          />
        <Button onClick={transfer} variant="primary">Transfer</Button>
      </InputGroup>

      <InputGroup id='maxWidth' className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        Update Credit (if Banker)
        </InputGroup.Text>
        <Form.Control
        
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={withdrawInp} onChange={(e)=>setCreditInp(e.target.value)} type={'number'}
        />
        <Button onClick={credit} variant="primary">Update</Button>
      </InputGroup>
      {errorMsg && errorMsg?.response.data}
    </div>
  )
}

export default User