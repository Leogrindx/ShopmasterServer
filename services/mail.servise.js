import nodemailer from 'nodemailer'
class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activation account on ${process.env.API_URL}`,
            text: '',
            html: 
                `<div>
                    <h1>For activation your account need to go on link</h1>
                    <a href="${link}" target="_blank">${link}</a>
                </div>
                `
        })
    }
}

export default new MailService()