"use strict";
const fs = require("fs")
const path = require('path')
const nodemailer = require("nodemailer")

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      1.0.0
 * @access     private
 *
 * @alias    SmtpMailAdapter
 *
 * Required
 * @param {Object}   mailOptions    Parameters from the parse declaration  
 * @param {Object}   mailOptions.host    Parameters from the parse declaration  
 * @param {Object}   mailOptions.port    Parameters from the parse declaration  
 * @param {Object}   mailOptions.user    Parameters from the parse declaration  
 * @param {Object}   mailOptions.password    Parameters from the parse declaration  
 * @param {Object}   mailOptions.fromAddress    Parameters from the parse declaration  
 * Optionals
 * /- nodemailer Option -/
 * @param {boolean}   [secure=false]  Description of optional variable with default variable.
 * /- SmtpMailAdapter Options -/
 * @param {boolean}   [template=false]  Description of optional variable with default variable.
 * @param {String}    [templatePath=""] Description of optional variable with default variable.
 * @param {String}    [confirmSubject=mail.subject]  Description of optional variable with default variable.
 * @param {String}    [passwordSubject=mail.subject]  Description of optional variable with default variable.
 * @param {String}    [confirmbody="You are being asked to confirm the e-mail address"]  Description of optional variable with default variable.
 * @param {String}    [passwordbody="You requested to reset your password"]  Description of optional variable with default variable.
 * /- Multi Template Options -/
 * @param {boolean}   [multiTemplate]  Description of optional variable with default variable.
 * @param {String}    [confirmTemplatePath] Description of optional variable with default variable.
 * @param {String}    [passwordTemplatePath] Description of optional variable with default variable.
 * 
 * @param {boolean}   [multiLang]  Description of optional variable with default variable.
 * @param {Object}    [pwdMultiSubject]  Description of optional variable with default variable.
 * @param {Object}    [confMultiSubject]  Description of optional variable with default variable.
 *
 * @return {Object} returns one or three functions, depending if you are using multiTemplate
 */
var SmtpMailAdapter = mailOptions => {
    if (!mailOptions || !mailOptions.host || !mailOptions.port || !mailOptions.fromAddress || !mailOptions.user || !mailOptions.password) {
        throw "SMTP mail adapter requires host, port, fromAddress, user and password"
    }

    var _templates = mailOptions.template || false
    var _templatePath = mailOptions.templatePath || ""

    // 
    var transport = nodemailer.createTransport({
        host: mailOptions.host,
        port: mailOptions.port,
        secure: mailOptions.secure || false,
        auth: {
            user: mailOptions.user,
            pass: mailOptions.password
        }
    });

    /**
     * Sends the emails with one template for both types (password recovery and email verification).
     *
     * In the template you can use only 4 variables from Parse.
     * - link
     * - username
     * - appName
     * - subject
     *
     * @since      1.0.0
     *
     * @alias    sendMail
     * @memberof SmtpMailAdapter
     *
     * @see  sendMail/MailAdapter
     * @link node_modules\parse-server\lib\Adapters\Email\MailAdapter.js
     *
     * @param {Object}  mail    From parse, it contains the minimum to send the mail
     * @param {String}  mail.to    Recipient's email
     * @param {String}  mail.text    Email body with the link and username
     * @param {String}  mail.subject    Email subject
     *
     * @return {type} Return value description.
     */
    var sendMail = mail => {
        console.log("sendMail")
        let link = mail.text.split("it:\n")[1];
        let username = mail.text.split("username=")[1];
        let appName = mail.subject.split("for ")[1];
        var filePath = "";
        var template = "";
        
        let subject = mail.subject.indexOf("Password") !=-1 
                        ? mailOptions.passwordSubject || mail.subject 
                        : mailOptions.confirmSubject || mail.subject;

        let body = mail.subject.indexOf("Password") !=-1 
                        ? mailOptions.passwordbody || "You requested to reset your password" 
                        : mailOptions.confirmbody || "You are being asked to confirm the e-mail address";

        if (_templates) {
            filePath = path.join("./", _templatePath);
            template = eval('`' + fs.readFileSync(filePath).toString() + '`');
        } else {
            filePath = path.join(__dirname, "/templates/main.html");
            template = eval('`' + fs.readFileSync(filePath).toString() + '`');
        }


        var senderOptions = {
            from: mailOptions.fromAddress,
            to: mail.to,
            subject: subject,
            html: template
        };

        return transport.sendMail(senderOptions)
            .then(() => {
                return
            })
            .catch(error => {
                throw error
            });
    };

    var sendVerificationEmail = data => {
        console.log("sendVerificationEmail")
    };

    var sendPasswordResetEmail = data => {
        console.log("sendPasswordResetEmail")
    };

    return (mailOptions.multiTemplate !== true) 
    ? Object.freeze({ sendMail: sendMail })
    : Object.freeze({
        sendMail: sendMail,
        sendVerificationEmail: sendVerificationEmail,
        sendPasswordResetEmail: sendPasswordResetEmail
    });
}

module.exports = SmtpMailAdapter