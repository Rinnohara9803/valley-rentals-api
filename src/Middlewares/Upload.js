const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./Public/Images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const fileFilter=function(req,file,cb){
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='image/jpg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
// const uploadSize=function(req,file,cb){
//     if (file.size > 1024 * 1024 * 15) {
//         return cb(new Error('File size exceeds 15 MB'));
//       }
//       cb(null,false)
// }
const upload=multer({
    storage:storage,
    // uploadSize,
    // fileFilter:fileFilter
})

module.exports=upload