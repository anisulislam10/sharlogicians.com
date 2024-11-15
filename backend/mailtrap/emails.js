import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"
export const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}]
try {
    const response = await mailtrapClient.send({
        from:sender,
        to:recipient,
        subject:"Verify Your Email",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category: "Email Verification"
    })
    console.log("Verification Sends Successfully -- please check your inbox");
    
} catch (error) {
    console.log("Error in Email Sending ");
    
}
}