const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = (to, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Hesabınızı Doğrulayın',
        text: `Hesabınızı doğrulamak için şu bağlantıya tıklayın: http://localhost:3000/VerifyPage/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('E-posta gönderildi: %s', info.messageId);
    });
};

module.exports = { sendVerificationEmail };
