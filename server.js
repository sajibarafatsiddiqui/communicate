import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userRoute from './routes/users.js'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

dotenv.config()

mongoose.connect(process.env.MONGO_URI, () =>
  console.log('database is connected')
)
app.use('/api/users', userRoute)
app.get('/', (req, res) => {
  res.send('Hi Man!!')
})
app.get('/users', (req, res) => {
  res.send('This is user page!!')
})
app.listen('5050', () => console.log('server is running properly'))
