const nodemailer = require('nodemailer');

let transporter;

const isEmailConfigured = () => {
  if (process.env.EMAIL_SKIP === 'true') return false;
  return Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

const getTransporter = () => {
  if (!isEmailConfigured()) return null;

  if (!transporter) {
    const port = Number(process.env.EMAIL_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return transporter;
};

const sendEmail = async ({ to, subject, html }) => {
  const transport = getTransporter();
  if (!transport) return null;

  try {
    return await transport.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: to || process.env.EMAIL_USER,
      subject,
      html,
    });
  } catch (err) {
    console.error(`📧 Email notification failed: ${err.response || err.message}`);
    if (err.code === 'EAUTH') {
      console.error('   SMTP auth failed — verify EMAIL_USER and EMAIL_PASS in backend/.env');
      console.error('   If your password contains # or @, wrap it in double quotes.');
    }
    return null;
  }
};

module.exports = { sendEmail, isEmailConfigured };
