# strapi-provider-email-mock
A simple in-memory mock mail provider for strapi.io

### Usage

```js
const email = require('strapi-provider-email-mock');

test('send email to provider', async done => {
  // send mail
  const recipient = 'foo@example.com';
  const sender = 'bar@example.com';
  await strapi.plugins['email'].services.email.send({
    to: recipient,
    from: sender,
    subject: 'Test',
    text: 'You may safely delete this mail.',
  });

  // pop off the recipient's personal mail stack 
  const mail = email.popMail(recipient);
  if (!mail) fail('No mail received.')
  expect(mail.text).toContain('delete this');

  done();
});
```
