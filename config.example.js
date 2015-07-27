var config = {
  BASE_URL: 'http://your.publicip.com or host',
  BASE_URL_HTTPS: 'https://your.publicip.com or host',
  SESSION_SECRET: 'Generate a random string',
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
