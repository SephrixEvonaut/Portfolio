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
  { name: "Vite", category: "Frontend" },
  { name: "Electron", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Webhooks", category: "Backend" },
  { name: "WebSockets", category: "Backend" },
  { name: "Claude API", category: "AI / Integrations" },
  { name: "GitHub App API", category: "AI / Integrations" },
  { name: "n8n", category: "AI / Integrations" },
  { name: "AI Pipeline Design", category: "AI / Integrations" },
  { name: "Git / GitHub", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "AWS", category: "Tools" },
  { name: "CI/CD", category: "Tools" },
  { name: "Vitest", category: "Tools" },
  { name: "Serial Communication", category: "Hardware / Systems" },
  { name: "USB HID", category: "Hardware / Systems" },
  { name: "Real-time Event Systems", category: "Hardware / Systems" },
  { name: "State Machine Design", category: "Hardware / Systems" },
];

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  videoUrl: string;
  videos?: { title: string; url: string }[];
  introVideoId: string | null;
  blogContent: string;
}

export const projects: Project[] = [
  {
    slug: "shipwatch-live",
    title: "ShipWatch Live",
    tagline: "A GitHub repository monitoring dashboard with real-time alerts and activity tracking.",
    description:
      "ShipWatch Live is a full-stack developer tool that connects to your GitHub account via a GitHub App and receives webhook events from your repositories. It surfaces push activity, flags suspicious commits (bug fixes, large pushes, hotfixes), and gives you a live feed of what's happening across all your repos in one place.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "GitHub API", "n8n", "Claude API"],
    githubUrl: "https://github.com/SephrixEvonaut/ShipWatchLive",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/gqwdvOVAnVM",
    introVideoId: "gqwdvOVAnVM",
    videos: [
      { title: "Shipwatch Intro — What It Is & Why It Exists", url: "https://www.youtube.com/embed/gqwdvOVAnVM" },
      { title: "Shipwatch Tutorial — Setup, Dashboard & AI Review Pipeline", url: "https://www.youtube.com/embed/hfYrpWgz-Ko" },
      { title: "Shipwatch History — Architecture Decisions & How It Was Built", url: "https://www.youtube.com/embed/CGqgRmKW9hA" },
    ],
    blogContent: `
## The Problem

When you're working across multiple active repositories, it's easy to lose the thread. A hotfix lands on main at midnight, a large batch of commits from a collaborator changes something you rely on, or a repo quietly goes stale. Email notifications drown in noise. Checking each repo individually doesn't scale. There was no tool that gave me one opinionated view of what actually mattered across my entire GitHub account.

## What ShipWatch Live Does

ShipWatch Live is a real-time monitoring dashboard that installs as a GitHub App, receives signed webhook events from every connected repository, and surfaces the activity that deserves attention. The distinguishing feature is the AI review pipeline: any commit in the feed can be sent to Claude for a full code review, and any problem Claude identifies can be fixed with a single button click that commits the corrected code directly back to the repository.

### Key Features
- **GitHub App installation** — connects via the GitHub App flow (not plain OAuth), granting per-installation tokens scoped to specific repositories
- **HMAC-SHA256 webhook verification** — every incoming payload is verified against GitHub's signature before processing, unauthenticated requests are rejected immediately
- **Real-time activity feed** — push events, branch activity, commit authors, and timestamps rendered as they arrive
- **Smart alerting** — automatic flags for bug-fix keywords (fix, bug, hotfix, patch, crash, broken), large pushes (10+ commits), direct pushes to main or master, and inactivity when a repo goes silent for 7+ days
- **AI commit review** — the Review button on any commit fetches the full diff plus up to 15 of the most-changed source files, sends them to an n8n workflow connected to Claude, and renders a structured analysis in a modal (summary, issues, severity, suggestions)
- **One-click auto-fix** — the Fix button on any AI-identified issue fetches the current file and its SHA, sends it to a separate n8n AI fix workflow, receives corrected file content, and commits it back via the GitHub Contents API — all without leaving the dashboard

## Architecture

The full pipeline from installation to auto-fix:

**GitHub App Install → OAuth Callback → Supabase upsert → webhook registration → HMAC-verified event → database write → server-rendered dashboard → AI review → one-click commit**

### GitHub App Authentication

ShipWatch Live authenticates as a GitHub App using RS256-signed JWTs, not a user OAuth token. On installation, the callback route receives the installation ID, generates an installation access token scoped to that install, and upserts a record in the \`github_installations\` table in Supabase. All subsequent API calls on behalf of a repository use that installation token rather than user credentials.

### Webhook Pipeline

GitHub delivers signed \`push\`, \`installation\`, \`installation_repositories\`, and \`ping\` events to \`/api/github/webhook\`. The handler computes the expected HMAC-SHA256 digest using the shared webhook secret and rejects any payload where the signature does not match. Verified push payloads are written to the \`webhook_events\` table with the installation ID, event type, repository name, branch, commit count, and the full payload stored as \`jsonb\` for flexible querying.

### AI Review — \`/api/review-commit\`

When the Review button fires, the route handler:
1. Fetches the commit diff from GitHub using the installation token
2. Parses changed files, sorts them by lines changed (descending), and fetches the full content of up to 15 files
3. Sends the diff and file contents to an n8n webhook endpoint
4. n8n passes the payload to Claude with a structured review prompt
5. The response is normalized across multiple possible envelope shapes and returned as a typed analysis object

The modal renders the result as a collapsible review with severity indicators and per-issue suggestions.

### One-Click Auto-Fix — \`/api/apply-fix\`

When a Fix button fires on a specific suggestion:
1. Fetches the current file content and its blob SHA from GitHub
2. Sends the file content, the suggested fix description, and context to a separate n8n AI fix workflow
3. n8n asks Claude to produce corrected file content
4. The corrected content is base64-encoded and committed back via a PUT to the GitHub Contents API using the blob SHA as the update guard
5. The dashboard reflects the fix without a page reload

### Middleware — \`proxy.ts\`

A Next.js middleware layer runs on every request. It refreshes the Supabase session cookie from the request headers, protects all \`/dashboard\` routes by redirecting unauthenticated users to the login page, and explicitly allows \`/api/github/webhook\` through without an auth check — since GitHub's webhook delivery cannot carry a session cookie.

### Database Schema

Two Supabase tables underpin the app:

- **\`webhook_events\`** — \`installation_id\`, \`event_type\`, \`repository\`, \`branch\`, \`commit_count\`, \`payload\` (jsonb), \`created_at\`
- **\`github_installations\`** — \`user_id\`, \`installation_id\`, \`account_login\`, \`account_avatar_url\`, \`repositories\` (jsonb), \`updated_at\`

Row Level Security is enabled on both tables so users only see data tied to their own GitHub App installation.

### Dashboard

The dashboard page is a Next.js server component. On each request it queries Supabase for recent webhook events and the user's installations, computes alerts inline (no background job), and renders the activity feed and stats bar server-side. No client-side polling. The activity feed component is a client component responsible for the Review/Fix button interactions and AI modal state.

## What I Learned

The GitHub App authentication model is meaningfully different from plain OAuth and requires more care. JWT generation with RS256, installation token scoping, and the distinction between user-granted access and installation-granted access all took deliberate study. The AI pipeline end-to-end — fetching context, routing through n8n, normalizing Claude's response shape, and committing corrected code back via the Contents API — turned out to be the most architecturally interesting part of the project. It forced me to think carefully about error states at each step: what happens if the diff is too large, if n8n times out, if the blob SHA is stale by the time the fix commit fires.
    `,
  },
  {
    slug: "gesturekit",
    title: "GestureKit",
    tagline: "A real-time gesture detection and input automation engine with per-key state machines and a full Electron dashboard.",
    description:
      "A real-time gesture detection and input automation engine built in TypeScript/Node.js. GestureKit intercepts global keyboard input, classifies press patterns into gestures using independent per-key state machines, and executes bound macro sequences through one of three output backends, including a custom Teensy 4.0 USB HID device. Features a full Electron dashboard for live monitoring, profile management, and per-key calibration. In less fancy words? Think of DDR and Guitar Hero. Multi-taps, combo/toggle presses, and various lengths of keydowns all become new expressions where you can decide what they emit in each unique circumstance you specify.",
    technologies: ["TypeScript", "Node.js", "Electron", "React", "RobotJS", "Teensy 4.0", "Vitest", "Tailwind CSS"],
    githubUrl: "https://github.com/SephrixEvonaut/Gesturekit",
    liveUrl: "#",
    videoUrl: "https://www.youtube.com/embed/placeholder",
    introVideoId: null,
    videos: [
      { title: "Project Overview", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Dashboard Walkthrough", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Gesture Detection Deep Dive", url: "https://www.youtube.com/embed/placeholder" },
    ],
    blogContent: `
## Disclaimer

It is very important to me that I say this upfront. GestureKit works astronomically better with the hardware integration option of a Teensy 4.0 (20-30$ on Amazon last I checked). The polling rate of inputs gets bottlenecked very quickly when you are not able to funnel the outputs per device instead of the whole operating system executing one queue.

GestureKit is for accessibility and novelty non-exploitative ergonomic uses only. I started making this project after a couple of years of friendship with 3 different people who experience a wide range of forearm, wrist, and general hand/finger disabilities. They use Svalboards (svalboard.com) for everyday office work and one of them uses an Azeron Cyborg (azeron.com) for gaming to assist with their limited mobility. GestureKit became my attempt at furthering their accessibility options and variations of output triggers by diversifying the accepted gestures a key can execute and detect.

It is not a product or something I am selling so I do not say this out of liability concern, but out of advocacy that users consider their intentions with this project. It is a personal project that I use for my own convenience and to the benefit of my friends.

## The Problem

PC games and productivity applications often demand complex, precisely-timed multi-key sequences executed repeatedly over hours. Performing these manually is fatiguing, inconsistent, and error-prone during long sessions. Existing macro tools treat the keyboard as a single device. They cannot distinguish simultaneous gestures on different keys, lack hold-duration awareness, and produce output with fixed timing that feels robotic and is trivially detectable by pattern analysis.

## What GestureKit Does

GestureKit hooks into the OS-level keyboard event stream globally (even when another window is focused) and routes each key event to that key's dedicated, independent state machine. Each state machine classifies the press pattern into a gesture type, then fires the bound macro sequence through an executor that applies multi-layer human-like timing randomization. Every key operates in complete isolation. You can perform simultaneous gestures on different keys without interference, and multiple macro sequences execute concurrently.

## Architecture Overview

The system follows a clean pipeline architecture:

Input Capture → Gesture Detection → Binding Lookup → Cooldown Gating → Traffic Control → Sequence Execution → Key Output

The input listener captures global keyboard and mouse events via node-global-key-listener, normalizes key names, tracks modifier state, and dispatches to the active gesture detector. The detector resolves the gesture type, the binding lookup finds the matching macro, and the executor sends the output key sequence through the selected backend with randomized inter-key timing, echo hits for ability confirmation, and modifier-aware traffic control to prevent key collisions.

## Gesture Detection Systems

GestureKit implements two complete detection systems, selectable at startup.

### Alpha System — 12 Gestures

The original system using elongating multi-press windows. Supports single, double, triple, and quadruple taps, each with normal, long, and super long hold variants.

- 4 tap counts × 3 hold durations = 12 gesture types per key
- Elongating detection window with configurable timing
- Long and super long variants fall back to each other when one is unbound
- Await jail mechanism prevents accidental triggers after rapid multi-taps

### Omega System — 13 Gestures (Primary)

A streamlined system designed for low-latency responsiveness. Long gestures fire immediately when the hold threshold is crossed with no waiting for key release.

- **quick / long** — base gestures
- **quick_toggle / long_toggle** — while W or Y is held past threshold
- **quick_f2 / long_f2** — F2 toggle layer
- **quick_q_toggle / long_q_toggle** — Q modifier layer
- **quick_s_toggle / long_s_toggle** — S group targeting layer
- **combo_7_4** — chord gesture where key 4 fires during key 7 hold
- Instant-quick optimization: if no long binding exists for a key, quick fires immediately on release with zero delay

## Per-Key Calibrated Thresholds

Each of the 33 monitored input keys has an independently calibrated hold-duration threshold that determines the quick to long boundary. These thresholds are derived from a calibration wizard that collects timing samples from the user's actual keypresses and computes statistical boundaries with confidence scores. The system adapts to individual typing characteristics. A key you naturally hold slightly longer gets a higher threshold.

## Execution Pipeline

Macro sequences are more than simple key replay. Each step in a sequence supports:

- **Buffer tiers** — low (129–163ms), medium (229–263ms), high (513–667ms) inter-key delays
- **Echo hits** — rapid re-presses during the buffer phase (1–4 hits) to ensure ability registration despite game lag, with tier-aware timing ranges
- **Dual key presses** — two keys pressed near-simultaneously with configurable offset
- **Hold-through-next** — a modifier key held down through the next step's execution and released mid-buffer
- **Scroll steps** — mouse wheel output with configurable magnitude
- **Timer steps** — TTS countdown announcements via the say package
- **Traffic control** — modifier-aware conflict resolution that only delays output when the conflicting modifier (Shift/Alt) is actually physically held

## Human-Like Timing Randomization

All timing values pass through a multi-layer randomization system that produces distributions matching natural human motor patterns:

- **Hash-based entropy** — MurmurHash3 mixing for deterministic but random-looking values
- **Gaussian sweet-spot bias** — configurable probability boosts toward values humans naturally produce (e.g. 29ms and 33ms key-down durations)
- **History-based correction** — tracks recent output and adjusts weights to maintain realistic distributions over time
- **Per-value noise overlay** — final entropy layer that prevents detectable periodicity

This replaces a naive Math.random() approach and produces output that passes statistical tests (Kolmogorov-Smirnov, chi-squared, autocorrelation, runs test), all implemented in the frontend for live verification.

## Three Output Backends

### RobotJS

Uses the Windows SendInput API. Easiest setup. Shares the input queue with mouse movement, causing potential stutter under heavy output. Mitigated by RepeatPolice (deduplication), Output Pacing (cyclic delays), and Queue Pressure monitoring.

### Interception

Kernel-level driver. Input is indistinguishable from physical keyboard events. Lowest latency, maximum application compatibility. Requires driver installation.

### Teensy 4.0

USB HID via serial. A physical Teensy microcontroller acts as a real USB keyboard. Output goes through a separate USB device with zero host CPU contention, no mouse stutter, and no queue pressure. Serial protocol: KEY:keyname:duration. Includes auto-reconnect on USB disconnect.

The executor automatically routes key output to the active backend. In Teensy mode, all software-mode workarounds (RepeatPolice, Output Pacing, Queue Pressure monitoring) are disabled since they are unnecessary.

## Multi-Character Profile System

GestureKit supports 7 character-specific profiles (built for SWTOR classes), each defining unique ability bindings while inheriting shared targeting and utility bindings. Profiles configure D key behavior (continuous R-stream toggle for Tank, burst cycles with configurable timing for Rage/Mercs, or single-press for Sorcs/Sniper), S key ability (Guard with dual-key output, Cleanse, Shield Probe, etc.), per-key bindings for keys 1–6, A, B, H, I, U, and special keys, and DPS targeting with dynamic group member slot assignment including config mode, DPS designation phase, and Q+5/Q+6 intercept for target-of-target sequences.

Profiles are defined in code as TypeScript arrays of binding objects, compiled into O(1) lookup maps at startup.

## Special Key Behaviors

Several keys have behaviors that bypass the standard gesture to binding to executor pipeline:

- **D key** — toggles an R-stream (periodic R keypresses at configurable intervals) with TTS announcements. Supports continuous, burst-slow, burst-fast, and single-press modes per profile
- **S key** — dual-purpose: quick tap fires a profile-specific ability, long hold activates group member targeting mode where number keys 1–4 target specific party members
- **C key** — hybrid quick/long detection with double-tap producing Escape
- **Equals key** — gap-based tap counting (ignores hold duration) with long hold triggering R-stream
- **F2 key** — independent toggle modifier creating a separate gesture layer with long hold also triggering R-stream
- **ENTER key** — pauses and resumes the entire gesture system for chat typing

## Electron Desktop Dashboard

An 8-page React and Tailwind CSS dashboard running in Electron with full context isolation:

- **Dashboard** — engine start/stop, active profile display, calibration confidence heatmap, live gesture activity feed, queue pressure indicator
- **Input Monitor** — real-time key event stream visualization
- **Gesture Gallery** — browse and configure gesture type definitions
- **Profiles** — full CRUD with drag-and-drop key pool builder for assigning input/output keys and managing bindings
- **Calibration** — per-key calibration wizard with sample collection, statistical analysis, and confidence scoring
- **Traffic Controller** — conflict key map and queue status monitoring
- **Timing Engine** — buffer tier sample generation with live statistical verification (KS test, chi-squared, autocorrelation, runs test)
- **Execution Pipeline** — active execution monitoring

The bridge layer dynamically imports core engine modules and falls back to mock data when the engine is not available, so the dashboard works standalone for UI development.

## Engineering Highlights

### Per-Key Isolation with Concurrent Execution

The core design challenge. Each of the 33 input keys has a completely independent state machine. If keys A and B are both mid-gesture simultaneously, they run in parallel without shared state. The executor enforces per-binding overlap prevention (same macro will not stack) while allowing different macros to run concurrently.

### Modifier-Aware Traffic Control

When a macro outputs SHIFT+K, there is a risk that the physical keyboard's Shift key (held for movement) contaminates unmodified keypresses in other concurrent sequences. The compiled profile identifies which keys appear with both modified and unmodified variants, and the traffic controller only delays output when the conflicting modifier is actually physically held, checked via a live callback to the input listener's modifier state.

### Key Suppression Feedback Loop

When the executor outputs a key via RobotJS, that synthetic keypress gets captured by the global input listener and would trigger a gesture. The suppression system temporarily blocks specific keys in the gesture detector for a configurable duration after synthetic output, preventing infinite feedback loops.

### Teensy Serial Protocol with Auto-Reconnect

The Teensy communicates via a request-response protocol over serial (KEY:n:45 to OK:n). If USB disconnects mid-session, pending commands are rejected and a background reconnect loop attempts recovery up to 5 times with 2-second intervals. The engine continues running without crashing.

## Use Case

Originally built to play MMOs and type pesky emails — activities with more than 30–80 common outputs — with barely any hand movement to get where you intended to be. GestureKit is applicable to any scenario where complex, precisely-timed key sequences need to be bound to simple gesture inputs: games, DAWs, video editing, accessibility tools, or any keyboard-driven workflow requiring consistent execution over long sessions.

As for the future, I brought up Svalboards and Azeron Cyborgs as devices that already work like any normal mouse and keyboard, but I have interest down the line in seeing if I could make GestureKit work with something like a QuadStick (quadstick.com). I would need to better understand first whether their system would even benefit from my project or if the feature overlap is too redundant to bother. There are far more advanced things in the world already when it comes to assistive technology for differently abled or uniquely inclined individuals. I only aim to expand on that or create access to a tool that I could not easily find from my own searches.

## Tech Stack

- **Runtime** — Node.js 18+ with ES Modules
- **Language** — TypeScript 5 (strict mode)
- **Input Capture** — node-global-key-listener (global keyboard hooks)
- **Output** — RobotJS (SendInput), Interception driver (kernel), Teensy 4.0 (USB HID via serialport)
- **Desktop** — Electron 33 with context isolation
- **Frontend** — React 18, Vite 6, Tailwind CSS 3, Recharts, D3, Lucide icons
- **Testing** — Vitest
- **Hardware** — Teensy 4.0 microcontroller (PJRC, VID 16C0)
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
    introVideoId: null,
    videos: [
      { title: "Project Overview", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Omega Profiles & GCD Manager", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Calibration System Deep Dive", url: "https://www.youtube.com/embed/placeholder" },
    ],
    blogContent: `
## Context

Agent Support is the production layer I built on top of GestureKit to run my actual SWTOR characters. Where GestureKit is the general-purpose gesture detection engine, Agent Support is the application — 7 fully tuned character profiles, a Global Cooldown manager that understands the game's timing model, special-key behaviors that go well beyond standard macro execution, and a calibration system with a live WebSocket server for hot-reloading thresholds without restarting the engine.

## The Omega Gesture System

Agent Support runs the Omega detector exclusively. Omega was designed around SWTOR's combat pace: long gestures fire the moment the hold threshold is crossed rather than waiting for key release, which eliminates the quarter-second lag that made the Alpha system feel sluggish during active rotations.

The four base gesture types are **quick**, **long**, **quick_toggle**, and **long_toggle**. The toggle variants require W or Y to be held past threshold before the gesture fires, creating a second layer of bindings on every key without adding any physical keys to the mapping. Three modifier layers extend this further:

- **F2 layer** — F2 is an independent toggle that adds quick_f2 and long_f2 variants to every key in the system. Long-holding F2 also triggers the R-stream directly.
- **Q layer** — Q modifier adds quick_q_toggle and long_q_toggle. Used for targeting sequences and target-of-target combos.
- **S layer** — S modifier adds quick_s_toggle and long_s_toggle. In most profiles this layer is where group-member-targeting sequences live.

The result is up to 13 distinct gesture types per key across all layers, all resolved with zero ambiguity because each modifier state is tracked independently.

## 7 Character Profiles

Profiles are defined as TypeScript arrays of binding objects — \`SHARED_BINDINGS\` inherited by all characters plus per-character overrides — and compiled into O(1) lookup maps at startup. The seven profiles:

- **T — Tank (Vengeance Juggernaut)** — D key runs continuous R-stream (steady threat generation), S key fires Guard as a dual-key press (targeting teammate + applying guard simultaneously)
- **R — Rage (Rage Juggernaut)** — D key runs burst_stream_slow (paced burst with longer gaps), S key fires Smash with positional awareness
- **S — Sorc Heals (Corruption Sorcerer)** — D key is single_press (no stream, burst healing doesn't benefit from it), S key fires Innervate
- **M — Madness (Madness Sorcerer)** — D key runs burst_stream_fast (tight burst cycles), S key fires Crushing Darkness
- **E — Engi Sniper (Engineering Sniper)** — D key is single_press, S key fires Shield Probe as a dual-key sequence
- **C — Combat Medic (Combat Medic Commando)** — D key runs burst_stream_slow, S key fires Advanced Medical Probe
- **A — Arsenal Merc (Arsenal Mercenary)** — D key runs burst_stream_fast, S key fires Heatseeker Missiles with spread-shot targeting

Every profile also configures per-key bindings for the number row (1–6), A, B, H, I, U, and all Omega modifier variants of those keys.

## D Key — Four Stream Modes

The D key is not a standard gesture key. It toggles an R-stream: periodic synthetic R keypresses at configurable intervals, used to maintain continuous ability queueing in SWTOR. Four modes are defined per profile:

- **continuous_stream** — R fires at a fixed interval indefinitely until toggled off (Tank profile)
- **burst_stream_slow** — fires a burst of R presses with longer inter-burst gaps (Rage, Combat Medic)
- **burst_stream_fast** — fires a burst with tight gaps for rapid ability chaining (Madness, Arsenal)
- **single_press** — D fires one R press and stops, no looping (Sorc Heals, Engi Sniper)

Toggling D on announces the mode via TTS. Toggling it off silences it. The stream runs independently of gesture detection so active key presses don't interrupt the loop.

## S Key — Dual-Purpose Ability and Group Targeting

S has two distinct behaviors separated by hold duration:

- **Quick tap** — fires the profile-specific ability (Guard, Innervate, Shield Probe, etc.), often as a dual-key press that targets a specific party slot simultaneously
- **Long hold (512ms threshold)** — activates Group Member Targeting mode. Once active, the number keys 1–4 and T are intercepted: pressing them assigns that slot to the designated DPS target position rather than triggering their normal gestures. This allows mid-fight retargeting without touching the UI or breaking the rotation. The mode deactivates automatically when S is released.

## C Key — Double-Tap ESCAPE

C implements hybrid quick/long detection with a double-tap intercept. A single quick tap fires the profile's C binding normally. A double tap within a 300ms window produces a synthetic ESCAPE keypress — useful for dismissing targeting cursors or closing dialogs mid-rotation without breaking hand position.

## GCD Manager

SWTOR's global cooldown is exactly 1.275 seconds. The GCD manager tracks this timer in software and enforces a most-recent-wins queue:

- When a GCD ability is requested while the GCD is active, the request is held in queue
- When the GCD expires, the most recently queued ability fires immediately
- Per-ability cooldowns are tracked separately from the GCD — an ability can be on its own cooldown even when the GCD is open
- The manager integrates with the gesture executor so that long-hold gestures that fire before key release still respect the GCD state correctly

The practical effect: you can mash a key ahead of the GCD and the system fires the ability at exactly the right tick without double-pressing or missing the window.

## Calibration System with WebSocket Hot-Reload

Timing calibration is per-machine. The calibration manager runs a measurement sequence, collects hold-duration samples across the monitored key set, and applies statistical analysis (mean, standard deviation, confidence scoring) to compute per-key thresholds. Results are stored as named calibration profiles.

The calibration server runs a WebSocket server on port 8765. When a new calibration run completes, it broadcasts updated thresholds to any connected listeners — including the live gesture engine. This means you can recalibrate mid-session and have the new thresholds take effect immediately without restarting the process.

## Traffic Controller and Profile Compiler

Several keys in SWTOR require modifier combinations (e.g., SHIFT+4) that coexist with unmodified versions of those same keys in other concurrent sequences. The traffic controller prevents contamination:

At load time, the profile compiler performs a pass over all bindings and identifies **conundrum keys** — keys that appear both with and without a specific modifier in the active profile. These are stored in a lookup set. At execution time, the traffic controller checks whether a conflicting modifier (Shift, Alt) is physically held before emitting the keypress. If the modifier is held and the key is a conundrum key, the output is delayed until the modifier is released. This check has zero overhead for non-conundrum keys.

## Architecture

- **Omega Gesture Detector** — per-key state machines, modifier layer tracking, instant-quick optimization for keys with no long binding
- **GCD Manager** — 1.275s GCD timer, most-recent-wins queue, per-ability cooldown map
- **Profile Compiler** — TypeScript binding arrays → O(1) lookup maps, conundrum key extraction
- **Traffic Controller** — modifier-aware conflict resolution at output time
- **Sequence Executor** — concurrent execution with RepeatPolice deduplication, Teensy serial routing, per-step timing
- **Calibration Manager** — statistical threshold derivation, confidence scoring
- **Calibration Server** — WebSocket on port 8765 for hot-reload of calibration results
- **Teensy 4.0** — USB HID via serial, \`KEY:keyname:duration\` protocol, auto-reconnect on disconnect
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
    introVideoId: null,
    videos: [
      { title: "Site Walkthrough", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Responsive Layout & Navigation", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Fence Product Pages", url: "https://www.youtube.com/embed/placeholder" },
    ],
    blogContent: `
## The Brief

A local fence installation company needed a professional web presence — something that looked credible, communicated their services clearly, and made it easy for potential customers to reach out. The site needed to work well on mobile (most local service searches happen on phones), handle multiple fence product categories, and not require a CMS or database to maintain.

## What It Does

Fence For Hire is a multi-page marketing and lead-capture SPA. Visitors can browse the company's background, explore six distinct fence product categories with individual detail pages, view a catalog, read testimonials, learn about financing options, and submit a contact inquiry. The navigation is fully responsive across mobile, tablet, and desktop breakpoints, including a dropdown submenu for the Fence Options section.

### Key Features
- **Six fence product pages** — each category (wood, vinyl, chain link, aluminum, split rail, farm/ranch) has a dedicated page with product details and imagery
- **Responsive 3-breakpoint header** — the navigation restructures at mobile, tablet, and desktop widths with a Fence Options dropdown that's accessible on all screen sizes
- **Contact and quote form** — collects name, phone, email, service type, and message using React \`useState\`, with HTML5 \`required\` validation on all required fields
- **shadcn/ui component library** — Radix UI primitives for accessible dialogs, dropdowns, and interactive elements, fully customized to the brand's Navy and Gold palette
- **TanStack Query** — data fetching layer ready for future API integration without rewiring the component tree

## Tech Stack

### Client — React SPA with wouter routing

The frontend is a Vite-built React SPA using \`wouter\` for client-side routing (not React Router). wouter was chosen for its minimal footprint — the full router is a few hundred bytes and has no peer dependencies. The route tree covers Home, About, FenceOptions, Catalog, Testimonials, Financing, Contact, and the six individual fence type sub-pages, all loaded as a single bundle with no SSR overhead.

### Component Architecture

Every section of the site is a discrete component with a clear responsibility:

- **Header** — 3-breakpoint layout (mobile hamburger, tablet condensed, desktop full nav), Fence Options dropdown with wouter \`Link\` navigation
- **ContactSection** — controlled form with \`useState\` per field, plain HTML5 constraint validation on submit, no external validation library
- **FenceTypeCard** — reusable card layout shared across all six product pages
- **Layout shell** — Header + Footer wrapper applied to every route

### Brand Identity Constraints

All design decisions were constrained by the company's established brand: Navy \`#1e3a7a\` as the primary color and Gold \`#fbbf24\` as the accent. shadcn/ui made this straightforward — every component is unstyled at the source level, so applying the brand palette was a matter of configuring the CSS variables rather than fighting a predefined theme.

### Backend Structure

The repo includes a lightweight Express server and a \`shared/schema.ts\` file with Drizzle and Zod table definitions for future persistence. The current deployed version uses in-memory storage (a \`MemStorage\` class backed by a JavaScript \`Map\`) because the contact lead requirements were scoped to a first phase — the architecture is ready to swap to a real database without touching the client or shared schema.

## What I Learned

Building within a client's brand constraints is a different muscle than building for yourself. Every color choice, spacing decision, and copy tone had to serve the company's existing identity rather than my own preferences. The three-breakpoint responsive header — particularly the Fence Options dropdown behavior across all three layouts — was the most time-consuming piece technically, and getting it right on mobile without JavaScript hacks required thinking carefully about CSS specificity and Radix's dropdown primitive behavior.
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
    introVideoId: "5yZC2Jhgyh8",
    videos: [
      { title: "Project Overview", url: "https://www.youtube.com/embed/5yZC2Jhgyh8" },
      { title: "Weather Integration & Filtering", url: "https://www.youtube.com/embed/placeholder" },
      { title: "Adding & Managing Clothing Items", url: "https://www.youtube.com/embed/placeholder" },
    ],
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
