export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "HTML / CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Git / GitHub", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "AWS", category: "Tools" },
  { name: "CI/CD", category: "Tools" },
];

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  videoUrl: string;           // YouTube embed URL for the vlog
  blogContent: string;        // markdown‑style long‑form content
}

export const projects: Project[] = [
  {
    slug: "shipwatch-live",
    title: "ShipWatch Live",
    tagline: "A GitHub repository monitoring dashboard with real-time alerts and activity tracking.",
    description:
      "ShipWatch Live is a full-stack developer tool that connects to your GitHub account via OAuth and receives webhook events from your repositories. It surfaces push activity, flags suspicious commits (bug fixes, large pushes, hotfixes), and gives you a live feed of what's happening across all your repos in one place.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "GitHub API"],
    githubUrl: "https://github.com/SephrixEvonaut/ShipWatchLive",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    blogContent: `
## The Problem

When you're working across multiple repositories — personal projects, freelance work, side experiments — it's easy to lose track of what's happening where. You miss a push to main, a hotfix you forgot about, or a repo that's gone stale. There's no single view that gives you the full picture.

## What ShipWatch Live Does

ShipWatch Live solves this by acting as a real-time monitoring layer on top of GitHub. Once you connect your GitHub account, the app registers webhooks on your selected repositories and starts receiving push events. Every commit, every branch push, every large batch of changes lands in your dashboard instantly.

### Key Features
- **GitHub OAuth integration** — connect your account securely and select which repos to monitor
- **Real-time activity feed** — see every push event as it happens, with commit messages, authors, and timestamps
- **Smart alerting** — automatic flags for bug fixes, hotfixes, crashes, and large pushes (10+ commits)
- **Inactivity detection** — alerts when a connected repo has had no pushes in 7 days
- **Stats at a glance** — total repos, pushes today, active alerts summarized at the top of the dashboard

## How It's Built

The frontend is Next.js with the App Router, using server components to fetch live data from Supabase on every request. Supabase handles both the auth session and the database — GitHub webhook payloads are stored in a \`webhook_events\` table and queried directly in the dashboard server component.

### Architecture
- **Auth**: Supabase Auth with GitHub OAuth provider
- **Webhooks**: GitHub sends \`push\` events to a Next.js API route, which validates and writes them to Supabase
- **Dashboard**: Server-rendered page that queries Supabase for recent events, computes alerts, and renders them — no client-side polling needed
- **Alert logic**: Scans recent commits for keywords (fix, bug, hotfix, patch, crash, broken) and flags direct pushes to main/master

## Use Case

If you're a developer managing several active projects, ShipWatch Live gives you a command center view. Instead of checking each repo individually or relying on email notifications, you get one feed with smart signal extraction — so you can focus on what actually needs attention.

## What I Learned

Integrating GitHub webhooks end-to-end was the most interesting part of this build. The flow — OAuth install → webhook registration → payload validation → database write → server-rendered query — required careful coordination between GitHub's App API and Supabase's realtime infrastructure. It reinforced how much power server components unlock for data-heavy dashboards.
    `,
  },
  {
    slug: "gesturekit",
    title: "GestureKit",
    tagline: "A per-key gesture detection engine that turns tap patterns into macro sequences.",
    description:
      "GestureKit is a local Node.js application that listens to keyboard input and detects gesture patterns — single taps, double taps, long presses, and combinations — then executes configurable macro sequences with human-like timing randomization. Built for SWTOR but applicable to any keyboard-driven workflow.",
    technologies: ["Node.js", "TypeScript", "RobotJS", "Vitest"],
    githubUrl: "https://github.com/SephrixEvonaut/Gesturekit",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    blogContent: `
## The Problem

PC games and productivity apps often require complex, multi-step key sequences executed with precise timing. Doing this manually is slow, inconsistent, and exhausting over a long session. Existing macro tools either lack the nuance needed for gesture-based triggering or are too simplistic for per-key independent detection.

## What GestureKit Does

GestureKit intercepts keyboard input globally (even when another window is focused), classifies each key's tap pattern into one of 12 gesture types, and executes a bound macro sequence in response. Each key operates independently, so you can have simultaneous gestures on different keys without interference.

### Gesture Types
- **Single / Double / Triple / Quadruple** — based on tap count
- **Short / Long / Super Long** — based on how long the final tap is held
- Combined: 4 counts × 3 durations = **12 gesture types per key**

### Key Features
- **22 input keys** monitored simultaneously (WASD, 1-6, mouse buttons, and more)
- **Per-key isolation** — each key's gesture detection runs independently
- **Human-like timing** — randomized delays (configurable min/max) between each keypress in a sequence
- **Multiple backends** — RobotJS (default), Interception Driver (kernel-level), or Mock (testing)
- **JSON profiles** — define all macros in a simple config file, no code changes needed

## How It Works

The input listener hooks into the OS-level keyboard event stream. When a key event arrives, it's dispatched to that key's dedicated GestureDetector instance. The detector tracks tap timing against configurable thresholds (long press: 80–145ms, super long: 146–265ms) and resolves the gesture type once the key sequence completes.

Once a gesture is resolved, GestureDetector emits the event and the executor fires the bound macro sequence — pressing each key in order with randomized delay between presses.

### Profile Format

\`\`\`json
{
  "trigger": { "key": "1", "gesture": "double" },
  "sequence": [
    { "key": "a", "minDelay": 25, "maxDelay": 30, "echoHits": 1 },
    { "key": "b", "minDelay": 30, "maxDelay": 40, "echoHits": 2 }
  ]
}
\`\`\`

## Use Case

Originally built for SWTOR to handle ability rotations without requiring superhuman button timing, GestureKit is useful any time you want to bind complex sequences to simple gesture inputs — games, DAWs, video editing, or accessibility tools.

## Engineering Highlights

The trickiest design challenge was per-key isolation with concurrent execution. If keys A and B are both mid-gesture simultaneously, they need completely independent state machines. I solved this with a Map of per-key detector instances that never share state, plus a traffic controller to prevent modifier key collisions when two macros run simultaneously.
    `,
  },
  {
    slug: "agent-support",
    title: "Agent Support",
    tagline: "An advanced macro system with GCD management, Discord integration, and calibration tooling.",
    description:
      "Agent Support extends the GestureKit engine with production-grade features: a Global Cooldown manager that emulates SWTOR's 1.275s GCD timing, a Discord bot for remote control and notifications, a hardware-calibration system for latency tuning, and Omega profile support for high-complexity rotation sequences.",
    technologies: ["Node.js", "TypeScript", "Discord.js", "Supabase", "RobotJS"],
    githubUrl: "https://github.com/SephrixEvonaut/AGENT_SUPPORT",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    blogContent: `
## What It Is

Agent Support is the production evolution of GestureKit. It keeps the same per-key gesture detection core but layers in several systems that are necessary for sustained real-world use in a game like SWTOR — where timing, cooldown management, and sequence correctness have real consequences.

## Core Additions

### Global Cooldown (GCD) Manager

SWTOR has a 1.275-second global cooldown after any GCD ability. Agent Support emulates this in software:

- Tracks the GCD timer independently of macro execution
- Queues the most recently requested GCD ability and fires it the moment the cooldown expires
- Handles per-ability cooldowns separately from the GCD
- Falls back gracefully when a long/super-long gesture variant has no binding

This means you can queue abilities ahead of the GCD and the system will execute them at exactly the right moment — no manual timing required.

### Discord Integration

A Discord bot that connects to your server and allows:
- **Remote status checks** — query the agent's current state from your phone
- **Macro notifications** — get a message when a macro fires or an error occurs
- **Profile switching** — change active macro profiles without touching the terminal

### Calibration System

Input latency varies by system, and a 5ms miscalibration can cause an ability to fire a GCD too early. The calibration system:
- Runs a series of timed test sequences and measures actual vs. expected timing
- Generates a calibrated profile that compensates for measured latency
- Stores calibration results as named JSON profiles for reuse

### Omega Profiles

Omega profiles are a higher-order configuration format that express complex SWTOR rotations as priority-ordered ability lists rather than flat macro sequences. The Omega Gesture Detector resolves which ability to fire based on cooldown state, GCD availability, and priority rank — essentially turning static macros into a dynamic rotation engine.

## Architecture

- **Gesture engine** — same per-key isolator as GestureKit, extended with GCD awareness
- **Traffic controller** — prevents modifier key collisions when concurrent sequences are executing
- **Profile compiler** — precomputes conundrum key sets at load time so the traffic controller has zero runtime overhead
- **Discord controller** — WebSocket connection to Discord Gateway, responds to slash commands
- **Calibration server** — local HTTP server that accepts timing measurements from a test harness

## Use Case

This is the full toolkit for someone running a complex SWTOR rotation who needs more than a simple macro — they need a system that understands game timing, manages ability priority, and can be controlled remotely. The Discord integration in particular was motivated by wanting to adjust profiles mid-session without alt-tabbing.
    `,
  },
  {
    slug: "fence-for-hire",
    title: "Fence For Hire",
    tagline: "A professional service website for a fence company with a contact lead system.",
    description:
      "Fence For Hire is a full-stack business website built for a fence installation company. It showcases the company's services and products, handles customer inquiries through a validated contact form, and is built with a clean component-based architecture designed to be maintainable and easily extended.",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "shadcn/ui", "Tailwind CSS"],
    githubUrl: "https://github.com/SephrixEvonaut/Fence_For_Hire",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    blogContent: `
## The Brief

A local fence company needed a professional web presence that could showcase their services and capture customer leads. The site needed to look polished, load fast, and make it easy for potential customers to request a quote.

## What It Does

Fence For Hire is a multi-page marketing and lead-capture site. Visitors can browse the company's services, view fence product options, read about the company, and submit a contact inquiry. The backend captures and stores those inquiries for follow-up.

### Key Features
- **Service and product showcase** — clean product grid with imagery and descriptions
- **Contact form** — validated with Zod schemas on both client and server, preventing bad data from reaching the database
- **Persistent lead storage** — form submissions stored in PostgreSQL via Drizzle ORM
- **Accessible UI components** — built with shadcn/ui (Radix UI primitives), which provides WAI-ARIA compliance out of the box
- **Responsive design** — mobile-first layout with breakpoints for tablet and desktop

## Tech Stack Decisions

**Why Vite + React?** Fast dev experience with HMR, mature ecosystem, straightforward to deploy as a static site.

**Why Express + Drizzle + Neon?** A lightweight API layer was needed to handle form submissions securely without exposing database credentials to the client. Drizzle gives type-safe queries without the overhead of a heavy ORM, and Neon's serverless PostgreSQL is a good fit for a site with low but important write traffic.

**Why shadcn/ui?** The component library provides a solid design system foundation without locking into a specific look-and-feel. Every component is customizable at the source level, which made it easy to apply the company's navy and gold brand colors.

## Architecture

The app is a monorepo with a shared schema package:

- **client/** — Vite + React SPA, communicates with the Express backend via TanStack Query
- **server/** — Express API with Drizzle-powered routes for form submission and user data
- **shared/** — Zod schemas and Drizzle table definitions shared between frontend and backend for consistent validation

## What I Learned

Building for a real business client is different from building for a portfolio. The design decisions were guided by the customer's brand identity, not personal preference. Working within those constraints — navy blue, gold, professional tone, mobile-first — was a useful exercise in translating a brief into a finished product.
    `,
  },
  {
    slug: "what-to-wear",
    title: "What To Wear",
    tagline: "A weather-aware wardrobe app that recommends clothing based on real-time conditions.",
    description:
      "What To Wear connects to the OpenWeatherMap API to fetch current weather conditions for your location, then filters a personal clothing database to surface outfits appropriate for the temperature. Users can add, categorize, and manage their clothing items directly in the app.",
    technologies: ["React", "React Router", "Vite", "OpenWeatherMap API", "ESLint"],
    githubUrl: "https://github.com/SephrixEvonaut/se_project_react",
    liveUrl: "https://sephrixevonaut.github.io/se_project_react/",
    videoUrl: "https://www.youtube.com/embed/5yZC2Jhgyh8",
    blogContent: `
## The Idea

Picking what to wear sounds trivial until you realize you're standing in front of your closet, unsure whether today is a jacket day. The idea was simple: pull in real weather data and show only the clothing that actually makes sense for the conditions.

## How It Works

The app fetches current weather from the OpenWeatherMap API using the user's location. The temperature is mapped to one of three categories — **hot**, **warm**, or **cold** — and the clothing card database is filtered to show only items tagged for that category.

### Key Features
- **Live weather integration** — fetches current temperature and conditions from OpenWeatherMap
- **Clothing card database** — each item stores an image, name, and weather category (hot / warm / cold)
- **Add your own items** — a modal form lets users add new clothing pieces and tag them for the appropriate weather
- **Filtered display** — the main view automatically shows only weather-appropriate clothing
- **Persistent card storage** — clothing items are stored and retrieved from a backend database

## Technical Highlights

### Dual API Architecture
The app coordinates two data sources: the public OpenWeatherMap API for weather and a private clothing database for user items. Both are queried on load and combined in the rendering logic — weather determines which subset of clothing cards to display.

### Modal-Driven UX
Adding a new item opens a modal with a form for the item image URL, name, and weather category. This keeps the main view clean while still making the action discoverable. React Router handles navigation between the main wardrobe view and any detail pages.

### Component Structure
The app is structured around three main areas:
- **Header** — displays current weather and the add-item button
- **Card grid** — renders filtered clothing items based on current conditions
- **Modal** — form for creating new clothing entries

## Use Case

Anyone building out a capsule wardrobe or trying to make mornings less chaotic. The filtering logic means you're never looking at winter coats when it's 85°F outside — only the relevant items surface.

## What I Learned

This project was my first time coordinating multiple external APIs in a React app. Managing loading states and error cases for two independent data sources — one public (weather), one private (clothing DB) — required thinking carefully about async flow and how to handle partial failures gracefully.
    `,
  },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/tyler-mcrae-b23ab421b/",
  github: "https://github.com/SephrixEvonaut",
  email: "tylermcrae480@gmail.com",
  phone: "781-608-9584",
};
