import smtp from '../src/index'
import { TransportOptions } from '../src/interface';

const options = {
  port: 587,
  host: 'smtp.ethereal.email',
  user: 'shaun.hoppe29@ethereal.email',
  password: 'RpVtQ1HZtF94dUMwwt',
  fromAddress: 'shaun.hoppe29@ethereal.email'
}

const mailOptions = {
  to: 'test.to@ethereal.email',
  subject: 'Password subject Test for appName',
  text: `Hi,\n\nYou are being asked to confirm the e-mail address ${options.fromAddress} with appName\n\n Click here to confirm it:\nhttp://myparseapp.com/actionTest?username=YourUsername`
}


describe('generic function', () => {

  const mockCallback = jest.fn((x:TransportOptions) => x);
  const { sendMail } = smtp(options, mockCallback);

  it('sender', () => {
    sendMail(mailOptions)

    expect(mockCallback.mock.calls.length).toBe(1);

    const { subject, to, from, html } = mockCallback.mock.results[0].value

    expect(to).toBe(mailOptions.to);
    expect(from).toBe(options.fromAddress);
    expect(subject).toBe(mailOptions.subject);
    // expect(html).toBe({});
  })
})
