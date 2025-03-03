import puppeteer from 'puppeteer';
import type { ResumeData } from '@/types/resume';

export async function generatePDF(resumeData: ResumeData): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // Set the page size to US Letter
    await page.setViewport({
      width: 816, // 8.5 inches at 96 DPI
      height: 1056, // 11 inches at 96 DPI
      deviceScaleFactor: 2, // For better quality
    });

    // Inject the resume data and render it
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              margin: 0;
              size: letter;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          <div id="resume-content"></div>
          <script>
            document.getElementById('resume-content').innerHTML = 
              \`${JSON.stringify(resumeData)}\`;
          </script>
        </body>
      </html>
    `);

    // Generate PDF
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    return pdf;
  } finally {
    await browser.close();
  }
} 