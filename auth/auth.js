import { Router } from 'express'
import { UserModel } from './schema.js';
import bcrypt from "bcrypt"

const router = Router();

const validateReq = async (req, res, next) => {
  const token = req.headers['authorization']
  const user = await UserModel.findOne({ token: token }).lean()
  if (!user) {
    return res.status(401).send({ message: "unathorized" })
  }
  req.user = user
  next();
}


router.post('/register', async (req, res) => {
  try {

    const usename = req.body.usename;
    const password = req.body.password;
    const email = req.body.email;
    const newUser = new UserModel({ password, usename, email })
    const save = await newUser.save();
    return res.status(201).send({ save })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  const usename = req.body.usename;
  const password = req.body.password;
  try {
    const token = await UserModel.validateUser(usename, password);
    return res.send({ token })
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
})

router.get('/info', validateReq, (req, res) => {
  console.log(req.user);
  return res.send({ message: req.user })
})

router.get('/getEmail', validateReq, (req, res) => {

  return res.send({ message: user.email })
})



export default router