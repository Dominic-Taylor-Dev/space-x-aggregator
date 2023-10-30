import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
  },
  env: {
    LAUNCHES_API_ENDPOINT: "http://localhost:4000/api/v1/launches",
  },
});
