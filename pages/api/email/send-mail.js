export default (req, res) => {
  require('dotenv').config();
  let nodemailer = require('nodemailer');
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
  });
  const backgroundColor = '#f9f9f9';
  const textColor = '#444444';
  const mainBackgroundColor = '#ffffff';
  const buttonBackgroundColor = '#346df1';
  const buttonBorderColor = '#346df1';
  const buttonTextColor = '#ffffff';
  function makeANiceEmail(text) {
    return `
    <body style="background: ${backgroundColor};">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          <strong>${escapedHost}</strong>
        </td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          Sign in as <strong>${escapedEmail}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
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

  const mailData = {
    to: req.body.email,
    from: 'noreply@eadee.co',
    subject: 'You have been invited to Eadee - Employee Directory!',
    html: makeANiceEmail(`Please finish the sign up process here:
      <a href="${process.env.NEXTAUTH_URL}/signup/company/${req.body.companyId}?email=${req.body.email}">Click Here to reset</a>`),
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
