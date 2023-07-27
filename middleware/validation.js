const headers = ['body', 'params' , 'query']
// validation func to get the errors and put it in array and send the array at the end
const valdationHandle = (validationSchema) => {
    return (req, res, next) => {
        let validationError = [];
        headers.forEach((key) => {
            if(validationSchema[key]){
                const validation = validationSchema[key].validate(req[key])
                if(validation.error){
                    validationError.push(validation.error.details)
                }
            }
        })
        if(validationError.length){
            res.status(400).json({message: 'error' , validationError})
        }else{
            next();
        }
    }
}

module.exports = valdationHandle;