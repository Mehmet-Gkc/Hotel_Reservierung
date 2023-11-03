import userModel from '../models/User.js';
import bcrypt from 'bcrypt';
import { createToken } from '../lib/auth.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function createUserController(req, res) {
  try {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function loginUserController(req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    //console.log('logged user', user);

    if (user) {
      const isMatching = await bcrypt.compare(req.body.password, user.password);
      if (isMatching) {
        const token = await createToken({ userId: user._id });
        // console.log(token);
        const sanitiziedUser = { 
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage
        }
        return res
          .status(200)
          .cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.SESSION_EXPIRATION_IN_MINUTES * 60 * 1000,
          })
          .send(sanitiziedUser);
      }
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).send('ok, login');
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getUserController = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findById(userId);
   // console.log('Fetched user:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json(error);
  }
};


export const getUserImage = async (req, res) => {
  
  const userId = req.userId; 
  const currentUser = await userModel.findById(userId);

  if (!currentUser) {
    res.status(404).send('Nutzer nicht gefunden');
    return;
  }
  const imagePath = currentUser.profileImage;

  if (fs.existsSync(imagePath)) {
    // console.log('__dirname:', __dirname);
    return res.sendFile(path.join(__dirname, '/..', imagePath));
  } else {
    return res.sendFile(path.join(__dirname, '/..', 'assets', 'placeholder-profile-img.jpeg'));
  }
};

export const logoutUserController = async (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).send({ msg: 'logged out, cookies cleared' });
};