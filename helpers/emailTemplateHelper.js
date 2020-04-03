var jade = require('jade');
var templateDir = './views/email-templates';

const registrationTemplate = function (name, organisation){
    html_message = jade.renderFile(templateDir+'/registration-html.jade', { name : name, organisation : organisation});
    text_message = jade.renderFile(templateDir+'/registration-text.jade', { name : name, organisation : organisation});
    return { html : html_message, text:text_message };
}

module.exports = { registrationTemplate : registrationTemplate }