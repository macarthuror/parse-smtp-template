"use strict";
const fs = require("fs")
const path = require('path')
const nodemailer = require("nodemailer")

var SmtpMailAdapter = mailOptions => {
    if (!mailOptions || !mailOptions.host || !mailOptions.port || !mailOptions.fromAddress || !mailOptions.user || !mailOptions.password) {
        throw "SMTP mail adapter requires host, port, fromAddress, user and password"
    }

    var _templates = mailOptions.template || false
    var _templatePath = mailOptions.templatePath || ""

    var transport = nodemailer.createTransport({
        host: mailOptions.host,
        port: mailOptions.port,
        auth: {
            user: mailOptions.user,
            pass: mailOptions.password
        }
    });

    var sendMail = mail => {
        let link = mail.text.split("it:\n")[1];
        let username = mail.text.split("username=")[1];
        let appName = mail.subject.split("for ")[1];
        var filePath = "";
        var template = "";
        
        let subject = mail.subject.indexOf("Password") !=-1 
                        ? mailOptions.passwordSubject || mail.subject 
                        : mailOptions.confirmSubject || mail.subject 

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

    return Object.freeze({
        sendMail: sendMail
    });
}

module.exports = SmtpMailAdapter