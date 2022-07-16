//create express app
const { request } = require('express')
const exp=require('express')
const app=exp()
const mclient=require("mongodb").MongoClient;

//importing dotenv and we get -->process.env
require('dotenv').config()

//connect path module
const path=require('path');

//connect build of react with nodejs
app.use(exp.static(path.join(__dirname,'./build')));

//dealing with page refresh
//if it doesnot set to above apis then it will send file of current directory
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})


//connect to database url

const DBurl=process.env.DATABASE_CONNECTION_URL;

//connect with mongodb
//This block doesn't change
mclient.connect(DBurl)
.then((client)=>{
    //get DB object
    let dbObj=client.db("20071A05M6db");
    //create collection objects
    let userCollectionObject =dbObj.collection("userCollection")
    let productCollectionObject =dbObj.collection("productCollection")

    //sharing DB objects to Api's
    app.set("userCollectionObject",userCollectionObject);
    app.set("productCollectionObject",productCollectionObject);
    console.log("DB connection successful")
})
//if condition is not satisfied
.catch(err=>console.log("error in Db connection",err))


//import userApp and productApp
const userApp=require('./APIS/userApi')
const productApp=require('./APIS/productApi')

//execute specific api based on path
app.use('/user-api',userApp);
app.use('/product-api',productApp);


//handling invalid paths
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
})
//error handling middlewares(only synchronous errors are taken care)
app.use((error,request,response,next)=>{
    response.send({message:"Error occured",reason:`${error.message}`})
})
//assign port number
const port=process.env.PORT;
app.listen(port,()=>console.log('server listening on port ${port}...'))