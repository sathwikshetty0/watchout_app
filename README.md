# WatchOut - Decentralized AI Traffic Enforcement

WatchOut is a privacy-first, decentralized network of citizens making Indian roads safer using AI-powered edge detection and evidence vaulting. The platform is compliant with the Bharatiya Sakshya Adhiniyam 2023 for legal-grade evidence submission.

## Core Features

- **Real-Time Dashcam Streaming:** WebRTC-powered low latency feed.
- **On-Device AI Inference:** Edge processing for zero-trust privacy.
- **Legal Compliance Vault:** Cryptographically sealed evidence using ECC-P256.
- **Reward Ecosystem:** Built-in wallet for validated violation captures.
- **Live Dispatch Map:** Real-time localization of traffic enforcement units.

## Getting Started

First, ensure you have your `.env.local` configured with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Database / Auth:** Supabase
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts

## License
MIT

