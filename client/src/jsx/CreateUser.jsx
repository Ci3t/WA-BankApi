import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CreateUser() {
    const [addUser,setAddUser]= useState('')
    const [error,setError]= useState('')
    const [firstNameInp,setFirstNameInp]= useState('')
    const [lastNameInp,setLastNameInp]= useState('')
    const [cashInp,setCashInp]= useState('')
    const [creditInp,setCreditInp]= useState('')

   
        const postUser = async ()=>{
            try{

                await axios.post('https://bankapi-s007.onrender.com/users',{
                    firstName:firstNameInp,
                    lastName:lastNameInp,
                    cash:+cashInp,
                    credit:+creditInp
                })
                
            }catch(e){
                setError(e)
            }
          
        }
       
   
  return (
    <div>
        <>
        <div>

        <label>FirstName:
            <input value={firstNameInp} onChange={(e)=>{setFirstNameInp(e.target.value)}} type={'text'}/>
        </label>
        </div>
        <div>

        <label>lastName:
            <input value={lastNameInp} onChange={(e)=>{setLastNameInp(e.target.value)}} type={'text'}/>
        </label>
        </div>
        <div>

        <label>Cash:
            <input value={cashInp} onChange={(e)=>{setCashInp(e.target.value)}} type={'number'}/>
        </label>
        </div>
        <div>

        <label>Credit:
            <input value={creditInp} onChange={(e)=>{setCreditInp(e.target.value)}} type={'number'}/>
        </label>
        </div>
        <button onClick={postUser}>Add User</button>
        <p>{error?.message}</p>
        </>
    </div>
  )
}

export default CreateUser