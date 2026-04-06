import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export function createInvoice(project) {
  const invoiceDir = path.join(process.cwd(), "public", "invoices");
  fs.mkdirSync(invoiceDir, { recursive: true });

  const invoicePath = path.join(invoiceDir, `${project.id}.pdf`);

  // ✅ stop PDFKit from loading Helvetica automatically
  const doc = new PDFDocument({
    margin: 50,
    autoFirstPage: false,
  });

  const stream = fs.createWriteStream(invoicePath);
  doc.pipe(stream);

  // create page manually AFTER setting font
  doc.addPage();
  doc.font("Times-Roman");

  const discount = project.referralSlug ? 100 : 0;
  const finalPrice = 800 - discount;
  const deposit = 400 - discount;
  const balance = finalPrice - deposit;

  doc.fontSize(24).text("CodeSprint Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Client: ${project.name}`);
  doc.text(`Email: ${project.email}`);
  doc.text(`Phone: ${project.phone}`);
  doc.moveDown();

  doc.text(`Project Total: R${finalPrice}`);
  doc.text(`Deposit Paid: R${deposit}`);
  doc.text(`Balance Due: R${balance}`);

  if (discount > 0) {
    doc.moveDown();
    doc.text(`Referral Discount Applied: R${discount}`);
  }

  doc.end();

  return `/invoices/${project.id}.pdf`;
}