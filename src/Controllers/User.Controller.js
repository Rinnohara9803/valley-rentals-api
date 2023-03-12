const UserModel=require('../Models/User')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function CreateUser(req,res){
  let User =req.body
  let EmailExit=await UserModel.findOne({Email:User.Email})
  if(EmailExit){
    return res.status(400).json({ Success: false, msg: 'Email Already Exist!!' });
  }
  bcryptjs.hash(User.Password,10,function(err,hash){
    const data=new UserModel({
        Fullname:User.Fullname,
        Contact:User.Contact,
        Email:User.Email,
        Password:hash,
        Gender:User.Gender,
        DOB:User.DOB
        
    })
    data.save()
    .then(function(result){
        res.status(201).json({success:true,result})
    })
    .catch(function(err){
        res.status(400).json({message:err,success:false})
    })
})
}

function Login(req,res){
    UserModel.findOne({Email:req.body.Email})
    .then(function(userData){
        if(userData===null){
           return res.status(401).json({message:"Authentication fail"})
        }
        bcryptjs.compare(req.body.Password,userData.Password,function(err,cresult){
            if(cresult===false){
              return  res.status(401).json({message:" unAuthorized user"})
            }
           const token= jwt.sign({uid:userData._id},'secretkey');
           res.status(200).json({success:true,token:token,message:"login Successful", userData})
        })
    })
    .catch(function(err){
        res.status(400).json({message:err})
    })
}

function UpdateProfile(req,res){
    const Id=req.user._id
    const Fullname=req.body.Fullname
    const Contact=req.body.Contact
    const DOB=req.body.DOB
    const Gender=req.body.Gender
    
    UserModel.updateOne({_id:Id},{
        Fullname:Fullname,
        Contact:Contact,
        DOB:DOB,
        Gender:Gender
    })
    .then(function(data){
        res.status(200).json({message:"Updated succefully!!",success:true,data})
    })
    .catch(function(err){
        res.status(400).json({message:err,success:false})
    })
}
function UpdatePassword(req,res){

  
    const Id=req.user._id
    const Password=req.body.Password
    bcryptjs.hash(Password,10,function(err,hash){
        UserModel.updateOne({_id:Id},{Password:hash})
        .then(function(data){
            res.status(200).json({message:"Password Updated succefully!!",success:true,data})
        })
        .catch(function(err){
            res.status(400).json({message:err,success:false})
        })
    })
}
function ForgetPassword(req,res){
    const avaliable=UserModel.find({$or:[{Email:req.body.Email},{Contact:req.body.Email}]})
    if(avaliable){
        const Password=req.body.Password
        bcryptjs.hash(Password,10,function(err,hash){
            UserModel.updateOne({$or:[{Email:req.body.Email},{Contact:req.body.Email}]},{Password:hash})
            .then(function(data){
                res.status(200).json({message:"Updated password successfully!!",success:true,data})
            })
            .catch(function(err){
                res.status(400).json({message:err,success:false})
            })
        })
    }
    
       return res.status(404)
    
}
function MyProfile(req,res){
    const Id=req.user._id
    UserModel.findOne({_id:Id}).select('-Password')
    .then(function(data){
        res.status(200).json({success:true,data})
    })
    .catch(function(err){
        res.status(404).json({err,success:false})
    })
}

module.exports={
    CreateUser,
    Login,
    UpdateProfile,
    UpdatePassword,
    MyProfile,
    ForgetPassword
}