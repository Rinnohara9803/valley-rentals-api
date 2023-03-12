const FAQ=require('../Models/FAQ')
const RentFloor=require('../Models/RentFloor')

function SaveFaQ(req,res){
    const OwnerId=req.body.OwnerId
    const RentId=req.body.RentId
    const getRent=RentFloor.findOne({_id:RentId})
    console.log(OwnerId)

    console.log(getRent.BHK)
    if(req.user._id.toString() == OwnerId){
        const Pet_Friendly=req.body.Pet_Friendly
        const Lease_Time=req.body.Lease_Time
        const Able_leave_before_leasePeriod=req.body.Able_leave_before_leasePeriod
        const Need_to_Pay_Before_Move_In=req.body.Need_to_Pay_Before_Move_In
        const Need_to_pay_Security_Deposite=req.body.Need_to_pay_Security_Deposite
        const How_to_Pay_rent_due=req.body.How_to_Pay_rent_due
        const Responsiblilites_For_Utilies=req.body.Responsiblilites_For_Utilies
        const Water_Availablity=req.body.Water_Availablity
        const Electricity_Availiblity=req.body.Electricity_Availiblity
        const ParkingForMotorCycle=req.body.ParkingForMotorCycle
        const ParkingForCar=req.body.ParkingForCar
        const Additional=req.body.Additional
        const Internet=req.body.Internet
        const Data=new FAQ({
            Pet_Friendly:Pet_Friendly,
            Lease_Time:Lease_Time,
            Able_leave_before_leasePeriod:Able_leave_before_leasePeriod,
            Need_to_Pay_Before_Move_In:Need_to_Pay_Before_Move_In,
            Need_to_pay_Security_Deposite:Need_to_pay_Security_Deposite,
            How_to_Pay_rent_due:How_to_Pay_rent_due,
            Responsiblilites_For_Utilies:Responsiblilites_For_Utilies,
            Water_Availablity:Water_Availablity,
            Electricity_Availiblity:Electricity_Availiblity,
            ParkingForMotorCycle:ParkingForMotorCycle,
            ParkingForCar:ParkingForCar,
            Internet:Internet,
            Additional:Additional,
            OwnerId:OwnerId,
            RentId:RentId
        })
        Data.save()
        .then(reponceData=>{
            res.status(201).json({success:true,reponceData})
        })
        .catch(err=>{
            res.status(403).json({success:false,err})
        })
    } else {
    return res.status(403).json({success:false,Message:"Unauthorized User"})
    }
}

function GetTheFAQ(req, res){
    const id =req.params.RentId
    console.log(id)
    FAQ.findOne({RentId:id})
    .then(reponceData=>{
        console.log(reponceData)
        res.status(201).json({success:true,reponceData})
        console.log('tada')
        
    })
    .catch(err=>{
        res.status(404).json({success:false,err,message:"Not Found"})
        console.log('e')
    })
}

function UpdateInfoFAQ(req,res){
        const Pet_Friendly=req.body.Pet_Friendly
        const Lease_Time=req.body.Lease_Time
        const Able_leave_before_leasePeriod=req.body.Able_leave_before_leasePeriod
        const Need_to_Pay_Before_Move_In=req.body.Need_to_Pay_Before_Move_In
        const Need_to_pay_Security_Deposite=req.body.Need_to_pay_Security_Deposite
        const How_to_Pay_rent_due=req.body.How_to_Pay_rent_due
        const Responsiblilites_For_Utilies=req.body.Responsiblilites_For_Utilies
        const Water_Availablity=req.body.Water_Availablity
        const Electricity_Availiblity=req.body.Electricity_Availiblity       
        const ParkingForMotorCycle=req.body.ParkingForMotorCycle
        const ParkingForCar=req.body.ParkingForCar
        const Additional=req.body.Additional
        const Internet=req.body.Internet
        const ID=req.params.id
        FAQ.updateOne({_id:ID},{
            Pet_Friendly:Pet_Friendly,
            Lease_Time:Lease_Time,
            Able_leave_before_leasePeriod:Able_leave_before_leasePeriod,
            Need_to_Pay_Before_Move_In:Need_to_Pay_Before_Move_In,
            Need_to_pay_Security_Deposite:Need_to_pay_Security_Deposite,
            How_to_Pay_rent_due:How_to_Pay_rent_due,
            Responsiblilites_For_Utilies:Responsiblilites_For_Utilies,
            Water_Availablity:Water_Availablity,
            Electricity_Availiblity:Electricity_Availiblity,
            ParkingForMotorCycle:ParkingForMotorCycle,
            ParkingForCar:ParkingForCar,
            Internet:Internet,
            Additional:Additional
        })
        .then(reponceData=>{
            res.status(200).json({success:true,reponceData})
        })
        .catch(err=>{
            res.status(400).json({success:false,err})
        })
}

module.exports={
    SaveFaQ,
    GetTheFAQ,
    UpdateInfoFAQ
}