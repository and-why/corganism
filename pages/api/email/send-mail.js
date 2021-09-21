export default (req, res) => {
  require('dotenv').config();
  let nodemailer = require('nodemailer');
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
  });
  function html({ url, email }) {
    const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`;

    // Some simple styling options
    const backgroundColor = '#f9f9f9';
    const textColor = '#333333';
    const mainBackgroundColor = '#ffffff';
    const buttonBackgroundColor = '#f4a261';
    const buttonBorderColor = '#f4a261';
    const buttonTextColor = '#ffffff';

    return `
  <body style="background: ${backgroundColor};">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          <strong>Eadee - Your Employee Directory</strong>
        </td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          You have been invited to Eadee, your Employee Directory. Please complete the sign up process as <strong>${escapedEmail}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Finish Sign Up</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
  }

  function text({ url }) {
    return `You have been invited to join Eadee - Your Employee Directory. \nPlease complete the sign up process here:\n${url}\n\n`;
  }

  const formattedEmail = encodeURIComponent(req.body.email);

  const emailData = {
    url: `${process.env.NEXTAUTH_URL}/signup/company/${req.body.companyId}?email=${formattedEmail}`,
    email: req.body.email,
  };

  const mailData = {
    to: req.body.email,
    from: 'noreply@eadee.co',
    subject: 'You have been invited to Eadee - Employee Directory!',
    text: text(emailData),
    html: html(emailData),
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      console.log(info);
      res.send('success');
    }
  });
};
