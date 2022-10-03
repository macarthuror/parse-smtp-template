import { MainOptions } from "../interface";
import { PORT_REGEX, HOST_REGEX, EMAIL_REGEX } from './regex'

export function validateOptions(options: MainOptions): void
{
  if (
    !options
    || !options.host
    || !options.port
    || !options.fromAddress
    || !options.user
    || !options.password
  ) {
    throw 'SMTP mail adapter requires Host, Port, FromAddress, User and Password'
  }

  if (!HOST_REGEX.test(options.host)) throw 'Invalid Host Name'
  if (!PORT_REGEX.test(String(options.port))) throw 'Invalid Port'
  if (!EMAIL_REGEX.test(options.fromAddress)) throw 'Invalid From Address'
}
