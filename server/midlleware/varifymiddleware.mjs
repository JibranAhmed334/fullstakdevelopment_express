import User from "../models/user.model.mjs"

import jwt from "jsonwebtoken"

const varifytoken = async(request, response, next) =>{
    try{
        const token = request.cookies.token
        console.log("token:", token)

        if(!token ){
            return response.status(401).json({message: `Access Denied. No token provided.`})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decode:", decode)

const user = await User.findById(decode._id)
console.log("request user profile:", user)

request.user = user

next()
    }catch(error){
            response.status(500).json({message: error.message})
    }
}

export default varifytoken