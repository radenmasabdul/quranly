import { ShortcutItem } from "../types/shortcut";

export const SHORTCUTS: ShortcutItem[] = [
  {
    key: "quran",
    label: "Al-Quran",
    icon: "book-open",
    route: "/quran",
    colorKey: "indigo",
  },
  {
    key: "shalat",
    label: "Jadwal Shalat",
    icon: "clock",
    route: "/shalat",
    colorKey: "amber",
  },
  {
    key: "doa",
    label: "Doa & Dzikir",
    icon: "heart",
    route: "/doa",
    colorKey: "teal",
  },
  {
    key: "search",
    label: "Pencarian",
    icon: "search",
    route: "/search",
    colorKey: "rose",
  },
];

export const SHORTCUT_COLORS = {
  indigo: {
    dark: {
      bg: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.25)",
      icon: "#818CF8",
    },
    light: {
      bg: "#EEF2FF",
      border: "#C7D2FE",
      icon: "#6366F1",
    },
  },

  teal: {
    dark: {
      bg: "rgba(20,184,166,0.12)",
      border: "rgba(20,184,166,0.2)",
      icon: "#2DD4BF",
    },
    light: {
      bg: "#ECFDF5",
      border: "#A7F3D0",
      icon: "#0D9488",
    },
  },

  amber: {
    dark: {
      bg: "rgba(245,158,11,0.12)",
      border: "rgba(245,158,11,0.2)",
      icon: "#FBBF24",
    },
    light: {
      bg: "#FFFBEB",
      border: "#FDE68A",
      icon: "#D97706",
    },
  },

  rose: {
    dark: {
      bg: "rgba(244,63,94,0.12)",
      border: "rgba(244,63,94,0.2)",
      icon: "#FB7185",
    },
    light: {
      bg: "#FFF1F2",
      border: "#FECDD3",
      icon: "#E11D48",
    },
  },
} as const;
