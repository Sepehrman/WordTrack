const { defineConfig } = require("cypress");

module.exports = defineConfig({
    "defaultCommandTimeout": 5000, // Set the timeout to 5000 milliseconds (5 seconds)
  
    "component": {
      "devServer": {
        "framework": "create-react-app",
        "bundler": "webpack"
      }
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // require('@cypress/code-coverage/task')(on, config)

      // return config
    },
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
    numTestsKeptInMemory: 1,
  },
});
