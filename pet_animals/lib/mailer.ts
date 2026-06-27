
import nodemailer from "nodemailer" 
const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async  function nodeMailerLink(toEmail: string, token: string){
    try{
        const link = `http://localhost:3000/reset-password?token=${token}`;
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to : toEmail,
            subject: "Password Reset Request",
            html:`
            <h2>Reset You Password</h2>
            <p>Click the below link</p>
            <a href="${link}">Reset You password</a>
            `
        })
    }catch(error){
        console.log("Erro is generated during password reset", error);
        throw error;
    }
} 