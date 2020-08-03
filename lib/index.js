'use strict';

const inboxByEmail = {};

function pushMail(email, mail) {
  inboxByEmail[email] = inboxByEmail[email] || [];
  inboxByEmail[email].push(mail);
}

function popMail(email) {
  if (!inboxByEmail[email]) return undefined;
  return inboxByEmail[email].pop();
}

module.exports = {
  pushMail: pushMail,
  popMail: popMail,
  init: (providerOptions = {}, settings = {}) => {

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          const {from, to, cc, bcc, replyTo, subject, text, html, ...rest} = options;

          let msg = {
            from: from || settings.defaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.defaultReplyTo,
            subject,
            text,
            html,
            ...rest,
          };

          if (!settings.quiet) {
            console.log(`
Mail  TO: ${msg.to}
    FROM: ${msg.from}
 SUBJECT: ${msg.subject}
    JSON: ${JSON.stringify(msg)}
    TEXT: ${msg.text.split('\n').join('\n          ')}`.trim())
          }
          pushMail(msg.to, msg);
          resolve();
        });
      },
    };
  },
};
