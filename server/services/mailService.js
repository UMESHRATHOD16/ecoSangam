const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const EMAIL_USER = process.env.EMAIL_USER || process.env.EMAIL;
const EMAIL_PASS =
  process.env.EMAIL_PASS ||
  process.env.EMAIL_APP_PASSWORD ||
  'pgvo vzvj pmyd pmgj';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5175';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

async function sendWelcomeEmail({ name, email }) {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to EcoSangam</title>
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', Roboto, sans-serif;
        background: radial-gradient(circle at top, #0f5132 0%, #062a1b 45%, #02150e 100%);
        color: #e5e1d8;
      }
      .outer { width: 100%; padding: 34px 0; }
      .card {
        max-width: 640px;
        margin: 0 auto;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(229, 225, 216, 0.2);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
      }
      .header {
        padding: 28px;
        text-align: center;
        border-bottom: 1px solid rgba(229, 225, 216, 0.2);
        background: linear-gradient(135deg, rgba(10, 84, 57, 0.75), rgba(6, 52, 36, 0.8));
      }
      .brand {
        letter-spacing: 1.4px;
        font-size: 13px;
        text-transform: uppercase;
        opacity: 0.9;
        margin-bottom: 10px;
      }
      .title {
        margin: 0;
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 0.5px;
      }
      .badge {
        display: inline-block;
        margin-top: 12px;
        padding: 7px 14px;
        border-radius: 999px;
        background: rgba(229, 225, 216, 0.12);
        border: 1px solid rgba(229, 225, 216, 0.26);
        font-size: 12px;
        text-transform: uppercase;
      }
      .content { padding: 30px 34px; line-height: 1.75; font-size: 15px; }
      .card p { margin: 0 0 14px; color: rgba(229, 225, 216, 0.95); }
      .quick-tip {
        margin-top: 18px;
        padding: 14px 16px;
        border-radius: 12px;
        border: 1px solid rgba(229, 225, 216, 0.16);
        background: rgba(255, 255, 255, 0.06);
      }
      .cta-wrap { margin-top: 24px; }
      .cta {
        display: inline-block;
        background: #e5e1d8;
        color: #0e2f20 !important;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 700;
        letter-spacing: 0.2px;
      }
      .footer {
        font-size: 12px;
        color: rgba(229, 225, 216, 0.72);
        text-align: center;
        padding: 0 22px 22px;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="card">
        <div class="header">
          <div class="brand">AI Sustainability Coach</div>
          <h2 class="title">Welcome to EcoSangam 🌱</h2>
          <div class="badge">Start Your Green Streak</div>
        </div>
        <div class="content">
          <p>Hi ${name || 'Eco Warrior'},</p>
          <p>Great to have you with us! You just took your first step toward a greener lifestyle. Small daily actions create meaningful impact over time.</p>
          <div class="quick-tip">
            <p style="margin:0;"><strong>✨ Quick win:</strong> Open your dashboard and set one simple eco goal you can complete this week.</p>
          </div>
          <div class="cta-wrap">
            <a class="cta" href="http://localhost:5175/dashboard">Open My Dashboard</a>
          </div>
        </div>
        <div class="footer">
          You are receiving this email because you signed up on EcoSangam.<br />
          Keep going, one habit at a time. ♻️
        </div>
      </div>
    </div>
  </body>
  </html>`;

  await transporter.sendMail({
    from: `"EcoSangam" <${EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to EcoSangam 🌿 Let’s build your first eco habit!',
    html: htmlBody
  });
}

async function sendCertificateEmail({ name, email, filePath }) {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>EcoSangam – Eco Goal Certificate</title>
    <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', Roboto, sans-serif;
          background: radial-gradient(circle at top, #0f5132 0%, #062a1b 45%, #02150e 100%);
          color: #e5e1d8;
        }
        .outer { width: 100%; padding: 40px 0; }
        .card {
          max-width: 640px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(229, 225, 216, 0.2);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
        }
        .header {
          text-align: center;
          padding: 30px;
          border-bottom: 1px solid rgba(229, 225, 216, 0.2);
          background: linear-gradient(135deg, rgba(10, 84, 57, 0.78), rgba(6, 52, 36, 0.85));
        }
        .header h1 {
          margin: 0;
          color: #e5e1d8;
          font-size: 30px;
          letter-spacing: 1px;
        }
        .badge {
          display: inline-block;
          margin-top: 12px;
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 12px;
          text-transform: uppercase;
          border: 1px solid rgba(229, 225, 216, 0.28);
          background: rgba(229, 225, 216, 0.12);
          color: #e5e1d8;
        }
        .content { padding: 30px 34px; line-height: 1.75; font-size: 15px; }
        .content h2 { color: #e5e1d8; margin: 0 0 12px; font-size: 22px; }
        .highlight {
          margin-top: 18px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(229, 225, 216, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(229, 225, 216, 0.95);
        }
        .cta { text-align:center; margin:30px 0 8px; }
        .btn {
          background:#e5e1d8;
          color:#0e2f20 !important;
          text-decoration:none;
          padding:13px 24px;
          border-radius:10px;
          font-size:14px;
          font-weight:700;
          display:inline-block;
        }
        .footer {
          font-size:12px;
          color:rgba(229, 225, 216, 0.72);
          text-align:center;
          padding:0 20px 25px;
        }
        @media(max-width:600px){
            .content { padding:24px 22px; }
            .card { border-radius: 0; }
        }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="card">
        <div class="header">
          <h1>EcoSangam</h1>
          <div class="badge">Goal Completed</div>
        </div>
        <div class="content">
          <h2>Congratulations, ${name}! 🎉</h2>
          <p>You have successfully completed your eco goal on EcoSangam. Attached is your official certificate. 🌱</p>
          <div class="highlight">
            <strong>💚 Keep your momentum:</strong> Start your next small challenge today and continue your sustainability streak.
          </div>
          <div class="cta">
            <a class="btn" href="${FRONTEND_URL}/dashboard">View My Dashboard</a>
          </div>
        </div>
        <div class="footer">
          You’re receiving this email because you completed a certified goal on EcoSangam.<br>
          © 2026 EcoSangam. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: `"EcoSangam" <${EMAIL_USER}>`,
    to: email,
    subject: '🎉 Your Eco Goal Completion Certificate!',
    html: htmlBody,
    attachments: [
      {
        filename: path.basename(filePath),
        content: fs.createReadStream(filePath)
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}

async function sendReEngagementEmail({ name, email }) {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Your Eco Journey Is Waiting</title>
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', Roboto, sans-serif;
        background: radial-gradient(circle at top, #0f5132 0%, #062a1b 45%, #02150e 100%);
        color: #e5e1d8;
      }
      .outer { width: 100%; padding: 40px 0; }
      .card {
        max-width: 680px;
        margin: 0 auto;
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid rgba(229, 225, 216, 0.22);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 24px 55px rgba(0, 0, 0, 0.35);
      }
      .header {
        text-align: center;
        padding: 32px 26px;
        border-bottom: 1px solid rgba(229, 225, 216, 0.18);
        background: linear-gradient(135deg, rgba(10, 84, 57, 0.78), rgba(6, 52, 36, 0.9));
      }
      .badge {
        display: inline-block;
        border-radius: 999px;
        padding: 7px 14px;
        font-size: 12px;
        text-transform: uppercase;
        border: 1px solid rgba(229, 225, 216, 0.28);
        background: rgba(229, 225, 216, 0.12);
      }
      .title { margin: 14px 0 8px; font-size: 29px; font-weight: 800; }
      .subtitle { margin: 0; opacity: 0.92; font-size: 15px; }
      .content { padding: 30px 34px 12px; line-height: 1.75; }
      .block {
        margin-top: 16px;
        padding: 15px 16px;
        border-radius: 12px;
        border: 1px solid rgba(229, 225, 216, 0.16);
        background: rgba(255, 255, 255, 0.06);
      }
      .block-title { font-weight: 700; margin-bottom: 6px; }
      .actions { text-align: center; padding: 8px 34px 24px; }
      .btn {
        display: inline-block;
        text-decoration: none;
        margin: 6px;
        padding: 12px 18px;
        border-radius: 10px;
        font-weight: 700;
      }
      .btn-primary { background: #e5e1d8; color: #0e2f20 !important; }
      .btn-secondary {
        color: #e5e1d8 !important;
        border: 1px solid rgba(229, 225, 216, 0.35);
        background: rgba(255, 255, 255, 0.06);
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: rgba(229, 225, 216, 0.72);
        padding: 0 20px 24px;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="card">
        <div class="header">
          <span class="badge">AI Sustainability Coach</span>
          <h1 class="title">We miss you, ${name || 'Eco Hero'}! 🌍</h1>
          <p class="subtitle">Your carbon journey is waiting. Come back and make one small impact today.</p>
        </div>

        <div class="content">
          <p>Hi ${name || 'there'},</p>
          <p>Each action you take in EcoSangam helps reduce your footprint and build better habits. Let us pick up where you left off. 💚</p>

          <div class="block">
            <div class="block-title">📊 Option 1: Calculate your carbon footprint</div>
            <div>Open your dashboard and get an updated view of your impact in minutes.</div>
          </div>

          <div class="block">
            <div class="block-title">🧾 Option 2: Scan receipts for AI estimation</div>
            <div>Upload your receipts and let AI estimate your footprint directly, quickly, and clearly.</div>
          </div>
        </div>

        <div class="actions">
          <a class="btn btn-primary" href="${FRONTEND_URL}/dashboard">Open Dashboard</a>
          <a class="btn btn-secondary" href="${FRONTEND_URL}/calculator">Go to Calculator</a>
        </div>

        <div class="footer">
          You are receiving this reminder because you are registered with EcoSangam.<br />
          Small steps daily. Big impact yearly. ♻️
        </div>
      </div>
    </div>
  </body>
  </html>`;

  await transporter.sendMail({
    from: `"EcoSangam" <${EMAIL_USER}>`,
    to: email,
    subject: '🌱 Come back to EcoSangam — check your carbon footprint today',
    html: htmlBody
  });
}

module.exports = { sendCertificateEmail, sendWelcomeEmail, sendReEngagementEmail };
