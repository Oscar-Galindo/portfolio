# Portfolio Site 🚀

My super cool portfolio to get awesome jobs!

## How to Start 🏁

```bash
# 1. Install stuff
npm install

# 2. Copy the secret file
cp .env.example .env
# (Ask me for the real secrets!)

# 3. Run it!
npm run dev
# Go to http://localhost:4321
```

## The Cool Tech We Use 🛠️

- **Astro** - Makes websites SUPER fast
- **UnoCSS** - Like Tailwind but even faster!
- **Contentful** - Where we put our content (like a blog)
- **Cloudinary** - Makes images load fast
- **Vercel** - Puts our site on the internet

## Folders 📁

```
src/
├── components/    # Lego blocks for the site
├── layouts/       # The main template
├── lib/           # Helper code
└── pages/         # Each page of the website
```

## Commands You Need 🎮

```bash
npm run dev      # Work on the site
npm run build    # Make it ready for the internet
npm run preview  # Check if build worked
```

## Deploy to Internet 🌍

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Pick your GitHub repo
5. Add the secret keys from `.env.example`
6. Click Deploy!

## Need Help? 🤝

- The code is in `src/`
- Images go in `public/`
- Change text in Contentful
- Dark mode works automatically!

## Problems? 🐛

```bash
# If stuff breaks:
rm -rf node_modules
npm install
npm run dev
```

## Make It Yours ✨

1. Change colors in `uno.config.ts`
2. Update info in `src/components/Hero.astro`
3. Add projects in Contentful
4. Replace example emails/links with yours

That's it! Happy coding! 🎉
