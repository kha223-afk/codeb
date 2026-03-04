class ApiError extends Error {
    constructor(
        status,
        message=`something went wrong`,
        error =[],
        statck=""
        
    ){
        super(message)
        this.statuscode = status;
        this.data=null
        this.error=error
        this.message=message
        this.success=false
        if (statck) {
            this.stack=statck
            
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export{ApiError}