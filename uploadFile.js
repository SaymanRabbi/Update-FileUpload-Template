const multer = require('multer')
const path = require("path");
const UPLOADS_FOLDER = "./uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName= file.originalname.replace(fileExt,'').toLowerCase().split(' ').join('-') + '-' + Date.now()
        cb(null, fileName + fileExt)
    }
})
// -------Prepare the final multer storage object
module.exports.upload = multer({
    storage:storage,
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
           if(file.fieldname==='doc'){
             if(file.mimetype==='application/pdf'){
                cb(null,true)
             }
             else{
                cd(new Error("Please upload a pdf file"))
             }
           }
    }
})