import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "rests.app",
  appName: "rests",
  webDir: "public/admin",
  server: {
    androidScheme: "https",
  },
};

export default config;
