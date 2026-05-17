export const GA_TRACKING_ID =
  "G-CWS5Y4X1LL";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const pageview = (
  url: string
) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};