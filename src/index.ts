import { join } from 'path';
import { readFileSync } from 'fs';
import { createTransport, SentMessageInfo } from 'nodemailer';

import { MailOptions, MainOptions } from './interface';
import { validateOptions } from './Utils/validation';

const defaultOptions: Pick<MainOptions,
  'secure'|
  'template'|
  'templatePath'|
  'multiLang'|
  'multiTemplate'|
  'multiLangColumn'|
  'confirmOptions'|
  'passwordOptions'
> = {
  secure: false,
  template: false,
  templatePath: join(__dirname, '..', '/templates/main.html'),
  multiLang: false,
  multiTemplate: false,
  multiLangColumn: 'lang',
  confirmOptions: {
    subject: '',
    body: 'You are being asked to confirm the e-mail address',
    btn: 'Confirm Email',
  },
  passwordOptions: {
    subject: '',
    body: 'You requested to reset your password',
    btn: 'Reset Password',
  }
};

export default (mainOptions: MainOptions) => {
  validateOptions(mainOptions);

  const smtpOptions: MainOptions = {
    ...defaultOptions,
    ...mainOptions,
  };

  const transport = createTransport({
      host: smtpOptions.host,
      port: smtpOptions.port,
      secure: smtpOptions.secure,
      auth: {
          user: smtpOptions.user,
          pass: smtpOptions.password
      },
      tls: { minVersion: 'TLSv1' }
  })


  /**
   * Generic Sender
   */
  const sendMail = (mail: MailOptions): Promise<SentMessageInfo | void> => {
    const [,link] = mail.text.split('it:\n');
    const [,appName] = mail.subject.split('for ');
    const username = decodeURIComponent(mail.text.split('username=')[1]);

    const isPasswordRecovery = mail.subject.indexOf('Password') !=-1;
    const customOptions = isPasswordRecovery ? smtpOptions.passwordOptions : smtpOptions.confirmOptions;
    
    const subject = customOptions?.subject || mail.subject;
    const body = customOptions?.body;
    const btn = customOptions?.btn;
    const options = customOptions?.others;

    let template = '';

    if (smtpOptions.template) {
        const filePath = join('./', smtpOptions?.templatePath || '');
        template = eval('`' + readFileSync(filePath).toString() + '`');
    } else {
        const filePath = join(__dirname, '..', '/templates/main.html');
        template = eval('`' + readFileSync(filePath).toString() + '`');
    }

    return transport.sendMail({
      subject,
      to: mail.to,
      from: smtpOptions.fromAddress,
      html: template
    })
      .then((info) => {
        return info
      })
      .catch(error => {
        throw error
      });
  }

  /**
   * sendVerificationEmail
   */
  const sendVerificationEmail = '';
  
  /**
   * sendPasswordResetEmail
   */
  const sendPasswordResetEmail = '';

  /**
   * Return
   */
  const returnObj = !smtpOptions.multiTemplate
    ? { sendMail }
    : {
        sendMail,
        sendVerificationEmail,
        sendPasswordResetEmail
      };

  return Object.freeze(returnObj);
}
