import type { Feather } from "@expo/vector-icons";

export type ShortcutColorKey = "indigo" | "teal" | "amber" | "rose";

export type ShortcutItem = {
  key: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
  colorKey: ShortcutColorKey;
};
