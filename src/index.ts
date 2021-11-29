import fs from 'fs'
import { join } from 'path'
import { createTransport } from 'nodemailer'

import { MainOptions } from './interface'
import { PORT_REGEX, HOST_REGEX, EMAIL_REGEX } from './regex'


const defaultOptions = {
  secure: false,
  template: false,
  templatePath: join(__dirname, '..', '/templates/main.html'),
  multiLang: false,
  multiTemplate: false,
  multiLangColumn: "lang"
}

export default (options: MainOptions) => {
  if (
      !options
      || !options.host
      || !options.port
      || !options.fromAddress
      || !options.user
      || !options.password
    ) {
    throw 'SMTP mail adapter requires host, port, fromAddress, user and password'
  }

  if (!HOST_REGEX.test(options.host)) throw 'Invalid Host Name'
  if (!PORT_REGEX.test(String(options.port))) throw 'Invalid Port'
  if (!EMAIL_REGEX.test(options.fromAddress)) throw 'Invalid From Address'

  options = {
    ...defaultOptions,
    ...options,
  }

  console.log(options)

  // const transport = createTransport({
  //     host: options.host,
  //     port: options.port,
  //     secure: options.secure,
  //     auth: {
  //         user: options.user,
  //         pass: options.password
  //     },
  //     tls: { minVersion: "TLSv1" }
  // })
  
}