const nodemailer = require('nodemailer')

async function sendMail(otp,userid,pass,name,to){

const message = `
<p style="color:red;">Hi ${name}</p>
<p>Your one time password to signup on Plantifier is:</p>
<h1>${otp} </h1>
`
let transporter = nodemailer.createTransport({
host: "smtp.mailgun.org",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
user: userid, // generated ethereal user
pass: pass, // generated ethereal password
},
});

let info = await transporter.sendMail({
from: 'plantifier2022@gmail.com ', // sender address
to: to, // list of receivers
subject: "Signup Verification", // Subject line
text: "Hello world?", // plain text body
html: message, // html body
});

console.log("Message sent: %s", info.accepted , info.response);

return info

}

// sendMail('mcc6i')

module.exports = sendMail