const mongoose=require("mongoose");
const Schema= mongoose.Schema;

let profile=new Schema({
 age:{
     type:Number,
     required:true   
 },
 use_id:{
    type:Schema.Types.ObjectId 
}
},
{ versionKey: false })
module.exports=profiles=mongoose.model('profiles',profile);