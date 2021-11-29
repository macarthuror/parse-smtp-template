import smtp from '../src/index'

describe('required options', () => {

  const options = {
    port: 100,
    host: 'api.host.com',
    user: 'username',
    password: 'password',
    fromAddress: 'name@test.com'
  }
  const _undefined = void 0;

  it('empty options', () => {
      expect(smtp).toThrow('SMTP mail adapter requires host, port, fromAddress, user and password')
  })

  it('invalid host', () => {
      const { host, ...invalidHost } = options
      expect(() => smtp({...invalidHost, host: '.com'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: 'domain'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: 'domain.'})).toThrow('Invalid Host Name')
      expect(() => smtp({...invalidHost, host: '.domain.com'})).toThrow('Invalid Host Name')
  })

  it('invalid port', () => {
      const { port, ...invalidPort } = options
      expect(() => smtp({...invalidPort, port: 67891})).toThrow('Invalid Port')
      expect(() => smtp({...invalidPort, port: 65536})).toThrow('Invalid Port')
      expect(() => smtp({...invalidPort, port: 65537})).toThrow('Invalid Port')
  })

  it('invalid from address', () => {
      const { fromAddress, ...invalidAddress } = options
      expect(() => smtp({...invalidAddress, fromAddress: 'mail-@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: 'mail.@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: '.mail@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: '-mail@domain.com'})).toThrow('Invalid From Address')
      expect(() => smtp({...invalidAddress, fromAddress: 'mail..name@domain.com'})).toThrow('Invalid From Address')
  })

})
