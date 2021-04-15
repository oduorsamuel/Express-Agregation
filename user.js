const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let user=new Schema({
 name:{
     type:String,
     required:true   
 }
},
{ versionKey: false })
module.exports=users=mongoose.model('users',user);