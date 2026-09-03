export const THEME_IDS = [
  "aurora",
  "ice",
  "ember",
  "ink",
  "tide",
  "moss",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const THEMES: {
  id: ThemeId;
  zh: string;
  en: string;
}[] = [
  { id: "aurora", zh: "极光", en: "Aurora" },
  { id: "ice", zh: "冰河", en: "Ice" },
  { id: "ember", zh: "余烬", en: "Ember" },
  { id: "ink", zh: "墨白", en: "Ink" },
  { id: "tide", zh: "潮汐", en: "Tide" },
  { id: "moss", zh: "苔原", en: "Moss" },
];

export const THEME_TIME: Record<ThemeId, string> = {
  aurora: "#f3fffb",
  ice: "#f4fbff",
  ember: "#fff6f1",
  ink: "#fafafa",
  tide: "#f3fbff",
  moss: "#f4fff4",
};

export const DEFAULT_OVERTIME = "#ffe4df";

export const SHAPES = ["ring", "pill", "minimal", "card"] as const;
export type Shape = (typeof SHAPES)[number];

export const PRESETS = [
  { id: "pomodoro", minutes: 25, key: "pomodoro" },
  { id: "shortBreak", minutes: 5, key: "shortBreak" },
  { id: "focus", minutes: 15, key: "focus" },
  { id: "deep", minutes: 45, key: "deep" },
  { id: "hour", minutes: 60, key: "hour" },
  { id: "longFocus", minutes: 90, key: "longFocus" },
] as const;
