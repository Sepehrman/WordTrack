const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //require('@cypress/code-coverage/task')(on, config)

      //return config
    },
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
    numTestsKeptInMemory: 1,
  },
});
