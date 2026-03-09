export interface LinkItem {
  id: string;
  title: string;
  url: string;
  sort_order: number;
}

export interface ArchitectItem {
  id: string;
  era_id: string;
  name: string;
  sort_order: number;
  links: LinkItem[];
}

export interface EraItem {
  id: string;
  name: string;
  sort_order: number;
  architects: ArchitectItem[];
}
