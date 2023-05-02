const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const nodemailMailGun = require('nodemailer-mailgun-transport');
module.exports = class EmailEngine {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstname;
        this.url = url;
        this.from = `SportsPadi <${process.env.MAILGUN_MAIL_FROM}>`;
    }

    newTransport () {
        const auth = {
            auth: {
                api_key: 'key-e3809c6bd7fb97a3ec336f255e5ea52b',
                domain: 'email.pensms.com'
            }
        };

        return nodemailer.createTransport(nodemailMailGun(auth));

        // // For production
        // if (process.env.NODE_ENV === 'production') {
        //     return nodemailer.createTransport(nodemailMailGun(auth));
        // }

        // For development
        // return nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     auth: {
        //         user: process.env.EMAIL_USERNAME,
        //         pass: process.env.EMAIL_PASSWORD
        //     }
        // })
    }

    async send(template, subject){
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject: subject
        });

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: htmlToText.fromString(html)
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

}