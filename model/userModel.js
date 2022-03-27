import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      min: 6,
      max: 14,
      required: true,
      unique: true,
      type: String,
    },
    fullname: {
      required: true,

      type: String,
    },
    password: {
      min: 6,
      max: 14,
      required: true,
      unique: true,
      type: String,
    },
    email: {
      min: 6,
      max: 14,
      required: true,
      unique: true,
      type: String,
    },
    profilepic: {
      default: '',

      type: String,
    },
    profilepic: {
      default: '',

      type: String,
    },
    followers: {
      default: [],

      type: Array,
    },
    followings: {
      default: [],

      type: Array,
    },
    isAdmin: {
      default: false,

      type: Boolean,
    },
    city: {
      type: String,
      max: 50,
    },
    description: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
)

export const userModel = mongoose.model('User', userSchema)
