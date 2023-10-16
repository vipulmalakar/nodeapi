import { Router } from 'express'

const users = [{}]

const router = Router();


const validateReq = (req,res,next)=>{
    const token = req.headers['authorization']
    const user = users.find((ele)=>token === ele.token)
    if(!user){
     res.status(401).send({message:"unathorized"})
    }
    req.user = user
    next();
}


router.post('/register',(req,res)=>{
    const usename = req.body.usename;
    const password = req.body.password;
    const email = req.body.email;
   const user = users.find((ele,index,array)=>usename === ele.usename)
   if(user){
   return res.status(400).send({message:"User already exits!!"})
   }
   users.push({usename,password,email})
  return res.status(201).send({message:"User created!!"})
})

router.post('/login',(req,res)=>{
    const usename = req.body.usename;
    const password = req.body.password;    
   const index = users.findIndex((ele,index,array)=>usename === ele.usename && password === ele.password)
   if(index !==  -1){
    const token = `${usename}-${password}`
    users[index].token = token
    return res.send({message:"You have loged In",token})
   }
  return res.status(401).send({message:"Invalid Creds!"})
})

router.get('/info',validateReq,(req,res)=>{
    console.log(req.user);
  return res.send({message:user})
})

router.get('/getEmail',validateReq,(req,res)=>{
    
   return res.send({message:user.email})
 })




export default router