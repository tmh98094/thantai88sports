import rawWidgets from "@/public/data/sports-widgets.json";

export type SportsWidgetItem = {
  label: string;
  value: string;
  note: string;
};

export type SportsWidgetSection = {
  id: string;
  title: string;
  description: string;
  items: SportsWidgetItem[];
};

export type SportsWidgets = {
  generatedAt: string;
  sourceStatus: string;
  providerErrors?: string[];
  sections: SportsWidgetSection[];
};

export function getSportsWidgets(): SportsWidgets {
  return rawWidgets as SportsWidgets;
}
