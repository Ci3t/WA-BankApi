import fs from "fs";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

let userParse = JSON.parse(fs.readFileSync(`./db/users.json`));

//!get all users

export const getUsers = (req, res) => {
  try{

    res.send(userParse);
  }catch(e){
    res.status(404).send('no Users found')
  }
};
//!get user

export const getUser = (req, res) => {
  try{

    const { id } = req.params;
    
    
    
    let user = userParse.find((u) => u.passportId === id);
    
    
    res.status(200).send(user);
  }catch(e){
    res.status(404).send('no User found')
  }
};

//! add user
export const postUser = (req, res) => {
  try{

    const {id} = req.params
   const userCheck = {...req.body}
    
    
    const user = {
      passportId: nanoid(),
      cash: 0,
      credit:0,
      ...req.body,
    };

    let userFind = userParse.find((u) =>{
      return u.firstName === user.firstName && u.lastName === user.lastName
    });
    
    if(userFind){
      return  res.status(500).send('user exist')
    }else{
      userParse.push(user);

      fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
        if (err) {
          res.status(404).send("Failed to Add user");
        } else {
          res.send("User Created Successfully ");
        }
      });
    }
  }catch(e){
    res.status(404).send('cannot add new user')
  }
  }

  
  //! edit cash and credit
  export const patchUser = (req, res) => {
    try{

      const { id } = req.params;
      const userBody = { ...req.body };
      let user = userParse.find((u) => u.passportId === id);
      
      if (userBody.cash) user.cash = userBody.cash;
      if (userBody.credit >= 0) user.credit = userBody.credit;
      if (userBody.firstName) user.firstName = userBody.firstName;
      if (userBody.lastName) user.lastName = userBody.lastName;
      
      fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
        if (err) {
          res.status(404).send("Failed to Add user");
        } else {
          res.send("User Edited Successfully ");
        }
      });
    }catch(e){
      res.status(404).send('cannot edit user')
    }
};
//!deposit
export const depositUser = (req, res) => {
  try{

    const { id } = req.params;
    const userBody = { ...req.body };
    let user = userParse.find((u) => u.passportId === id);
    
    if (userBody.cash) user.cash += userBody.cash;

    console.log(userBody);
    fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
      if (err) {
        res.status(404).send("Failed to Add user");
      } else {
        res.send("User Edited Successfully ");
      }
    });
  }catch(e){
    res.status(404).send('cannot deposit cash')
  }
};

//!update
export const updateCreditUser = (req, res) => {
  try{

    const { id } = req.params;
    const userBody = { ...req.body };
    let user = userParse.find((u) => u.passportId === id);
    
    
    if (userBody.credit >= 0) user.credit += userBody.credit;
    
    fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
      if (err) {
        res.status(404).send("Failed to update user info");
      } else {
        res.send("User Updated Successfully ");
      }
    });
  }catch{
    res.status(404).send('cannot update credit ')
  }
  };

//!transfer 
export const transferUser = (req, res) => {
  try{

    const { from,to } = req.params;
    const {amount,cash,credit} = { ...req.body };
  let user1 = userParse.find((u) => u.passportId === from);
  let user2 = userParse.find((u) => u.passportId === to);

  if(cash||credit) throw new Error
  const totalBalance = user1.cash + user1.credit;

  if (amount > totalBalance){
    throw new Error
    res.status(404).send('ERROR withdraw amount bigger than balance')
  }else{
    user1.cash -= amount;
    user2.cash += amount
    
  }
  
  fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
    if (err) {
      res.status(404).send("Failed to update user info");
    } else {
      res.send("User updated Successfully ");
    }
  });
}catch(e){
  res.status(404).send('cannot complete transfer (try use "amount" as keyword)')
}
};
//!withdraw 
export const withdrawUser = (req, res) => {
  try{

    const { id } = req.params;
    const {amount,cash,credit} = { ...req.body };
  let user1 = userParse.find((u) => u.passportId === id);


  if(cash||credit) throw new Error
  const totalBalance = user1.cash + user1.credit;

  if (amount > totalBalance){
    throw new Error
    res.status(404).send('ERROR withdraw amount bigger than balance')
  }else{
    user1.cash -= amount;

    
  }
  
  fs.writeFile("./db/users.json", JSON.stringify(userParse), (err) => {
    if (err) {
      res.status(404).send("Failed to update balance");
    } else {
      res.send("balance updated Successfully ");
    }
  });
}catch(e){
  res.status(404).send('cannot withdraw (try use "amount" as keyword or you dont have enough balance)')
}
};
