import User from '../models/user';
import Token from '../models/token';
import { hashPassword,sendEmail,comparePassword} from '../utils/auth';

const Razorpay=require('razorpay');
const crypto=require('crypto');

import jwt from "jsonwebtoken";
export const register=async (req,res)=>
{
      try{
        const {name,email,password}=req.body;
        // console.log(req.body);
        // validations
        if(!name) return res.status(400).send("Name is required");
        if(!password || password.length < 6){
                return res.status(400).send("Password is required and should be min 6 characters long");
        }
        let userExist=await User.findOne({email}).exec();
        if(userExist) return res.status(400).send("Email is taken");

        // hash password
        const hashedPassword=await hashPassword(password);

        // register
        const user=new User({
                name,email,password:hashedPassword,
        });
        await user.save();
        // console.log("saved user=",user);
        return res.json({ok:true});
      }
      catch(err)
      {
        console.log(err);
        return res.status(400).send('Error,Try again please');
      }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);

    if(!match)
    {
      return res.status(400).send("Incorrect Password");
    }
    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const logout=async(req,res)=>
{
  try
  {
    res.clearCookie("token");
    return res.json("Singout success");
  }catch(err){
    console.log(err)
  }
}

export const currentUser=async (req,res)=>
{
  try{
    const user=await User.findById(req.user._id).select('-password').exec();
    console.log('CURRENT_USER',user);
    return res.json({ok:true});

  }catch(err)
  {
    console.log(err);
  }
}

// payment=================================


export const order=async (req,res)=>
{
    try{
        const instance=new Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
        })
        
        const options={
            amount:req.body.amount*100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString("hex")
        };

        instance.orders.create(options,(error,order)=>
        {
            if(error)
            {
                console.log(error);
                return res.status(500).send("Something went wrong");
            }
            res.status(200).send(order);
        })
    }catch(err)
    {
        console.log(err);
        res.status(500).send("Internal Server error");

    }
}

export const verify=async (req,res)=>
{
    try{
        const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature}=req.body;

        const sign=razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSign=crypto.createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if(razorpay_signature === expectedSign)
        {
            return res.status(200).send("Payment verified successfully");
        }else
        {
            return res.status(400).json("Invalid signature sent");
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

// ==============================forgot password things=====================
// send forgot pass reset link via email
export const sendResetLink=async (req,res)=>
{
  try{
    const {email}=req.body;
    if(!email)
      return res.status(400).send("Email cannot be empty");
    const user = await User.findOne({ email:email}).exec();
    if(!user)
      return res.status(400).send("Email does not exist");
    else
    {   let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
		    }
        const url = `http://localhost:3000/user/reset?id=${user._id}&token=${token.token}/`;
        await sendEmail(user.email, "Password Reset", url);
        res
          .status(200)
          .send(`A password reset link has been sent to ${email}`);
    }
  }catch(err)
  {
    console.log(err);
    res.status(400).send("Something went wrong");
  }
}


// verify url
export const verifyUrl=async(req,res)=>
{
  try{
      const user = await User.findOne({ _id:req.params.id });
      if(!user) return res.status(400).json({msg:"Invalid user id",valid:false});

      const checkToken = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!checkToken) return res.status(400).json({msg:"Invalid token",valid:false});
      
		  res.status(200).json({msg:"Valid link",valid:true});
  }catch(err)
  {
    console.log(err);
    res.status(400).json({msg:"Something went wrong",valid:false});
  }
}

// reset to new password
export const resetPassword=async(req,res)=>
{
  try{
    const {password,confirmPassword}=req.body;
    if(!password || password.length < 6)
      return res.status(400).send("Password is required and should be min 6 characters long");
    if(password!==confirmPassword)
      return res.status(400).send("Passwords do not match");
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid id");
    const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send("Invalid token");
    const hashedPassword=await hashPassword(password);
    user.password = hashedPassword;
		await user.save();
		await token.delete();
		res.status(200).send("Password reset successfully");
  }catch(err){
    console.log(err);
    res.status(400).send("Something went wrong");
  }
}
// ======================================================================

// exe======================
export const exe_addProject=async (req,res)=>
{
  try{
    const {project}=req.body;
    // pass data to model
    const data=new exe_User({project});
    // save it in database
    await data.save().then(async()=>
    {
      return res.status(200).send(`Project ${project} saved in database`);
    })

  }catch(err)
  {
    console.log(err);
    return res.status(400).send('Error,Try again please');
  }
}

export const exe_addAllDetails=async (req,res)=>
{
  try{
    const {fname,lname,email,gender,interests}=req.body;

    const user=new exe_User({fname,lname,email,gender,interests});
    const check = await exe_User.findOne({ email:email}).exec();
    if(check)
      return res.status(400).send(`Email ${email} is already used`);
    else
    {
      await user.save().then(async()=>
      {
        return res.status(200).send(`${fname} ${lname}'s details saved`);
      })
    }
  }catch(err)
  {
    console.log(err);
    return res.status(400).send("Something went wrong");
  }
}

export const exe_findUser=async (req,res)=>
{
  try{
    // get the user email
    const {search_email}=req.body;
    const user = await exe_User.findOne({ email:search_email,disabled:false}).exec();
    if(user)
      return res.status(200).send(`User found \n ${user}`);
    else
      return res.status(400).send("NOT_FOUND");
  }catch(err)
  {
    console.log(err);
  }
}

export const exe_updateName=async (req,res)=>
{
  try{
    // get the details
    const {update_email,fnameTo,lnameTo}=req.body;
    console.log(update_email);

    const user = await exe_User.findOne({ email:update_email,disabled:false }).exec();
    if(user)
    {
      await exe_User.updateOne(
        { email: update_email },
        { $set: { fname: fnameTo,lname:lnameTo} }
      ).then(async()=>
      {
        const display= await exe_User.findOne({email:update_email,disabled:false}).exec();
        return  res.status(200).send(`Name changed to ${fnameTo} ${lnameTo} \n*DOCUMENT*\n${display}`);
      })
    }
    else
      return res.status(400).send(`No user with email ${update_email} found`);
  }catch(err)
  {
    console.log(err);
  }
}



export const exe_disableUser=async (req,res)=>
{
  try{
    const{disable_email}=req.body;
    const check = await exe_User.findOne({ email:disable_email,disabled:false}).exec();
    if(check)
    {
      await exe_User.updateOne(
        { email: disable_email },
        { $set: { disabled:true} }
      ).then(async()=>
      {
        return res.status(200).send(`User ${disable_email} disabled`)
      })
    }
    else
      return res.status(400).send(`Email ${disable_email} does not exist or already disabled`);
   
  }catch(err)
  {
    console.log(err);
    return res.status(400).send(`Something went wrong`)

  }
}

export const exe_enableUser=async (req,res)=>
{
  try{
    const{enable_email}=req.body;
    const check = await exe_User.findOne({ email:enable_email,disabled:true}).exec();
    if(check)
    {
      await exe_User.updateOne(
        { email: enable_email },
        { $set: { disabled:false} }
      ).then(async()=>
      {
        return res.status(200).send(`User ${enable_email} enabled`)
      })
    }
    else
      return res.status(400).send(`Email ${enable_email} does not exist or is already enabled`);
  }catch(err)
  {
    console.log(err);
    return res.status(400).send(`Something went wrong`);
  }
}

