# Open Resume Builder

An open-source resume builder inspired by Notion and Medium. Create, edit, and export your resume with a modern, clean interface.

## Features

- 📝 WYSIWYG Resume Editor
- 📱 Responsive Design
- 🖨️ PDF Export
- 📊 ATS-Friendly Format
- 🎨 Clean, Modern UI
- 🚀 No Authentication Required
- 💾 Local Storage Only

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Tiptap Editor
- Puppeteer (PDF Export)

## Deployment Options

### Option 1: Netlify Deployment

1. Fork this repository
2. Connect your fork to Netlify:
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Choose your repository
   - Build settings are automatically configured via `netlify.toml`

3. Your site will be deployed automatically. Netlify will handle:
   - Build process
   - Asset optimization
   - CDN distribution
   - HTTPS certification

### Option 2: Docker Self-Hosting

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/open-resume.git
   cd open-resume
   ```

2. Using Docker Compose (recommended):
   ```bash
   docker-compose up -d
   ```
   This will:
   - Build the Docker image
   - Start the container
   - Expose the application on port 3000

3. Using Docker directly:
   ```bash
   # Build the image
   docker build -t open-resume .

   # Run the container
   docker run -d -p 3000:3000 open-resume
   ```

4. Access the application at `http://localhost:3000`

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

No environment variables are required for basic functionality. The application runs entirely in the browser.

## PDF Export Configuration

PDF export functionality uses Puppeteer, which is configured to run in both Netlify and Docker environments. No additional setup is required.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
