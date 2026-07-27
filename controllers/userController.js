const userModel = require("../models/userModel")
const router = require("../routes/userRoute")
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken")

const registerController=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        if(!username|| !email|| !password){
            return res.status(500).send({
                success:false,
                message:'Please Provide Valid userName and Password'
            })
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:'User already exist'
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newuser= new userModel({username,email,password:hashedPassword})
        await newuser.save()
        res.status(201).send({
            success:true,
            message:'user register Successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Register Api',
            error
        })
    }
}

const logincontroler=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        const token=await JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).send({
            success:true,
            message:'Login Successfull',
            token,
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'login api',
            error
        })
    }
}


module.exports={ registerController,logincontroler }