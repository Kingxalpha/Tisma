const nodemailer = require('nodemailer');


// Contact form route
const contactForm = async (req, res) =>{
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        // Define email data
        const mailOptions = {
            from: ({email:req.body.email}),
            to: process.env.EMAIL_USERNAME,
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = contactForm;
