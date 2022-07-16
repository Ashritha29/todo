//create router to handle user api reqs
const bcrypt = require('bcryptjs/dist/bcrypt');
const exp=require('express');
const expressAsyncHandler = require('express-async-handler');
const userApp=exp.Router()
//import bcryptjs for password
const bcryptjs=require("bcryptjs");
//import jsonwebtoken to create token
const jwt=require("jsonwebtoken");
// to extract body of request object of all request
userApp.use(exp.json())

require('dotenv').config()
//create REST API

//create route to handle '/getusers' path
//used by admins cant be accessed by other employees
userApp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
   let userCollectionObject=request.app.get("userCollectionObject");
    //get all users toArray as it produces cursor
    let users=await userCollectionObject.find().toArray()
    //send res
    response.send({message:'all users',payload: users});
}))

//create route user login
userApp.get("/login",expressAsyncHandler(async(request,response)=>{
  //get userCollectionObject
  let userCollectionObject=request.app.get("userCollectionObject");
  //get user  credential obj from client
  let userCredObj=request.body;
  //search for user by username
  let userOfDb=await userCollectionObject.findOne({username:userCredObj.username})
  //if username not existed
  if(userOfDb==null)
  {
      response.send({message:"Invalid user"})
  }
  //if username existed
  else{
   //compare the password
   let status =await bcryptjs.compare(userCredObj.password,userOfDb.password);
   //if passwords not matched
   if(status==false){
    response.send({message:"Invalid password"})
   }
   //if passwords are matched
   else{
     //create token in seconds for hours "2h"
     let token=jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:60});
    //find token
    //payload is the token in encrypted form 
    response.send({message:"login successful",payload:token,userObj:userOfDb})
   }
  } 
    
}))

//create route to create user

userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
   //get userCollectionObject
   let userCollectionObject=request.app.get("userCollectionObject");
   //get userObj from client
   let newUserObj=request.body;
   let userOfDb=await userCollectionObject.findOne({username:newUserObj.username})
    //if user existed
    if(userOfDb!=null){
        response.send({message:"Username has already taken.plz choose another"})
    }
    //if user not existed
    else{
       //hash password
       let hashedPassword= await bcryptjs.hash(newUserObj.password,6);
       //replace plain password with hashed passwored in newUserObj
       newUserObj.password=hashedPassword;
       //insert a newUser
       await userCollectionObject.insertOne(newUserObj)
       //send response
       response.send({message:"New User created"})
    }
}))

//route to update user
userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get modified obj
    let modifiedUser=request.body
    //update
    let hp=await bcryptjs.hash(modifiedUser.password,6)
    await userCollectionObject.updateOne({username:modifiedUser.username},{$set:{password:hp}})
    //send response
    response.send({message:"user modified"})
}))

//route to delete a user by username
userApp.delete('/remove-user/:uname',expressAsyncHandler(async(request,response)=>{
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject")
    //get username from url param
    let un=(request.params.uname);
    
    //delete
    let user=await userCollectionObject.deleteOne({username:un})
    console.log(user)
    //if user not existed with given username
    if(user==null)
    {
        response.send({message:"user with given username not existed"})
    }
    else{
        response.send({message:"user deleted"})
    }

}))

//export userApp
module.exports=userApp;