const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const { errorhandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) =>{
    const {name, email, password} = req.body;    

    if(!name || !email || !password || name === '' || email === '' || password === ''){
        return res.status(400).json("All fields are required" );
    }

    const hashedpassword = bcryptjs.hashSync(password, 10); 

    const newUser = new User({
        name,
        email,
        password : hashedpassword   
    });
    
    try{
        await newUser.save();
        res.json("Signup successful");

    }catch(error){
        next(error);
    }
}

exports.signin = async (req, res, next) =>{

    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorhandler(400, "All fields are required"));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorhandler(404, "User not found"));
        }

        const passMatched = bcryptjs.compareSync(password, validUser.password);
        if(!passMatched){
            return next(errorhandler(400, "Invalid password"));
        }

        const payload = {
            userId: validUser._id// Assuming user.role holds the user's role
        };

        const token = jwt.sign(payload,
            process.env.JWT_SECRET_KEY
        );

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie("access_token", token, {
            httpOnly: true
        }).json(rest);



    }catch(error){
        next(error);
    }

}

module.exports.signout = (req, res) => {
    try{

      res.clearCookie("access_token").json("User has been signed out");
    }catch(err){
      next(err);
    }
  }
  
