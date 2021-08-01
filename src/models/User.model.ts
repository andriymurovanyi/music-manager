import mongoose from 'mongoose';
import crypto from 'crypto';

import { encryptPassword } from '../utils';

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password_salt: {
    type: String,
  },
  password_hash: {
    type: String,
  },
  token: {
    type: String
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret.__v;
    }
  }
});

function passwordSetter(password: string) {
  if (!password) {
    this.password_salt = null;
    this.password_hash = null;
    return;
  }

  this._plain_password = password;

  this.password_salt = crypto.randomBytes(128).toString('base64');
  this.password_hash = encryptPassword(password, this.password_salt);
}

function passwordGetter() {
  return this._plain_password ;
}

function checkPassword(password: string) {
  if (!password || !this.password_hash) {
    return false;
  }

  const passwordHash = encryptPassword(password, this.password_salt);

  return passwordHash === this.password_hash;
}

UserSchema.methods.checkPassword = checkPassword;
UserSchema.virtual('password')
  .set(passwordSetter)
  .get(passwordGetter);

export default mongoose.model('User', UserSchema);
