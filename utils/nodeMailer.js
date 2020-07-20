const nodemailer = require("nodemailer");
const setup = require('../config/setup.json');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    service: setup.email.service,
    auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD,
    },
});

const renderTemplate = async (templateSource, options) => {

    try {
        let source = fs.readFileSync(path.join(__dirname, '../templates', templateSource), 'utf8');
        let template = handlebars.compile(source);
        return template(options);
    } catch (err) {
        console.error(err)
    }
    
}

const sendMail = async (options) => {
    options.url = setup.site.URL;
    options.logoURL = setup.email.logo;
    options.appName = setup.site.appName;
    options.activeMin = setup.email.tokenTime;

        try {         
            let info = await transporter.sendMail({
                from: `${setup.email.fromDisplayName} <${setup.email.sender}>`,
                to: await options.email,
                subject: await renderTemplate(`${options.template}/subject.handlebars`, options),
                html: await renderTemplate(`${options.template}/html.handlebars`, options)
            })
            
            console.log("Message Sent: ", info.messageId);

    } catch (err) {
        console.error(err)
    }
}

module.exports = { sendMail };