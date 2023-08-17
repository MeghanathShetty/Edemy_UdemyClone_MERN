import bcrypt from 'bcrypt';
const nodemailer = require("nodemailer");
require("dotenv").config():

export const hashPassword=(password)=>
{
    return new Promise((resolve,reject)=>
    {
        bcrypt.genSalt(12,(err,salt)=>
        {
            if(err)
            {
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>
            {
                if(err)
                {
                    reject(err)
                }
                resolve(hash);
            })
        })
    })
}

export const comparePassword=(password,hashed)=>
{
    return bcrypt.compare(password,hashed);
}

export const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: 'gmail',
			port: 465,
			secure: true,
			auth: {
				user:process.env.VERIFY_EMAIL,
				pass:process.env.VERIFY_EMAIL_PASS,
			},
		});

		await transporter.sendMail({
			from: "vehiclebreakmca@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
