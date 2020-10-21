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

       sgMail
         .send(msg)
         .then(() => {
           console.log('Email sent')
         })
         .catch((error) => {
           console.error(error)
         })
};

module.exports = { sendMail: sendMail };