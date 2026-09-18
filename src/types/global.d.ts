declare global {
  interface Window {
    fbq: (type: string, name: string, parameters?: Record<string, unknown>) => void;
    _fbq: typeof window.fbq;
  }
}
export {};
