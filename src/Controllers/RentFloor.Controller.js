const Floor=require('../Models/RentFloor')
function GetAllHouseRent(req,res){
  const {status: Available} = req.query;
  const match = {};

  if(Available){
    match.Available = Available==="true";
  }

  Floor.find(match).populate('userID').sort('-createdAT')
  .then(resp=>{
    return res.status(200).json({resp,success:true})
  })  
  .catch(err=>{
    res.status(404).json({err,success:false})
  })
}
function GetAllHouseatCertainarea(req,res){
  const city=req.params.city
  Floor.find({City:city}).populate('userID').sort('-createdAT')
  .then(resp=>{
    res.status(200).json({resp,success:true})
  })
  .catch(err=>{
    res.status(404).json({err,success:false})
  })
}
function GetAllHousesonSearch(req,res){
  let searchpattern=new RegExp("^"+req.params.query)
  console.log(searchpattern)
  Floor.find({$or:[{Address:{$regex:searchpattern, $options: 'i'}},{City:{$regex:searchpattern}}]}).sort('-createdAT')
  .then(resp=>{
    res.status(200).json({resp,success:true})
  })
  .catch(err=>{
    res.status(404).json({err,success:false})
  })
}
function GetDetailofHouse(req,res){
  const id=req.params.id
  console.log(id)
  Floor.find({_id:id}).populate('userID')
  .then(resp=>{
    res.status(200).json({resp,success:true})
  })
  .catch(err=>{
    res.status(404).json({err,success:false})
  })
}
function PostRentFloor(req,res){
  
  let newRent=req.body
  let Images=req.files 
 
  const newArray= Images.map(element => {
    return {
        ...element,
        filename: element.filename
    };
});
  const City=newRent.City
  const Address=newRent.Address
  const userID=req.user._id
  const Preference=newRent.Preference
  const BHK=newRent.BHK
  const Amountpm=newRent.Amountpm
  const Description=newRent.Description
  const Contact=newRent.Contact
  const Latitude = newRent.Latitude;
  const Longitude = newRent.Longitude;
  const data=new Floor({
    Images:newArray,
    City:City,
    Address:Address,
    userID:userID,
    Preference:Preference,
    BHK:BHK,
    Amountpm:Amountpm,
    Contact:Contact,
    Description:Description,
    Latitude: Latitude,
    Longitude: Longitude,
  })
  data.save()
  .then(result=>{
    res.status(201).json({success:true,result})
  })
  .catch(err=>{
    res.status(403).json({success:false,err})
  })
}

function AddRentWithoutImage(req,res){
  
  let newRent=req.body
  const City=newRent.City
  const Address=newRent.Address
  const userID=req.user._id
  const Preference=newRent.Preference
  const Amountpm=newRent.Amountpm
  const BHK=newRent.BHK
  const Description=newRent.Description
  const Contact=newRent.Contact
  const Latitude = newRent.Latitude;
  const Longitude = newRent.Longitude;
  const data=new Floor({
    City:City,
    Address:Address,
    userID:userID,
    Preference:Preference,
    BHK:BHK,
    Amountpm:Amountpm,
    Description:Description,
    Contact:Contact,
    Latitude: Latitude,
    Longitude: Longitude,
  })
  data.save()
  .then(result=>{
    res.status(201).json({success:true,result})
  })
  .catch(err=>{
    res.status(403).json({success:false,err})
  })
}

function UpdateImages(req,res){
  const id=req.params.id
  const owner_id=req.body.userID
  
 let Images=req.files 
 
  const newArray= Images.map(element => {
    return {
        ...element,
        filename: element.filename
    };
});
  console.log(Images)
    
    Floor.updateOne({_id:id},{Images:newArray})
    .then(result=>{
      res.status(200).json({success:true,result})
    })
    .catch(err=>{
      console.log(err)
      res.status(403).json({success:false,err})
    })
 
}

function UpdateInformation(req,res){
  const id=req.params.id
  let newRent=req.body
  const City=newRent.City
  const Address=newRent.Address
  const userID=req.user._id.toString()
  const Preference=newRent.Preference
  const BHK=newRent.BHK
  const Amountpm=newRent.Amountpm
  const owner_id=req.body.userID.toString()
  const Contact=req.body.Contact
  const Description=req.body.Description
  console.log(userID)
  console.log(owner_id)
  
  if(userID==owner_id){
    Floor.updateOne({_id:id},{City:City,Address:Address,Preference:Preference,BHK:BHK,Amountpm:Amountpm,
      Contact:Contact,
      Description:Description,
    })
    .then(result=>{
      console.log("Hello")
      res.status(200).json({success:true,result})
    })
    .catch(err=>{
      res.status(403).json({success:false,err})
    })
  } else {
    res.status(403).json({success:false,message:"Authentication falied!"})
  }
}

function UpdateAvaliable(req,res){
  const id=req.params.id
  const userID=req.user._id.toString()
  const owner_id=req.body.userID.toString()
  const Available = req.body.Available

  if(userID==owner_id){
    Floor.updateOne({_id:id},{Available: Available})
    .then(result=>{
      res.status(200).json({success:true,result})
    })
    .catch(err=>{
      res.status(403).json({success:false,err})
    })
  }else {
  return res.status(403).json({success:false,message:"Authentication failed!"})
  }
}

function DeleteRentFloor(req,res){
  const id=req.params.id
  const userID=req.user._id.toString()
  const owner_id=req.body.userID.toString()
  if(userID==owner_id){
    Floor.deleteOne({_id:id},)
    .then(result=>{
      res.status(200).json({success:true,result})
    })
    .catch(err=>{
      res.status(403).json({success:false,err})
    })
  } else {
   res.status(403).json({success:false,message:"Authentication failed!"})}
}

function AdminDeleteRent(req,res){
const id=req.params.id
 
    Floor.deleteOne({_id:id})
    .then(result=>{
      res.status(200).json({success:true,result})
    })
    .catch(err=>{
      res.status(403).json({success:false,err})
    })


}

function GetAllMyHouseRent(req,res){
  const id=req.user._id
  Floor.find({userID: id}).then(resp=>{
    console.log(resp)
    res.json({resp})
  }).catch(e=>{
    res.json(e.message)
  })
}

module.exports={
  GetAllHouseRent,
  GetAllHouseatCertainarea,
  GetAllHousesonSearch,
  GetDetailofHouse,
  PostRentFloor,
  AddRentWithoutImage,
  UpdateImages,
  UpdateInformation,
  UpdateAvaliable,
  DeleteRentFloor,
  AdminDeleteRent,
  GetAllMyHouseRent
}