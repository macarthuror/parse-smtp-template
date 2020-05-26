"use strict";
const fs = require("fs")
const path = require('path')
const nodemailer = require("nodemailer")

/**
 * Main function to send emails.
 *
 * @alias    SmtpMailAdapter
 *
 * Required
 * @param {Object}   mailOptions                Parameters from the parse declaration.
 * @param {Object}   mailOptions.host           used to create the Transport frunction of nodemailer.
 * @param {Object}   mailOptions.port           used to create the Transport frunction of nodemailer.
 * @param {Object}   mailOptions.user           used to create the Transport frunction of nodemailer.
 * @param {Object}   mailOptions.password       used to create the Transport frunction of nodemailer.
 * @param {Object}   mailOptions.fromAddress    used to create the Transport frunction of nodemailer.
 * Optionals
 * /- nodemailer Option -/
 * @param {boolean}   [secure=false]            Deside if you connect with your SMTP server with a secure connection.
 * /- sendMail Options -/
 * @param {boolean}   [template=false]          Define if use the default template or a custom one.
 * @param {String}    [templatePath=""]         Path of the custom template.
 * 
 * @param {Object}    passwordOptions           Object with all the minimum data to customize the password email.
 * @param {Object}    passwordOptions.btn       Text of the action button.
 * @param {Object}    passwordOptions.body      Text of the email body.
 * @param {Object}    passwordOptions.subject   Subject of the password recovery email.

 * @param {Object}    confirmOptions            Object with all the minimum data to customize the confirm email.
 * @param {Object}    confirmOptions.btn        Text of the action button.
 * @param {Object}    confirmOptions.body       Text of the email body.
 * @param {Object}    confirmOptions.subject    Subject of the confirmation email.
 * /- Multi Template Options -/
 * @param {boolean}   [multiTemplate]           If is True you can use a different template for email confirmation and password recovery.
 * @param {String}    [confirmTemplatePath]     Path of the template file.
 * @param {String}    [passwordTemplatePath]    Path of the template file.
 * 
 * @param {boolean}   [multiLang]               When is True the emails can be send in different languages depending on the "lang" colum of the user object.
 * @param {Object}    [multiLangPass]           Object with all the translations for the password recovery email.
 * @param {Object}    [multiLangConfirm]        Object with all the translations for the confirmation email.
 *
 * @return {Object} returns one or three functions, depending if you are using multiTemplate
 */
var SmtpMailAdapter = mailOptions => {
    if (!mailOptions || !mailOptions.host || !mailOptions.port || !mailOptions.fromAddress || !mailOptions.user || !mailOptions.password) {
        throw "SMTP mail adapter requires host, port, fromAddress, user and password"
    }

    var _templates = mailOptions.template || false;
    var _templatePath = mailOptions.templatePath || "";
    var _multiTemplate = mailOptions.multiTemplate || false;
    var _multiLang = mailOptions.multiLang || false;
 
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
     * In the template you can use only 6 variables from Parse.
     * - link
     * - btn
     * - body
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
     * @param {Object}  mail            From parse, it contains the minimum to send the mail
     * @param {String}  mail.to         Recipient's email
     * @param {String}  mail.text       Email body with the link and username
     * @param {String}  mail.subject    Email subject
     *
     * @return {type}
     */
    var sendMail = mail => {
        let link = mail.text.split("it:\n")[1];
        let appName = mail.subject.split("for ")[1];
        let username = decodeURIComponent(mail.text.split("username=")[1]);
        var filePath = "";
        var template = "";
        const confirmOptions = mailOptions.confirmOptions || {};
        const passwordOptions = mailOptions.passwordOptions || {};
        
        let subject = mail.subject.indexOf("Password") !=-1 
                        ? passwordOptions.subject || mail.subject 
                        : confirmOptions.subject || mail.subject;

        let body = mail.subject.indexOf("Password") !=-1 
                        ? passwordOptions.body || "You requested to reset your password" 
                        : confirmOptions.body || "You are being asked to confirm the e-mail address";
        
        let btn = mail.subject.indexOf("Password") !=-1 
                        ? passwordOptions.btn || "Reset Password" 
                        : confirmOptions.btn || "Confirm Email";

        let options = mail.subject.indexOf("Password") !=-1 
                        ? passwordOptions.others || {} 
                        : confirmOptions.others || {};

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

    /**
     * Summary. (use period)
     *
     * Description. (use period)
     *
     * @since      2.0.0
     * @access     private
     *
     * @alias    sendVerificationEmail
     * @memberof SmtpMailAdapter
     *
     * @see  sendMail/MailAdapter
     * @link node_modules\parse-server\lib\Adapters\Email\MailAdapter.js
     *
     * @param {Object}     data            Data from Parse Server.
     * @param {String}     data.link       Link to verify the email.
     * @param {String}     data.appName    Name of your App.
     * @param {ParseUser}  data.user       The object of the user you want to ferify.
     *
     * @param {Object}     mailOptions.confirmOptions           Manimum options to send the email
     * @param {Object}     mailOptions.confirmOptions.btn       Text of the email action button.
     * @param {Object}     mailOptions.confirmOptions.body      Text of the email budy
     * @param {Object}     mailOptions.confirmOptions.subject   Email subject.
     * 
     * @param {String}     mailOptions.confirmTemplatePath      Path of the template file.

     * @param {Boolean}    [_multiLang]                         If it's true you can send the emails in different languages (depending on the lang colum in the _User object).
     * @param {Object}     [mailOptions.multiLangConfirm]       Object with all the translations.
     * 
     * @return
     */
    var sendVerificationEmail = data => {
        if(!mailOptions.confirmTemplatePath || !mailOptions.confirmOptions) {
            throw "You need to add a template for the confirmation emails and pass the options";
        } else if(_multiLang && !mailOptions.multiLangConfirm) {
            throw "To use multiLang in the templates needs to pass the multiLangPass object with the translations";
        } else if(!mailOptions.confirmOptions 
                    || !mailOptions.confirmOptions.subject
                    || !mailOptions.confirmOptions.body
                    || !mailOptions.confirmOptions.btn) {
            throw "You need to set the 'confirmOptions' object with subject, body and btn"
        }

        const user = data.user.attributes;
        const link = data.link;
        const appName = data.appName;
        const defOptions = mailOptions.confirmOptions;
        const options = mailOptions.passwordOptions.others || {};
        const langOptions = mailOptions.multiLangConfirm
            ? mailOptions.multiLangConfirm[user.lang] : {};

        let subject = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.subject
                        : defOptions.subject

        let body = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.body
                        : defOptions.body
        
        let btn = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.btn
                        : defOptions.btn

        let filePath = path.join("./", mailOptions.confirmTemplatePath);
        let template = eval('`' + fs.readFileSync(filePath).toString() + '`');

        var senderOptions = {
            from: mailOptions.fromAddress,
            to: user.email,
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

    /**
     * Sends an email to recover the password with a template
     *
     * Description. (use period)
     *
     * @since      2.0.0
     * @access     private
     *
     * @alias    sendPasswordResetEmail
     * @memberof SmtpMailAdapter
     *
     * @see  sendMail/MailAdapter
     * @link node_modules\parse-server\lib\Adapters\Email\MailAdapter.js
     *
     * @param {Object}     data            Data from Parse Server.
     * @param {String}     data.link       Link to recover the password.
     * @param {String}     data.appName    Name of your App.
     * @param {ParseUser}  data.user       The object of the user you want to ferify.
     * 
     * @param {Object}     mailOptions.passwordOptions          Description of optional variable.
     * @param {Object}     mailOptions.passwordOptions.btn      Text of the email action button.
     * @param {Object}     mailOptions.passwordOptions.body     Text of the email budy
     * @param {Object}     mailOptions.passwordOptions.subject  Email subject.
     * 
     * @param {String}     mailOptions.passwordTemplatePath     Path of the template file.

     * @param {Boolean}    [_multiLang]                         If it's true you can send the emails in different languages (depending on the lang colum in the _User object).
     * @param {Object}     [mailOptions.multiLangPass]          Object with all the translations.
     *
     * @return
     */
    var sendPasswordResetEmail = data => {
        if(!mailOptions.passwordTemplatePath || !mailOptions.passwordOptions) {
            throw "You need to add a template for the password recovery emails";
        } else if(_multiLang && !mailOptions.multiLangPass) {
            throw "To use multiLang in the templates needs to pass the multiLangPass object with the translations"; 
        } else if(!mailOptions.passwordOptions 
            || !mailOptions.passwordOptions.subject
            || !mailOptions.passwordOptions.body
            || !mailOptions.passwordOptions.btn) {
    throw "You need to set the 'passwordOptions' object with subject, body and btn"
}
        
        const user = data.user.attributes;
        const link = data.link;
        const appName = data.appName;
        const defOptions = mailOptions.passwordOptions;
        const options = mailOptions.passwordOptions.others || {};
        const langOptions = mailOptions.multiLangPass
            ? mailOptions.multiLangPass[user.lang] : {};

        let subject = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.subject
                        : defOptions.subject

        let body = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.body
                        : defOptions.body
        
        let btn = (_multiLang && typeof langOptions !== 'undefined')
                        ? langOptions.btn
                        : defOptions.btn

        let filePath = path.join("./", mailOptions.passwordTemplatePath);
        let template = eval('`' + fs.readFileSync(filePath).toString() + '`');
        
        var senderOptions = {
            from: mailOptions.fromAddress,
            to: user.email,
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

    return (_multiTemplate !== true) 
    ? Object.freeze({ sendMail: sendMail })
    : Object.freeze({
        sendMail: sendMail,
        sendVerificationEmail: sendVerificationEmail,
        sendPasswordResetEmail: sendPasswordResetEmail
    });
}

module.exports = SmtpMailAdapter;