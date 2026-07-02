export interface Settings {
  [key: string]: string;
}

export interface TabProps {
  settings: Settings;
  onChange: (key: string, value: string) => void;
  loading: boolean;
  saveMsg: string;
  onSave: () => void;
}
