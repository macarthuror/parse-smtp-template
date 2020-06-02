// You can test it with `https://ethereal.email/`

const port        = 587
const password    = '3UjDDMnF6bAd98J8sU'
const host        = 'smtp.ethereal.email'
const user        = 'trace.corwin@ethereal.email'

const text = `Hi,\n\nYou are being asked to confirm the e-mail address ${user} with appName\n\n Click here to confirm it:\nhttp://myparseapp.com/actionTest?username=YourUsername`
const subject = 'Password subject Test for appName'

const { sendMail } = require('./index.js')({ host, port, fromAddress: user, user, password })

sendMail({ subject, text, to: user })
  .then(data => {
    console.log('SEND IT ---------')
  })
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    console.log('END --------')
  })
