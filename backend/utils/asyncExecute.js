const asyncExe = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (err) {
        res.status(err.code || 501).json({
            success: false,
            message: err.message
        })
    }
}

export { asyncExe }