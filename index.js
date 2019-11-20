const _SMTP = require("./src/smtp")

module.exports = (mailOptions) => {
    return _SMTP(mailOptions)
}
