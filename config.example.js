var config = {
  BASE_URL: 'http://exmaple.com',
  BASE_URL_HTTPS: 'https://exmaple.com',
  SESSION_SECRET: 'Very small session secret',
  mongodb: {
    URI: 'mongodb://localhost/clarify-indexer'
  },
  clarify: {
    API_KEY: 'Clarify API key'
  },
  dropbox: {
    APP_KEY: 'Dropbox APP key',
    APP_SECRET: 'Dropbox APP secret'
  }
};

module.exports = config;
