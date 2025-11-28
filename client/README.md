# Movie Ticket Booking System – Client Documentation  
**Modern • Fast • Beautifully Crafted**

Live Demo → https://movie-ticiket-booking-vglv.vercel.app/  
(Instant, fully working preview – powered by Vercel)

GitHub Repository → https://github.com/rohankatira/Movie_ticiket_booking-/tree/main/client

---

### Tech Stack (2025-Ready)

| Category             | Technology                                      |
|----------------------|--------------------------------------------------|
| Framework            | React 18 + Vite                                  |
| Language             | TypeScript                                       |
| Styling              | Tailwind CSS + shadcn/ui + Heroicons            |
| Routing              | React Router v6.26+                              |
| State Management     | Zustand + TanStack Query (React Query)           |
| Forms & Validation   | React Hook Form + Zod                            |
| Seat Selection       | Custom interactive seat map with real-time sync |
| Payments (Demo)      | Stripe Elements (test mode)                      |
| Notifications        | Sonner (beautiful toasts)                        |
| Animations           | Framer Motion                                    |
| Deployment           | Vercel • Netlify • Cloudflare Pages ready       |

---

### Quick Start (Under 10 seconds)

```bash
git clone https://github.com/rohankatira/Movie_ticiket_booking-.git
cd Movie_ticiket_booking-/client
npm install
npm run dev
```

Open http://localhost:5173 and start booking!

---

### Project Structure

```
client/
├── src/
│   ├── components/      # Buttons, Cards, Dialogs, Sheet
│   ├── layout/          # Header, Footer, Mobile Nav
│   ├── pages/           # Home • Movies • MovieDetail • Booking
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # API client, utils, constants
│   ├── store/           # Zustand global stores
│   ├── types/           # Full TypeScript interfaces
│   └── App.tsx + main.tsx
├── public/              # Movie posters & static assets
└── tailwind.config.cjs  # Extended with beautiful gradients
```

---

### Standout Features You’ll Love

- Instant Dark / Light mode toggle (persisted)
- Fully responsive – feels native on mobile
- Smooth seat selection with live availability colors
- Elegant booking summary sidebar (mobile bottom sheet)
- Frictionless mock login (no email needed for demo)
- Realistic Stripe checkout flow (test card: 4242 4242 4242 4242)
- Micro-interactions & page transitions powered by Framer Motion
- Toast feedback for every action

---

### API Setup

Live demo runs on a public mock API – no backend required.

Want to connect your own server?

```env
# .env.local
VITE_API_BASE=http://localhost:5000/api
```

Just drop this file in the client root and you’re connected.

---

### Deploy in One Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rohankatira/Movie_ticiket_booking-/tree/main/client)

Works instantly on Netlify, Cloudflare Pages, or Surge too.

---

Built with passion by **Rohan Katira**  
Last updated – November 28, 2025

Live Demo (again, because it’s that good) → https://movie-ticiket-booking-vglv.vercel.app/

Go ahead — book your first movie right now!  
Enjoy the modern cinema experience.