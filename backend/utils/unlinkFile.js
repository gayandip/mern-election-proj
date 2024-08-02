import fs from "fs"

const unlinkFile = (file) => {
    fs.unlink(file, (err) => {
        if (err) {
            throw new apiError(504, "error deleting file")
        }
    })
}

export { unlinkFile }