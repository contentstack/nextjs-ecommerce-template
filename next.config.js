module.exports = {
  env: {
  api_key: process.env.api_key,
  delivery_token: process.env.delivery_token,
  environment: process.env.environment,
  region: process.env.region ? process.env.region : "us"
  }
};