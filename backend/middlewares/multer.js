import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        if (file.fieldname == "image") {
            cb(null, "./public/images/")
        } else {
            cb(null, "./public/docs/")
        }
    },
    filename: function(req, file, cb){
        const unique = Math.floor(Math.random()*999) + file.originalname
        cb(null, unique)
    }
})

const upload = multer({storage})

export { upload }