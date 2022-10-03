import smtp from '../src/index'

describe('required options', () => {

  const options = {
    port: 587,
    host: 'smtp.ethereal.email',
    user: 'username',
    password: 'password',
    fromAddress: 'name@test.com'
  }
  const _undefined = void 0;

  it('empty options', () => {
      expect(smtp).toThrow('SMTP mail adapter requires Host, Port, FromAddress, User and Password')
  })

  it('invalid host', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { host, ...invalidHost } = options
      expect(() => smtp({...invalidHost, host: '.com'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: 'domain'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: 'domain.'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: '.domain.com'})).toThrow('Invalid Host Name')
  })

  it('invalid port', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { port, ...invalidPort } = options
      expect(() => smtp({...invalidPort, port: 67891})).toThrow('Invalid Port')
      expect(() => smtp({...invalidPort, port: 65536})).toThrow('Invalid Port')
      expect(() => smtp({...invalidPort, port: 65537})).toThrow('Invalid Port')
  })

  it('invalid from address', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { fromAddress, ...invalidAddress } = options
      expect(() => smtp({...invalidAddress, fromAddress: 'mail-@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: 'mail.@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: '.mail@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: '-mail@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: 'mail..name@domain.com'})).toThrow('Invalid From Address')
  })

})
