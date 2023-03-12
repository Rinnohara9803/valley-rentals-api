const Payment=require('../Models/Payment')
const fetch = require("cross-fetch");
function getThepayment(req,res){
    const Month=GetTheMonth()
    res.status(200).json({success:true,Month})
}

async function PaytheBill(req,res){
    //afno secret key of khalti merchant account yeha config vitra rakhne
    let config = {
        headers: {'Authorization': 'test_secret_key_1e2860b6c02b44898feda0c39fdd6f5d'}
    }
    let Paymentheader=req.body
    const Amount=Paymentheader.amount
    const PaymentDate=Date.now()
    const PaidForMonth=GetTheMonth()
    const PaidBy=Paymentheader.mobile
    const RentId=req.params.RentId
    const data = await fetch(
        "https://khalti.com/api/v2/payment/verify/",Paymentheader,config
    )
    .then(responceData=>{
       const paymentData=new Payment({
           Amount:Amount,
           PaymentDate:PaymentDate,
           PaidForMonth:PaidForMonth,
           PaidBy:PaidBy,
           RentId:RentId
       })
       paymentData.save()
       .then(info=>{
           res.status(201).json({success:true,info})
       })
       .catch(er=>{
           res.status(404).json({er,success:false})
       })
    })
    .catch(err=>{
        res.status(401).json({err,success:false})
    })

    // let response = await data.json();
    // console.log(Paymentheader);
    // res.status(200).json({success:true,message:"succefully paid!"})
    
}

function GetTheMonth(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
            ];
            const d = new Date();
            return monthNames[d.getMonth()]
}
module.exports={
        getThepayment,
        PaytheBill
}