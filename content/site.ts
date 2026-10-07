export interface PanelRow {
  key: string;
  value: string;
}

export interface SpecPanel {
  headerLeft: string;
  headerRight: string;
  rows: readonly PanelRow[];
}

export interface CtaButton {
  label: string;
  href: string;
  primary: boolean;
  external: boolean;
}

export const site = {
  meta: {
    title: "haitam oudah, software developer",
    description:
      "personal site of haitam oudah, a software developer working across web and native.",
    url: "https://haitamoudah.com",
  },

  chrome: {
    bootLines: [
      "> haitamoudah.com",
      "> renderer ......... ok",
      "> projects ........ 2",
      "> ready",
    ],
    hudLabel: "haitamoudah.com",
    scrollHint: "▼ scroll",
  },

  hero: {
    eyebrow: "software developer",
    heading: ["haitam", "oudah"],
    lede: "i work across web and native. i like problems that end with something people can actually download.",
  },

  approach: {
    eyebrow: "approach",
    heading: ["ship small,", "ship often."],
    paragraphs: [
      "i don't have a favourite stack. i have a favourite way of finishing things: cut the scope until it's shippable, put it in front of someone, then decide what was actually missing.",
      "i work across typescript, go, rust, c++ and .net depending on what the problem wants. web when it should be web, native when it shouldn't. the language is usually the least interesting decision on a project. ascend and this site are both typescript and react.",
      "what i care about is code that closes issues instead of churning the repo.",
    ],
    panel: {
      headerLeft: "stack",
      headerRight: "working set",
      rows: [
        { key: "languages", value: "typescript, javascript, go, rust, c++, .net" },
        { key: "web", value: "react, next.js, tailwind, node" },
        { key: "data", value: "postgresql, mysql, redis, sqlite" },
        { key: "infra", value: "git, docker, aws" },
        { key: "ai", value: "claude code, codex, cursor" },
      ],
    } satisfies SpecPanel,
  },

  work: {
    eyebrow: "work / 01",
    heading: ["ascend"],
    paragraphs: [
      "a personal dashboard for windows. weighted habits with per-day schedules, routines and exercises, and body composition worked out on your own machine. four releases so far.",
      "i built it offline-only on purpose. most apps in this space are designed to bring you back: streaks that guilt you, notifications timed for when you've gone quiet. ascend can't send you a re-engagement email because it has no idea what one is.",
    ],
    panel: {
      headerLeft: "ascend v0.6.0",
      headerRight: "windows",
      rows: [
        { key: "stack", value: "electron, react, typescript, sqlite" },
        {
          key: "engine",
          value:
            "pure scoring. streak multipliers, partial credit, and effective-dated parameters, so changing a setting never rewrites past scores",
        },
        {
          key: "storage",
          value:
            "a single sqlite file on disk, with daily snapshot backups and one-click restore",
        },
        {
          key: "network",
          value: "none. no accounts, no telemetry, no crash reporting, no calls out",
        },
        {
          key: "math",
          value:
            "mifflin-st jeor for resting burn, us navy tape method for body fat. computed locally and labelled with their error ranges, because they're trend lines, not verdicts",
        },
        {
          key: "shipping",
          value:
            "the installer isn't code-signed yet, so windows throws a smartscreen prompt. every release publishes its sha256 so you can check what you downloaded is what i built",
        },
      ],
    } satisfies SpecPanel,
  },

  work2: {
    eyebrow: "work / 02",
    heading: ["espace libre", "marché"],
    paragraphs: [
      "a solidarity marketplace for students at cégep beauce-appalaches. students reserve free items with points and collect them at a pickup every two weeks. 300+ users, 250+ orders, $9,000+ redistributed.",
      "i designed, built and deployed it end to end for the student association. it won a college award for its impact on student life.",
    ],
    panel: {
      headerLeft: "espace libre marché",
      headerRight: "in production",
      rows: [
        { key: "frontend", value: "react single-page app, code-split by route" },
        { key: "api", value: "rest api in c# / .net, role-based authentication" },
        { key: "data", value: "postgresql" },
        {
          key: "admin",
          value: "account approval, orders and pickups in one back office",
        },
      ],
    } satisfies SpecPanel,
  },

  contact: {
    eyebrow: "contact",
    heading: ["open to", "collaborate."],
    paragraphs: [
      "i work full time as a developer, and i make time for work that's worth it: products, side collaborations, open source.",
      "if you're building something and want another pair of hands on it, or you've got a problem that needs someone who'll actually finish it, email me. i'm in canada and i work with people anywhere.",
    ],
    buttons: [
      {
        label: "email me",
        href: "mailto:haitamoudah@gmail.com",
        primary: true,
        external: false,
      },
      {
        label: "github",
        href: "https://github.com/haitamoudah",
        primary: false,
        external: true,
      },
      {
        label: "download ascend",
        href: "https://github.com/haitamoudah/ascend/releases",
        primary: false,
        external: true,
      },
    ] satisfies readonly CtaButton[],
  },
} as const;

export type Site = typeof site;
