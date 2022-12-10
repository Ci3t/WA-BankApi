import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {id} = useParams()
    const [getUser,setGetUser] = useState([])
    const [cashInp,setCashInp] = useState('')
    const [creditInp,setCreditInp] = useState('')
    const [withdrawInp,setWithdrawInp] = useState('')

    useEffect(()=>{
        const fetchUser = async ()=>{
            const {data} = await axios.get(`https://bankapi-s007.onrender.com/users/${id}`)
            console.log(data);
            setGetUser(data)
          }
          fetchUser()
        },[id,getUser])

        const deposit =async()=>{
          
          // await axios.patch(`https://bankapi-s007.onrender.com/users/${id}`,{
          //   cash:+cashInp
          // })
          await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/deposit`,{
            cash:+cashInp 
          })

        }
        const credit =async()=>{
          
          // await axios.patch(`https://bankapi-s007.onrender.com/users/${id}`,{
          //   cash:+cashInp
          // })
          await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/update`,{
            credit:+creditInp 
          })

        }
        const withdraw =async()=>{
          
          // await axios.patch(`https://bankapi-s007.onrender.com/users/${id}`,{
          //   cash:+cashInp
          // })
          try{

            await axios.patch(`https://bankapi-s007.onrender.com/users/${id}/withdraw`,{
              amount:+withdrawInp 
            })
          }catch(e){
            console.log(e.response.data);
          }

        }
 
  return (
    <div>
      {getUser && 
      <>
      <p>First Name: {getUser.firstName}</p>
      <p>Last Name: {getUser.lastName}</p>
      <p>Cash: {getUser.cash}</p>
      <p>Credit: {getUser.credit}</p>
      <p>Total Balance: {getUser.credit + getUser.cash}</p>
      </>
      }
      <>
      Deposit: <input  value={cashInp} onChange={(e)=>setCashInp(e.target.value)} type={'number'}/> <button onClick={deposit}>Deposit</button>
      </>
      <>
      Credit: <input  value={creditInp} onChange={(e)=>setCreditInp(e.target.value)} type={'number'}/> <button onClick={credit}>Deposit</button>
      </>
      <>
      Withdraw: <input  value={withdrawInp} onChange={(e)=>setWithdrawInp(e.target.value)} type={'number'}/> <button onClick={withdraw}>Withdraw</button>
      </>
    </div>
  )
}

export default User