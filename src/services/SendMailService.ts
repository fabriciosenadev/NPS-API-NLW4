import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';

import fs from 'fs';

class SendMailService {
    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(account => {
            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path: string) {

        // read file content
        const templateFileContent = fs.readFileSync(path).toString("utf8");

        // prepare via parse context of template making a parse
        const mailTemplateParse = handlebars.compile(templateFileContent);

        // prepare html using user data
        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            from: "NPS <noreplay@nps.com.br>",
            to,
            subject,
            html
        })

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

// export a new instance about this service
export default new SendMailService();

/** dependecies used: nodemailer, ethereal, handlebars
 *
 * nodemailer: a module to send emails
 * doc: https://nodemailer.com/about/
 *
 * ethereal: SMTP server
 * doc: http://ethereal.email/
 * 
 * handlebars: lika a mustache template
 * doc: https://handlebarsjs.com/guide/
 *
 */