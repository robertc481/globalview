# Global View — Construction & Architecture

A production-ready marketing site built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** — App Router, Server Components, Server Actions
- **TypeScript** — Strict typing throughout
- **Tailwind CSS** — Utility-first styling
- **Cloudinary** — Dynamic image hosting and optimization
- **Resend** — Transactional email for contact form
- **Vercel** — Deployment target

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key (server-side only) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (server-side only) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |
| `EMAIL_FROM` | Sender address for emails (must be verified in Resend) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO and sitemap |

### 3. Set up Cloudinary images

Upload images to your Cloudinary account using this folder structure:

```
globalview/
├── hero/
│   ├── glass-facade
│   ├── urban-skyline
│   └── concrete-form
├── general/
│   └── interior-light
└── projects/
    ├── the-alabaster-villa/
    │   ├── cover
    │   └── (gallery images)
    ├── ethereal-gardens/
    │   ├── cover
    │   └── ...
    └── ...
```

Without Cloudinary configured, placeholder images will display automatically.

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata, fonts
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind + custom styles
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Robots.txt configuration
│   └── portfolio/
│       ├── page.tsx        # Portfolio grid
│       └── [slug]/
│           └── page.tsx    # Individual project page
├── components/
│   ├── Header.tsx          # Responsive navigation (client)
│   ├── Footer.tsx          # Site footer
│   ├── HeroSlider.tsx      # Background image slider (client)
│   ├── AboutSection.tsx    # About section
│   ├── ServicesSection.tsx  # Services section
│   ├── PortfolioPreview.tsx # Featured projects grid
│   ├── ProjectCard.tsx     # Reusable project card
│   ├── CTASection.tsx      # Call to action
│   ├── ContactSection.tsx  # Contact section wrapper
│   └── ContactForm.tsx     # Contact form (client)
├── lib/
│   ├── cloudinary.ts       # Cloudinary URL builder + API fetch
│   ├── actions.ts          # Server Actions (contact form)
│   └── utils.ts            # Utility functions
├── data/
│   └── projects.ts         # Project data
└── types/
    └── index.ts            # TypeScript interfaces
```

## Adding Projects

Edit `data/projects.ts` to add or modify projects. Each project needs:

```typescript
{
  title: "Project Name",
  slug: "project-name",           // URL-safe, matches Cloudinary folder
  coverImage: "globalview/projects/project-name/cover",
  description: "Project description...",
  category: "Residential",
  location: "City, State",        // optional
  year: "2024",                   // optional
}
```

Then upload corresponding images to `globalview/projects/project-name/` in Cloudinary.

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Set all environment variables in your Vercel project settings.

## Performance

- Server Components by default — minimal client-side JS
- Only 3 client components: Header, HeroSlider, ContactForm
- Images optimized via Cloudinary transforms + Next.js Image
- First hero image preloaded for LCP
- Lazy loading for below-the-fold images
- No heavy UI libraries
