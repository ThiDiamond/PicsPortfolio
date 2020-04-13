const nodemailer = require('nodemailer');

module.exports = {
    
    async sendEmail(req, res) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS},
        });
        

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo:  req.body.email,
            subject: 'EMAIL FROM ' + req.body.name,
            text: req.body.text,
        }).then((info) =>{
            res.send(info);
        }).catch((error) => {
            
            return res.status(400).send({error});
        })

    }
}