const express=require('express')
const UserValidation=require('../Validations/User.Validation')
const PasswordValidation=require('../Validations/Password.Validation')
const UserController=require('../Controllers/User.Controller')
const Authentication=require('../Middlewares/Authentication')
const UserRouter=express.Router()
UserRouter.post('/register',UserValidation.UserValidation,UserController.CreateUser)
UserRouter.post('/login',UserController.Login)
UserRouter.put('/',Authentication.verifyUser,UserController.UpdateProfile)
UserRouter.put('/updatepassword', 
Authentication.verifyUser,
PasswordValidation.PasswordValidation,
UserController.UpdatePassword)
UserRouter.get('/myprofile',Authentication.verifyUser,UserController.MyProfile)
UserRouter.put('/forgetpwd',UserController.ForgetPassword)  
module.exports=UserRouter
