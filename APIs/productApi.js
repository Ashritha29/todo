//create router to handle user api reqs
const { request } = require('express');
const { response } = require('express');
const exp=require('express');
const productApp=exp.Router()

const expressAsyncHandler=require('express-Async-Handler')
// to extract body of request object body parsing middle ware
productApp.use(exp.json())

//get product
productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
    let productCollectionObject=request.app.get("productCollectionObject");
    //get product obj from req
    let products=await productCollectionObject.find().toArray()
    //send request
    response.send({message:"All products",payload:products})
}))



//get product by id
productApp.get('/getproduct/:id',expressAsyncHandler(async(request,response)=>{

    //app is not available but in request it is available
    let productCollectionObject=request.app.get("productCollectionObject");
    //get product obj from req
    let pid=(+request.params.id);
    //get product by id
    let product=await productCollectionObject.findOne({productId:pid});
    //if product not existed with given id
    if(product==null)
    {
        response.send({message:'product not existed'})
    }
    //if product existed
    else{
        response.send({message:'product existed',payload:product})
    }

}))

// //create product
// productApp.post('/create-product',(request,response)=>{
//      //get productionCollectionObject
//      //app is not available but in request it is available
//      let productCollectionObject=request.app.get("productCollectionObject");
//      //get product obj from req
//      let productObj=request.body;
//      //import productObj
//      productCollectionObject.insertOne(productObj,(err,result)=>{
//          if(err)
//          { console.log("err is creating product",err)
//          }
//           else{
//           response.send({message:'product created sucessfully'})
//           }
//      });
// })
// //creating product using promise
// //create product
// productApp.post('/create-product',(request,response)=>{
//     //get productionCollectionObject
//     //app is not available but in request it is available
//     let productCollectionObject=request.app.get("productCollectionObject");
//     //get product obj from req
//     let productObj=request.body;
//     //import productObj
//     productCollectionObject.insertOne(productObj)
//     .then(result=>response.send({message:"product created successfull"}))
//     .catch(err=>console.log("err in creating product",err))
// })

//async and wait
//create product
productApp.post('/create-product',expressAsyncHandler(async(request,response)=>{
    //get productionCollectionObject
    //app is not available but in request it is available

    let productCollectionObject=request.app.get("productCollectionObject");
    //get product obj from req
    let productObj=request.body;
    //import productObj
    //until insertOne is completed we cannot do other operations for which await keyword is used to wait
    let result=await productCollectionObject.insertOne(productObj)
    //send response
    response.send({message:"product is created successfully"})
   
}));


//update product
productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
    //get productCollectionObject
    let productCollectionObject=request.app.get("productCollectionObject");
    //get modified product obj
    let modifiedProduct=request.body;
    //update
    await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
    //send response
    response.send({message:"product modified"})
}));


//route to delete a product
productApp.delete('/remove-product/:id',expressAsyncHandler(async(request,response)=>{
    //get productCollectionObject
    let productCollectionObject=request.app.get("productCollectionObject")
    //get productId from url param
    let pid=(+request.params.id);
    //delete
    let product=await productCollectionObject.deleteOne({productId:pid})
    //if product not existed with given id
    if(product==null)
    {
        response.send({message:"product with given name not existed"})
    }
    else{
        response.send({message:"product deleted"})
    }

}))

//export productApi
module.exports=productApp;
