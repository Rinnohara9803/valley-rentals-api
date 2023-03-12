const mongoose =require('mongoose')
const UserModel=mongoose.model('UserModel',{
    Fullname:{
        type:String,
        require:true,
        max:24,
        min:6
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
        max:15,
        min:6
    },
    Contact:{
        type:String,
        require:true,
        max:15,
        min:10
    },
    DOB:{
        type:String,
        require:true,

    },
    Gender:{
        type:String,
        enum:["Male","Female","Other"],
        require:true,

    }
})
module.exports=UserModel