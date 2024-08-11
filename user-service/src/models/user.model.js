const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
    avatar : [{type : String, default:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}],
    location : {type : String, trim : true},
    about : {type : String, trim : true},
    
   
    
})




const users = mongoose.model('USERS', userSchema)
module.exports = users

