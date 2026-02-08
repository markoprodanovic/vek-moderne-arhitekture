export interface LinkUrl {
  title: string;
  url: string;
}

export interface Architect {
  name: string;
  urls: LinkUrl[];
}

export interface Era {
  era: string;
  architects: Architect[];
}

export interface EraItemProps {
  era: Era;
  index: number;
}
