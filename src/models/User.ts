import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  education: { type: String },
  skills: { type: String },
  resume: {
    filename: { type: String },
    path: { type: String },
    mimetype: { type: String }
  }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)