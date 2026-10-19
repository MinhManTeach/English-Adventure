import type { CapacitorConfig } from '@capacitor/cli';

// Store app (App Store / Google Play): the same web build, packed inside a native shell.
const config: CapacitorConfig = {
  appId: 'vn.lopso.englishadventure',
  appName: 'English Adventure',
  webDir: 'dist',
  backgroundColor: '#ffffff',
  ios: { contentInset: 'always' },
};

export default config;
