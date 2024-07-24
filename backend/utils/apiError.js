class apiError extends Error {
    constructor(
        statusCode,
        message = "Something wrong happend",
        errors = [],
        stack = ""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.succss = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { apiError }