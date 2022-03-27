import express from 'express'
import { userModel } from '../model/userModel.js'
import bcrypt from 'bcrypt'
const userRoute = express.Router()

userRoute.get('/', (req, res) => res.send({ name: 'Sajib Arafat Siddiqui' }))
userRoute.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      fullname: req.body.fullname,
    })
    await newUser.save()
    await res.status(200).send('created')
  } catch (error) {
    console.log(error)
  }
})

userRoute.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    !user && res.status(404).send('user not found')
    const password = await bcrypt.compare(req.body.password, user.password)
    !password && res.status(404).send('password not match')
    await res.status(200).send('User login is successful')
  } catch (error) {
    res.status(500).send('there is an error')
  }
})
userRoute.put('/:id', async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (error) {
          return res.status(500).send(err)
        }
      }
    } else {
      res.send(403).json('you can update only your account')
    }
    try {
      const user = await userModel.findByIdAndUpdate(req.body.userId, {
        $set: req.body,
      })
      res.status(200).send('account has been updated')
    } catch (error) {
      return res.status(500).send(err)
    }
  } catch (error) {
    res.status(500).send('there is an error')
  }
})
userRoute.delete('/:id', async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (error) {
          return res.status(500).send(err)
        }
      }
    } else {
      res.send(403).json('you can not delete your account')
    }
    !user && res.status(404).send('user not found')
    const password = await bcrypt.compare(req.body.password, user.password)
    !password && res.status(404).send('password not match')
    await res.status(200).send('User login is successful')
  } catch (error) {
    res.status(500).send('there is an error')
  }
})
export default userRoute
