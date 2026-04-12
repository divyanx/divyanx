export type Product = {
  slug: string;
  name: string;
  productType: string;
  tagline: string;
  summary: string;
  description: string[];
  features: string[];
  pricing: {
    label: string;
    price: string;
    cadence: string;
    note: string;
    paymentProviders: string[];
  };
  ctaLabel: string;
  ctaHref?: string;
  status: "Live" | "Live soon" | "Beta shape" | "Early concept";
  tone: "ember" | "sage" | "midnight" | "aurora";
};

export const products: Product[] = [
  {
    slug: "polymath",
    name: "Polymath",
    productType: "AI life OS",
    tagline: "A calm command center for tasks, habits, projects, and multi-domain focus.",
    summary:
      "A privacy-first life management app for Apple platforms that brings planning, habit tracking, project momentum, and focus into one system.",
    description: [
      "Polymath is a real product built for people whose life is split across multiple domains like work, learning, fitness, and creative goals. Instead of scattering that context across separate tools, it pulls the system into one calmer dashboard.",
      "The product combines planning, habits, active projects, time blocking, and domain-specific views with a privacy-first foundation. It is designed to feel focused, visual, and durable rather than noisy or over-engineered.",
    ],
    features: [
      "Command center",
      "Today planner",
      "Domain modules",
      "Habit streaks",
      "iCloud-only sync",
    ],
    pricing: {
      label: "Live on Apple platforms",
      price: "Free",
      cadence: "",
      note: "Ships as a privacy-first Apple-platform app with local storage and optional iCloud sync.",
      paymentProviders: ["App Store live", "TestFlight beta"],
    },
    ctaLabel: "Open Polymath",
    ctaHref: "https://polymaths.life/",
    status: "Live",
    tone: "aurora",
  },
  {
    slug: "relaynote",
    name: "Relaynote",
    productType: "AI workspace",
    tagline: "Turn scattered research into clear briefs and usable insight.",
    summary:
      "A focused product for people who gather too much information and need a calmer way to shape it into something actionable.",
    description: [
      "Relaynote is imagined as a research companion for solo builders, operators, and small teams who collect links, notes, and half-formed ideas faster than they can process them.",
      "The product centers on synthesis: helping raw source material become a clean brief, a decision memo, or a launch-ready outline without creating more clutter in the process.",
    ],
    features: ["Source capture", "AI summarization", "Brief builder", "Shared exports"],
    pricing: {
      label: "Simple launch pricing",
      price: "$19",
      cadence: "/ month",
      note: "A placeholder structure for future Stripe or Razorpay integration.",
      paymentProviders: ["Stripe ready", "Razorpay ready"],
    },
    ctaLabel: "Try Relaynote",
    status: "Live soon",
    tone: "ember",
  },
  {
    slug: "threadline",
    name: "Threadline",
    productType: "Decision tracker",
    tagline: "Keep product decisions visible after the meeting ends.",
    summary:
      "A lightweight product memory for teams and founders who want context, rationale, and next steps to stay connected.",
    description: [
      "Threadline is designed around one recurring problem: important product calls get made, but the context behind them disappears into chat, meetings, and private docs.",
      "The product would give every decision a clean home, making it easier to revisit the why behind a feature, a shift in scope, or a launch tradeoff months later.",
    ],
    features: ["Decision timeline", "Context links", "Owner tracking", "Change log"],
    pricing: {
      label: "Team starter",
      price: "$29",
      cadence: "/ month",
      note: "Payment UI is in place so checkout providers can be attached later without redesigning the page.",
      paymentProviders: ["Stripe ready", "Razorpay ready"],
    },
    ctaLabel: "Join the beta",
    status: "Beta shape",
    tone: "sage",
  },
  {
    slug: "signalform",
    name: "Signalform",
    productType: "Workflow tool",
    tagline: "A calm intake layer for founders who run too much through DMs.",
    summary:
      "A structured front door for requests, leads, ideas, and operations, turning unstructured inbound into a cleaner working rhythm.",
    description: [
      "Signalform starts from a simple belief: every solo builder eventually needs a better way to collect and triage incoming work.",
      "Instead of a generic form builder, the concept is a focused operating layer that captures signal, routes it with intent, and reduces follow-up overhead.",
    ],
    features: ["Smart forms", "Routing logic", "Follow-up prompts", "Inbox sync"],
    pricing: {
      label: "Founder plan",
      price: "$12",
      cadence: "/ month",
      note: "Designed with placeholder-ready buy buttons so commerce flows can be connected in a later pass.",
      paymentProviders: ["Stripe ready", "Razorpay ready"],
    },
    ctaLabel: "Preview concept",
    status: "Early concept",
    tone: "midnight",
  },
  {
    slug: "cue",
    name: "Cue",
    productType: "Productivity app",
    tagline: "Break tasks into chunks. Ship the day.",
    summary:
      "A task chunking todo app built around the idea that big tasks need to be broken before they can be done.",
    description: [
      "Cue is built for people who stall on large tasks. It forces you to chunk work into small, completable pieces before you start — so the list stays honest and momentum stays alive.",
    ],
    features: ["Task chunking", "Focus mode", "Daily cadence", "Streak tracking"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "sage",
  },
  {
    slug: "job-craft",
    name: "Job Craft",
    productType: "Job search tool",
    tagline: "Search smarter. Apply with intent.",
    summary:
      "A focused job searching app that helps you track, filter, and apply to opportunities without the noise of traditional job boards.",
    description: [
      "Job Craft is designed for people who want to be deliberate about their job search — fewer spray-and-pray applications, more targeted effort with clear context behind each move.",
    ],
    features: ["Smart search", "Application tracker", "Role fit scoring", "Resume tailoring"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "midnight",
  },
  {
    slug: "yaad",
    name: "Yaad",
    productType: "Memory app",
    tagline: "Remember what you actually need to remember.",
    summary:
      "A quick memorizing app built around spaced repetition and minimal friction — so the stuff you want to retain actually sticks.",
    description: [
      "Yaad is Hindi for 'remember'. It's a compact memory tool that makes spaced repetition feel fast and natural, not like studying. Built for vocabulary, concepts, and anything worth keeping.",
    ],
    features: ["Spaced repetition", "Quick capture", "Context cards", "Recall streaks"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "ember",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
