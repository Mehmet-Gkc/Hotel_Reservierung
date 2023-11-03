import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: [7, 'password muss mindestens 7 characters sein'],
    max: [10, 'password muss maximal 10 characters sein'],
  },
  profileImage: String
});

const User = mongoose.model("User", userSchema);

export default User;
