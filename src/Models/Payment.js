const mongoose=require('mongoose')
const Payment=mongoose.model('Payment',{
    Amount:{
        type:Number,
        require:true
    },
    PaidBy:{
        type:String,
        
    },
    RentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RentFloor'
    }
    ,
    PaidForMonth:{
        type:String,
        require:true
    },
    PaymentDate:{
        type:String,

    },
    createdAT:{
        type:Date,
        default:Date.now
    },
    updateAT: {
         type: Date, 
         default: Date.now } 
})
module.exports=Payment