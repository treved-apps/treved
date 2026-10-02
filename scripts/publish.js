import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import nodemailer from 'nodemailer';

const changedFiles = process.argv.slice(2);

if (changedFiles.length === 0) {
  console.log('Ni novih ali spremenjenih .md datotek.');
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

for (const filePath of changedFiles) {
  if (!filePath.startsWith('posts/') || !filePath.endsWith('.md')) continue;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // matter() razdeli datoteko:
  // - data vsebujemo metapodatke (title, date, summary)
  // - content vsebuje zgolj vsebino (brez YAML headerja)
  const { data, content } = matter(fileContent);

  // Naslov za Subject vzamemo iz headerja ali iz imena datoteke
  const title = data.title || path.basename(filePath, '.md');

  // Pretvori samo vsebino (brez headerja) v HTML za Blogger
  const htmlContent = marked.parse(content);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.BLOGGER_EMAIL,
    subject: title,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Uspešno poslano na Blogger: ${title}`);
  } catch (error) {
    console.error(`Napaka pri pošiljanju ${filePath}:`, error);
  }
}
