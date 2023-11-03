import multer from "multer";
import fs from "fs";
import path from "path";
import UserModel from "../models/User.js";


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
       
        const userId = req.userId; 
        const userPath = `uploads/${userId}/`;

        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath, { recursive: true });
        }

        cb(null, userPath);
    },
    filename: function (req, file, cb) {
      
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        const fileExtension = path.extname(file.originalname);

        cb(null, `profileImage-${uniqueSuffix}${fileExtension}`);
      }
})

const upload = multer({ storage: myStorage });

export default [
    upload.single('file'),
    async (req, res) => {

        const path = req.file.path;
        const userId = req.userId; 

        const currentUser = await UserModel.findById(userId);
        currentUser.profileImage = path;
        await currentUser.save();

        res.send(`Datei erfolgreich hochgeladen in ${req.file.path}`)
    }
]