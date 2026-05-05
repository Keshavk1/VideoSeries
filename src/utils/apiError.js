class apiError extends Error {
constructor(statusCode,message = "Something went wrong",errors = [],stack=""  ){
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
    this.data = null; // placeholder for data and in error case it will be undefined or empty
    
    if(stack){
        this.stack = stack;
    }else{
        this.stack = Error.captureStackTrace(this, this.constructor);
    }
}
}

export { apiError }