const mongoose=require('mongoose')
const {dataConnection} = require('../dbConnection/dbconnect');

 

const dataSchema= new mongoose.Schema({
    

    id:{type:Number},
    date:{type:Date},
    user:{type:String},
    department:{type:String},
    software:{type:String},
    seats:{type:Number},
    amount:{type:Number},
     

},{collection:'data'});

const model=dataConnection.model('data',dataSchema);
 
module.exports=model


 