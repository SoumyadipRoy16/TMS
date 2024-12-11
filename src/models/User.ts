// src/models/User.ts

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  education: { type: String },
  skills: { type: String },
  resumeLink: { 
    type: String, 
    required: true,  // Make resume link mandatory
    validate: {
      validator: function(v: string) {
        // Basic URL validation
        const urlRegex = /^(https?:\/\/)?(drive\.google\.com|www\.dropbox\.com|docs\.google\.com)\/.*$/i;
        return urlRegex.test(v);
      },
      message: 'Please provide a valid Google Drive or Dropbox link'
    }
  }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)