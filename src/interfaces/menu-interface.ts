export interface IMenuItem {
  label: string;
  key: string;
  link: string;
  children?: items[];
  icon?: string;
}

interface items {
  label: string;
  key: string;
  link: string;
  notify?: number;
}
