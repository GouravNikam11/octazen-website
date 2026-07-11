const ContactMessage = require('../models/ContactMessage');
const { sendEmail } = require('../utils/email');

exports.submit = async (req, res) => {
  try {
    const msg = await ContactMessage.create(req.body);

    sendEmail({
      subject: `New Contact: ${req.body.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${req.body.company || 'N/A'}</p>
        <p><strong>Service:</strong> ${req.body.service || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
      `,
    });

    res.status(201).json({ success: true, message: 'Message sent successfully', data: msg });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await ContactMessage.countDocuments(query);
    res.json({ success: true, data: messages, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id, { status: req.body.status, notes: req.body.notes }, { new: true }
    );
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
