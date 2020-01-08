 const mongoose=require('mongoose');
 const Schema=mongoose.Schema;

 let  adminSchema=new Schema({
       userName:{type:String,required:true},
       passWord:{type:String,required:true},
       age: {type:String,required:true},
       ctime: { type: Date, default: Date.now },
       phone: {type:String,required:true},
       email: {type:String,required:true},
       address: {type:String,required:true},
       token: {type:String},
 })
 let adminsModel=mongoose.model('admins',adminSchema)
 module.exports=adminsModel