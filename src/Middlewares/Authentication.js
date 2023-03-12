const jwt=require('jsonwebtoken')
const User=require('../Models/User')
//check for token

module.exports.verifyUser=function(req,res,next){
    
     
    try{
        
        const token=req.headers.authorization.split(" ")[1];
        
        const data=jwt.verify(token, 'secretkey');
        User.findOne({_id:data.uid})
        .then(function(result){
            
            req.user=result
            next()
    })
    .catch(function(ex){
        res.status(403).json(ex)
    })
    }
    catch(e){
    
        res.status(403).json({error:e})
        
    }
    
}