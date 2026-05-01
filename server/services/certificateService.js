const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateCertificate({ name, goal, startDate, endDate, carbonSaved, streak }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([1000, 700]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  const centerX = (text, fontSize, fontUsed) =>
    (pageWidth - fontUsed.widthOfTextAtSize(text, fontSize)) / 2;

  const formatDate = (input) => {
    if (!input) return 'N/A';
    const dt = new Date(input);
    if (Number.isNaN(dt.getTime())) return String(input);
    return dt.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const safeName = (name || 'Eco Champion').trim();
  const safeGoal = (goal || 'Sustainability Goal').trim();
  const safeCarbon = Number.isFinite(Number(carbonSaved))
    ? Number(carbonSaved).toFixed(2)
    : String(carbonSaved || '0');
  const safeStreak = Number.isFinite(Number(streak)) ? Number(streak) : 0;

  const logoCandidates = [
    process.env.CERTIFICATE_LOGO_PATH,
    '/Users/rathodram/.cursor/projects/Users-rathodram-Desktop-Projects-ecosangam-trae/assets/image-f2c1a0f0-7245-4bcd-9f3e-ffc0eef2a9f9.png',
    path.join(__dirname, '../../client/public/ecosangamlogo.png'),
    path.join(__dirname, '../../client/public/ecosangamlogo.jpg'),
  ].filter(Boolean);

  const loadLogo = async () => {
    for (const candidate of logoCandidates) {
      try {
        if (!fs.existsSync(candidate)) continue;
        const bytes = fs.readFileSync(candidate);
        const ext = path.extname(candidate).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg') {
          return await pdfDoc.embedJpg(bytes);
        }
        return await pdfDoc.embedPng(bytes);
      } catch (err) {
        // Keep trying fallback candidates.
      }
    }
    return null;
  };

  // Background gradient-like layered blocks (EcoSangam dark green theme)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(0.03, 0.1, 0.07)
  });
  page.drawRectangle({
    x: 0,
    y: pageHeight * 0.45,
    width: pageWidth,
    height: pageHeight * 0.55,
    color: rgb(0.05, 0.22, 0.15)
  });
  page.drawRectangle({
    x: 36,
    y: 36,
    width: pageWidth - 72,
    height: pageHeight - 72,
    color: rgb(0.1, 0.23, 0.17),
    opacity: 0.92
  });
  page.drawRectangle({
    x: 48,
    y: 48,
    width: pageWidth - 96,
    height: pageHeight - 96,
    borderColor: rgb(0.9, 0.88, 0.82),
    borderWidth: 1.8
  });

  // Header
  const brandText = 'EcoSangam';
  page.drawText(brandText, {
    x: centerX(brandText, 26, fontBold),
    y: pageHeight - 120,
    size: 26,
    font: fontBold,
    color: rgb(0.9, 0.88, 0.82)
  });

  const logoImage = await loadLogo();
  if (logoImage) {
    const logoScale = Math.min(0.22, 150 / logoImage.width);
    const logoDims = logoImage.scale(logoScale);
    page.drawImage(logoImage, {
      x: pageWidth / 2 - logoDims.width / 2,
      y: pageHeight - 95,
      width: logoDims.width,
      height: logoDims.height,
      opacity: 0.98
    });
  }

  const badgeText = 'Certificate of Achievement';
  page.drawText(badgeText, {
    x: centerX(badgeText, 14, font),
    y: pageHeight - 146,
    size: 14,
    font,
    color: rgb(0.62, 0.88, 0.72)
  });

  let y = pageHeight - 215;

  const title = 'Sustainability Excellence Certificate';
  const titleSize = 38;
  page.drawText(title, {
    x: centerX(title, titleSize, fontBold),
    y,
    size: titleSize,
    font: fontBold,
    color: rgb(0.9, 0.88, 0.82)
  });

  y -= 44;
  const subtitle = 'This certificate is proudly awarded to';
  page.drawText(subtitle, {
    x: centerX(subtitle, 17, font),
    y,
    size: 17,
    font,
    color: rgb(0.78, 0.88, 0.82)
  });

  y -= 48;
  page.drawText(safeName, {
    x: centerX(safeName, 34, fontBold),
    y,
    size: 34,
    font: fontBold,
    color: rgb(0.95, 0.93, 0.86)
  });
  const nameWidth = fontBold.widthOfTextAtSize(safeName, 34);
  page.drawLine({
    start: { x: pageWidth / 2 - nameWidth / 2, y: y - 8 },
    end: { x: pageWidth / 2 + nameWidth / 2, y: y - 8 },
    thickness: 1.6,
    color: rgb(0.62, 0.88, 0.72)
  });

  y -= 40;
  const descOne = 'for successfully completing an eco goal and creating measurable climate impact';
  page.drawText(descOne, {
    x: centerX(descOne, 14, font),
    y,
    size: 14,
    font,
    color: rgb(0.8, 0.9, 0.84)
  });

  y -= 36;
  const statBoxX = 120;
  const statBoxY = y - 130;
  const statBoxW = pageWidth - 240;
  const statBoxH = 142;

  page.drawRectangle({
    x: statBoxX,
    y: statBoxY,
    width: statBoxW,
    height: statBoxH,
    color: rgb(0.08, 0.28, 0.2),
    opacity: 0.85
  });
  page.drawRectangle({
    x: statBoxX,
    y: statBoxY,
    width: statBoxW,
    height: statBoxH,
    borderColor: rgb(0.68, 0.9, 0.75),
    borderWidth: 1.2
  });

  const lines = [
    `Eco Goal Completed: ${safeGoal}`,
    `Total CO2 Saved: ${safeCarbon} kg`,
    `Streak Achieved: ${safeStreak} day${safeStreak === 1 ? '' : 's'}`,
    `Goal Duration: ${formatDate(startDate)} to ${formatDate(endDate)}`
  ];

  let lineY = statBoxY + statBoxH - 30;
  for (const line of lines) {
    page.drawText(line, {
      x: centerX(line, 15, fontBold),
      y: lineY,
      size: 15,
      font: fontBold,
      color: rgb(0.92, 0.95, 0.9)
    });
    lineY -= 30;
  }

  const issueLine = `Issued by EcoSangam | ${new Date().getFullYear()}`;
  page.drawText(issueLine, {
    x: centerX(issueLine, 13, fontBold),
    y: 92,
    size: 13,
    font: fontBold,
    color: rgb(0.66, 0.9, 0.75)
  });

  const gratitude = 'Together, we are building a greener tomorrow.';
  page.drawText(gratitude, {
    x: centerX(gratitude, 12, font),
    y: 72,
    size: 12,
    font,
    color: rgb(0.82, 0.9, 0.86)
  });

  const pdfBytes = await pdfDoc.save();
  const fileName = `certificate_${Date.now()}.pdf`;
  const certsDir = path.join(__dirname, '../../certs');
  fs.mkdirSync(certsDir, { recursive: true });
  const filePath = path.join(certsDir, fileName);
  fs.writeFileSync(filePath, pdfBytes);
  return filePath;
}

module.exports = { generateCertificate };


