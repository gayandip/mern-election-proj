import multer from "multer"

const imgStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "../public/images")
    },
    filename: function(req, file, cb){
        const unique = Math.round(Math.random()*1000)
        cb(null, file.filename + "-" + unique + ".jpg")
    }
})


const docStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "../public/docs")
    },
    filename: function(req, file, cb){
        const unique = Math.round(Math.random()*1000)
        cb(null, file.filename + "-" + unique + ".pdf")
    }
})

const imgUpload = multer({imgStorage})
const docUpload = multer({docStorage})

export {
    imgUpload,
    docUpload
}