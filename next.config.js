require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env.local"),
        systemvars: true,
      }),
    ];

    return config;
  },
  env:{
    api_key:process.env.api_key,
    delivery_token:process.env.delivery_token,
    environment:process.env.environment,
    region:process.env.region === "eu"?"eu":"us",
    custom_host:process.env.custom_host && process.env.custom_host
  }
};
