const express=require('express')
const RentRoute=express.Router()
const RentFloorValidation=require('../Validations/RentFloor.Validation')
const Authentication=require('../Middlewares/Authentication')
const upload=require('../Middlewares/Upload')
const { GetAllHouseRent,GetAllHouseatCertainarea,
    GetAllHousesonSearch,GetDetailofHouse ,PostRentFloor,
    AddRentWithoutImage,UpdateImages,
    UpdateInformation,
    UpdateAvaliable,
    DeleteRentFloor,
    AdminDeleteRent,
    GetAllMyHouseRent} = require('../Controllers/RentFloor.Controller')
RentRoute.get('/getallrent',GetAllHouseRent) //tada   
RentRoute.get('/getrentinspecificarea/:city',GetAllHouseatCertainarea) //tada  
RentRoute.get('/gethouses/search/:query',GetAllHousesonSearch) //tada
RentRoute.get('/getdetails/:id',GetDetailofHouse) //tada
// RentRoute.post('/postrent',Authentication.verifyUser,
// RentFloorValidation.RentFloorValidation,upload.single('Images'),PostRentFloor)
RentRoute.post('/postrent',Authentication.verifyUser,
// RentFloorValidation.RentFloorValidation,  
upload.array('Images'),PostRentFloor)
RentRoute.post('/postrent/withoutimage',Authentication.verifyUser,
RentFloorValidation.RentFloorValidation,AddRentWithoutImage)
RentRoute.put('/updateimgage/:id', Authentication.verifyUser,upload.array('Images',5), UpdateImages)
RentRoute.put('/updateinformation/:id', Authentication.verifyUser, RentFloorValidation.RentFloorValidation,
UpdateInformation)
RentRoute.put('/updateavailable/:id',Authentication.verifyUser,UpdateAvaliable)
RentRoute.delete('/deleterentalinfo/:id',Authentication.verifyUser, DeleteRentFloor)
RentRoute.delete('/admindeleterentedfloor/:id',Authentication.verifyUser,AdminDeleteRent)
RentRoute.get('/getallmyhouserent', Authentication.verifyUser, GetAllMyHouseRent)
module.exports =RentRoute