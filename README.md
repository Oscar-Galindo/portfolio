# Portfolio - Oscar Galindo

Professional portfolio showcasing enterprise-level full stack development expertise. Built with Astro, Contentful CMS, and Cloudinary. Features scalable architecture, performance optimization, and modern web technologies. Specializing in React, Node.js, AWS, and cloud-native solutions for high-impact projects.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Add your API keys

# Start development server
npm run dev
# Open http://localhost:4321

# Build for production
npm run build
```

## 💼 Tech Stack

- **Framework:** Astro (Static Site Generator)
- **CMS:** Contentful (Headless CMS)
- **Media:** Cloudinary (Image Optimization)
- **Styling:** UnoCSS / Tailwind
- **Deployment:** Vercel
- **Language:** TypeScript

## ✨ Features

- ⚡ Lightning-fast performance (95+ Lighthouse score)
- 🎨 Dark/Light mode with system preference detection
- 📱 Fully responsive design
- 🖼️ Optimized image loading with Cloudinary
- 📝 Dynamic content management via Contentful
- 🔍 SEO optimized with meta tags
- 🎯 Structured data for better search visibility
- 🚀 Automated CI/CD with GitHub Actions

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Contentful account
- Cloudinary account
- Vercel account (for deployment)

### Environment Variables

Create a `.env` file:

```env
# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token

# Cloudinary
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site Config
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_EMAIL=your@email.com
```

### Contentful Setup

1. Create content models for:
   - Projects
   - Skills
   - Experience
   - Testimonials

2. Run setup script (optional):
```bash
node scripts/setup-contentful.js
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/    # Astro components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route pages
│   ├── lib/          # Utilities & integrations
│   └── styles/       # Global styles
├── public/           # Static assets
├── scripts/          # Setup & build scripts
└── .github/          # GitHub Actions workflows
```

## 🚀 Deployment

### Staging
- Push to `staging` branch
- Automatically deploys to staging URL

### Production
- Merge to `main` branch
- Automatically deploys to production

## 📄 License

MIT