const express=require('express')
const PaymentRouter=express.Router()
const PaymentController=require('../Controllers/Payment.Controller')
PaymentRouter.post('/pay',PaymentController.PaytheBill)
PaymentRouter.get('/getpayments',PaymentController.getThepayment)
module.exports=PaymentRouter