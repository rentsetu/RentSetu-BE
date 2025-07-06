const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendPromotionalMail = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Mail to Admin
    await transporter.sendMail({
      from: `"RentSetu" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: 'New Promotion Opt-in 🚀',
      html: `<p><strong>${name}</strong> opted in for promotions using <strong>${email}</strong></p>`
    });

    // Mail to User
    await transporter.sendMail({
      from: `"RentSetu Team" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Thanks for Opting In 🙌',
      html: `<h3>Welcome to RentSetu Promotions!</h3><p>Thanks ${name}, we’ll keep you updated with our best property deals!</p>`
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error(' Mail error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
