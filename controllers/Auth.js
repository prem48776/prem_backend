import UserModel from "../model/UserModel.js";
import bcrypt, { hash } from 'bcrypt' 

//regester routes
export const regesterUser = async (req, res) => {
  const { username, name, password } = req.body;
  const salt = await bcrypt.genSalt(10 )
  const hashpass =await bcrypt.hash(password ,salt)
  const newUser = new UserModel({ username, name, password :hashpass });
 
  try {
    const user = await UserModel.findOne({ username: username });
    
    if (!user) {
     const result = await newUser.save();
    return  res.status(200).json(result)
      
    } else {
        res.status(400).json({message :"Username already in Store"})
    }
  } catch (error) {
    res.status(500).json({message :error.message})
  }
};
//login routes

export const LoginUser =async(req,res)=>{
    const {username ,password } =req.body
    
    
    try {
        const user = await UserModel.findOne({username :username})
        if (user) {
            const validity =await bcrypt.compare(password,user.password)

            validity ? res.status(201).json(user) :res.status(401).json({message :"Wrong password"})
            
        } else {
            res.status(404).json({message :"user are not in database"})
        }
    } catch (error) {
        res.status(500).json({message :error.message})
    }
}
