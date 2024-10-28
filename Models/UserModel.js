const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    instagram:{type:String,required:true},
    score:{type:Number,required:true}
})

const UserModel=mongoose.model("user", userSchema)
module.exports={
UserModel
}