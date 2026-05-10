import multer from "multer";


// Storage where the files will be stored in server temporary folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // temporary files will be stored in uploads folder which will be created by this
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        // here we are saving the file with the original name 
        // to avoid conflicts we are using the original name of the file
        // but production me original name nhi use krna h
        // us time crypto use krna hai
        /* 
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
        */
       cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
