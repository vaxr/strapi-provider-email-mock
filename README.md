# strapi-provider-email-mock
A simple in-memory mock mail provider for strapi.io

### Usage

Setup in `plugins.js` like any other provider:

```js
module.exports = ({env}) => ({
  email: {
    provider: 'mock',
    providerOptions: {},
    settings: {
      // If set to false, each email sent will be logged to console
      quiet: true,
      defaultFrom: 'strapi@example.com',
      defaultReplyTo: 'strapi@example.com',
    },
  },
});
```

Each mail sent gets pushed on the recipient's stack and can be retrieved via `.popMail(...)` as follows:

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
