import multer from "multer"

const imgStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const imgUpload = multer({storage: imgStorage})

export {
    imgUpload
}