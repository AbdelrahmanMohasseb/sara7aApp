const multer  = require('multer')
// func to upload photos on the uploads file
const storageEngine = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
});
//func to filter the extention photos thats i need 
const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }else{
        req.validationErrorImge = 'error'
        cb(null, false)
    }
}


const upload = multer({ storage: storageEngine, fileFilter: fileFilter });

module.exports = upload