import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shubhmarg.app',
  appName: 'ShubhMarg',
  webDir: 'public',
  server: {
    url: 'https://shubhmarg.vercel.app',
    cleartext: false
  }
};

export default config;
