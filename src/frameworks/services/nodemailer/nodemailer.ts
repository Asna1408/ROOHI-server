
import nodeMailer from 'nodemailer';

export const SendEmailOtp = async (name:string,email: string, otp: string): Promise<{ success: boolean }> => {
  try {

    const sendVerifyMail = async (name:string,email: string, otp: string): Promise<boolean> => {
      try {
        const https = require('https');

        const agent = new https.Agent({
          rejectUnauthorized: false,
        });

        const transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
             user: 'asnatm01@gmail.com', 
             pass: 'degc jalb wnoo tqkq'
          },
          tls: {
            rejectUnauthorized: false,
          },
          // Custom agent might not be needed if you're not working around a specific certificate issue
          // agent,
        });

        const mailOptions = {
            from: 'asnatm01@gmail.com',
            to: email,
            subject: 'Email Verification',
          html: `${otp.length > 6  ?  `<a href=${otp}>Click the link to reset password</a>` : `<p>Hi ${name}, your OTP for signing up is: ${otp}</p>`}`,
        };

        // Send email using the transporter
        await transporter.sendMail(mailOptions);
        console.log('Email has been sent');
        return true;
      } catch (error: any) {
        console.error('Error sending email:', error.message);
        return false;
      }
    };

    const sendMailResult = await sendVerifyMail(name,email, otp);

    if (sendMailResult) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    console.error('Error generating or sending OTP:', error.message);
    return { success: false };
  }
};


//no use delete it
export const sendResetPasswordEmail = async (email: string, link: string): Promise<void> => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "asnatm01@gmail.com", 
      pass: "degc jalb wnoo tqkq", 
    },
  });

  const mailOptions = {
    from: "asnatm01@gmail.com",
    to: email,
    subject: 'Password Reset Request',
    text: 'Click the following link to reset your password: <URL>',
  };

  await transporter.sendMail(mailOptions);
};