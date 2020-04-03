const sgMail = require('@sendgrid/mail');
var config_data = require('../config')()

var sendMail = function sendMail( to, subject, body, body_html){
        sgMail.setApiKey(config_data.SENDGRID_API_KEY);

        let msg = {
              to: to,
              from: config_data.SENDGRID_SENDER_EMAIL,
              subject: subject,
              text: body,
              html: body_html,
            };

        console.log(sgMail.send(msg));
};

module.exports = { sendMail: sendMail };