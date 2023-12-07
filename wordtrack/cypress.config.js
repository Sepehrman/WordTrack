const { defineConfig } = require("cypress");

module.exports = defineConfig({
    "defaultCommandTimeout": 5000, // Set the timeout to 5000 milliseconds (5 seconds)
  
    "component": {
      "devServer": {
        "framework": "create-react-app",
        "bundler": "webpack"
      }
    },
  
    "e2e": {
      "setupNodeEvents": function(on, config) {
        // implement node event listeners here
      },
      "baseUrl": "https://word-track-seven.vercel.app"
    }
  });


