export interface NavigationEntry {
  label: string;
  section: string;
}

export const navigationItems: NavigationEntry[] = [
  { label: "MAPA", section: "map" },
  { label: "O KNIZI", section: "about" },
  { label: "O AUTORIMA", section: "authors" },
  { label: "LINKOVI", section: "links" },
  { label: "KONTAKT", section: "contact" },
];
