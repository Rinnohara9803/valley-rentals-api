const authentication=require('../Middlewares/Authentication')
const {SaveFaQ,GetTheFAQ,UpdateInfoFAQ}=require('../Controllers/FAQ.Controller')
const express=require('express')
const FAQRouter=express.Router() 
FAQRouter.post('/savefaq',authentication.verifyUser,SaveFaQ)
FAQRouter.put('/editFAQ/:id',UpdateInfoFAQ)
FAQRouter.get('/GetFAQ/:RentId',GetTheFAQ)
module.exports=FAQRouter