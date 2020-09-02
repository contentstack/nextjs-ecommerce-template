
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    api_key: process.env.api_key,
    delivery_token:process.env.delivery_token,
    environment: process.env.environment,
    region: process.env.region
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    api_key: "Your API key",
    delivery_token: "Your Delivery token",
    environment: "Your Publishing Environment",
    region: 'us'
  },
};
