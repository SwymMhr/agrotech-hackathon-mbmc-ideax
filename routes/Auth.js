const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const response = require("../utils/ResponseHandlers"); // response handler

// register route
router.post("/register", async (req, res) => {
      
      console.log(req.body)
  try {
    const { firstName, lastName, email, password, contact,category} = req.body; // getting user data
    const checkUserExists = await User.findOne({email: email}); // checking if user already exists
    if (checkUserExists) {
      return response(res, 200, "User already exists", null);
    }
    const salt = await bcrypt.genSalt(10); // generating salt
    const user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, salt), // hashing password
      contact,
      category
    });
    await user.save();
    response(res, 200, "User registered successfully", {firstName, lastName, email, contact,category});
  } catch (error) {
    response(res, 500, "Internal server error", {error: error.message});
  }
});


// login route
router.post('/login', async (req,res)=>{
      try{
            const {email,password} = req.body; // getting user data

            const checkUserExistence = await User.findOne({email:email}).exec(); // checking if user exists
            
            if(checkUserExistence !== null && checkUserExistence['email'] !== undefined && checkUserExistence['email'] === email){
                  const checkUserPassword = await bcrypt.compare(password.toString(), checkUserExistence['password']); // comparing password
                  if(checkUserPassword){
                        const token = jwt.sign({email:email, userId: checkUserExistence['_id']}, process.env.JWT_SECRET); // generating token
                        response(res, 200, "Logged In Successfully!!!", {token:token,userId:checkUserExistence['_id'],email:checkUserExistence['email'], role: checkUserExistence['category']}); // sending token
                  }
            }else{
                  response(res, 200, "User not found", null); // user not found
            }
      }catch(error){
            console.log(error) // logging error
            response(res, 500, "Internal server error", {error: error.message}); // sending error
      } 
})

module.exports = router;