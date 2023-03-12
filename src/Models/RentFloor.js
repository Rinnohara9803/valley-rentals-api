const mongoose=require('mongoose')
const RentFloor=mongoose.model('RentFloor',{
    Images:[],
    BHK:{
        type:String,
        enum:['1BHK','2BHK','3BHK','4BHK']
    },
    Preference:{
        type:String,
        require:true
    },
    City:{
        type:String,
        enum:['Kathmandu','Lalitpur','Bhaktapur'],
        require:true
    },
    Description:{
        type:String,
        require:true
    },
    Contact:{
        type:String,
        require:true
    },
    Amountpm:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Available:{
        type:Boolean,
        default:true
    },
    Approved:{
        type:Boolean,
        default:false
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'    
    },
    Latitude: {
        type: Number,
        require: true,
    },
    Longitude: {
        type: Number,
        require: true,
    },
    createdAT:{
        type:Date,
        default:Date.now
    },
    updateAT: {
         type: Date, 
         default: Date.now } 

})
module.exports=RentFloor