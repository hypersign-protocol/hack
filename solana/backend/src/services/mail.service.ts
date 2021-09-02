import { logger } from '../config';

const nodemailer = require('nodemailer');
export default class MailService {
    host: any;
    port: any;
    pass: any;
    user: any;
    name: any;
    transporter: any
    constructor({ host, port, user, pass, name }) {
        this.host = host;
        this.port = port;
        this.pass = pass;
        this.user = user;
        this.name = name;

        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: true, // true for 465, false for other ports. TODO: find better way to work with it
            auth: {
                user: this.user,
                pass: this.pass,
            },
        });

        this.transporter.verify((err, success) => {
            if (err) console.error(err);
            logger.info('mainServeice:: Your email config is correct');
        });

    }

    async sendEmail(to, message, subject) {
        const info = await this.transporter.sendMail({
            from: `${this.name} <${this.user}>`,
            to,
            subject: subject,
            html: message
        });
        return info;
    }
}