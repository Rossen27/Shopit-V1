import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) 建立一個 transporter
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    // 2) 郵件內容
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // 來自誰
    to: options.email, // 發送給誰
    subject: options.subject, // 主旨
    html: options.message, // 內容 (可以是 HTML 格式，所以可以放置 HTML 樣式或是圖片，若要改成純文字，可以將html 改為 text)
  };

  // 3) 發送郵件
  await transport.sendMail(message);
};

export default sendEmail;