export default function (req, res) {
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

  function makeANiceEmail(text) {
    return `
      <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
      ">
        <h2>Eadee - Your Employee Directory</h2>
        <button>${text}</button>
      </div>
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
}
