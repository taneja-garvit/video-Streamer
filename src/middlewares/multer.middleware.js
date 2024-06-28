import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for the uploaded files
      cb(null, 'public/temp');
    },
    filename: function (req, file, cb) {
      // Specify the filename for the uploaded file
      cb(null, file.originalname);
    }
    
  });
   
  export const upload = multer({
    storage,
  })