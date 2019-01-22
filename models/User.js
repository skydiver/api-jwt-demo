import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const User = mongoose.model('User', UserSchema);