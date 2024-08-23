export type Issue = {
  id: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  pull_request?: {
    url: string;
  };
};
