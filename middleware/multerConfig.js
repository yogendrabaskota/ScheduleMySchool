const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){

        const allowedFileTypes = ['image/png','image/jpg','image/jpeg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This filetype is not supported"))
            return
        }
        cb(null,'../uploads')

    },
    filename : function(req,file,cb){
        //  console.log("received file:",file)
        cb(null,Date.now() + "-" + file.originalname)
        //cb(null,file.originalname)
    }

})

module.exports = {
    multer,
    storage

}