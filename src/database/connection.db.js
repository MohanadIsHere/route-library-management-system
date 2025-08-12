import mongoose from 'mongoose'
import { DB_URI } from '../config/env.js'
const connectToDatabase = async() => {
  await mongoose.connect(DB_URI)
  .catch((e) => console.log('Failed to connect to database',{error:e})
  )
  .then(() => console.log('Connected to database successfully 🚀 !')
  )
}
export default connectToDatabase