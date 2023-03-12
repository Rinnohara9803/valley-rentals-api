const mongoose=require('mongoose')
const success="Connection Successful"

 mongoose.connect('mongodb://127.0.0.1:27017/roomfinder',{
    useNewUrlParser: true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log(`${success}`)
})
.catch((err)=>{
    console.log(err)
    })
