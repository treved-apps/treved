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
  const { data, content } = matter(fileContent);

  const title = data.title || path.basename(filePath, '.md');

  // 1. OBJAVA NA BLOGGER (preko SMTP / HTML)
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
    console.error(`Napaka pri pošiljanju na Blogger za ${filePath}:`, error);
  }

  // 2. OBJAVA NA DEV.TO (preko REST API / Markdown)
  const devToApiKey = process.env.DEVTO_API_KEY;

  if (devToApiKey) {
    try {
      const response = await fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': devToApiKey,
        },
        body: JSON.stringify({
          article: {
            title: title,
            body_markdown: content,
            published: true, // Nastavi na false, če želiš najprej osnutek (draft)
            description: data.summary || '',
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log(`Uspešno poslano na Dev.to: ${title} (${resData.url})`);
      } else {
        const errData = await response.json();
        console.error(`Napaka Dev.to API (${response.status}):`, errData);
      }
    } catch (error) {
      console.error(`Napaka pri povezavi z Dev.to za ${filePath}:`, error);
    }
  } else {
    console.warn('DEVTO_API_KEY ni nastavljen v okoljskih spremenljivkah. Dev.to objava preskočena.');
  }


  // 3. OBJAVA NA MASTODON
  const mastodonToken = process.env.MASTODON_TOKEN;
  const mastodonServer = process.env.MASTODON_SERVER || 'https://mastodon.social';

  if (mastodonToken) {
    try {
      // Mastodon ima omejitev dolžine besedila, zato pošljemo naslov in povzetek
      const statusText = `${title}\n\n${data.summary || ''}`;

      const response = await fetch(`${mastodonServer}/api/v1/statuses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mastodonToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: statusText,
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log(`Uspešno poslano na Mastodon: ${title} (${resData.url})`);
      } else {
        const errData = await response.json();
        console.error(`Napaka Mastodon API (${response.status}):`, errData);
      }
    } catch (error) {
      console.error(`Napaka pri povezavi z Mastodonom za ${filePath}:`, error);
    }
  }


  
}
