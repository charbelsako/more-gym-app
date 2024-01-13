import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moregym.app',
  appName: 'gym-app',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
