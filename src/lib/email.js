import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // IMPORTANT for Titan 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmation(email, trackingCode) {
  const trackingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/track/${trackingCode}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your CodeSprint project has started 🚀",
    html: `
      <h2>Welcome to CodeSprint</h2>
      <p>Your website sprint has officially started.</p>
      <p>Track progress here:</p>
      <a href="${trackingUrl}">${trackingUrl}</a>
    `,
  });
}