import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moregym.app',
  appName: 'gym-app',
  webDir: 'build',
  server: {
    // hostname: 'localhost',
    allowNavigation: [
      'http://localhost:5000',
      'localhost:5000/',
      'localhost:5000',
      'http://localhost:5000/',
      'http://192.168.43.108:5000',
      'http://10.0.2.2:5000',
    ],
    androidScheme: 'http',
    // url: 'http://192.168.43.108:3000',
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  ios: {
    contentInset: "always"
  }
};

export default config;
