# Clarify Indexer

## Prerequisites
`sudo npm install -g grunt-cli`

## Installation
1. `grunt install`
2. `./generate-ssl-cert.sh`

## Configuration
1. Copy config.js.example to config.js
2. Configure the settings in the config file. You can find the Clarify API keys in the Clarify Developer portal.  See the Dropbox section of the documentation for configuring the Dropbox app.
3. './generate-ssl-cert.sh' - Dropbox requires an SSL connection for authentication

## Running
`grunt`

## Dropbox

This app assumes you have familiarity with the Dropbox API and how Dropbox Authentication works, generally. Below are the specifics of how to configure your Dropbox app for testing with this app.

1. Login to https://dropbox.com/developers
2. Click 'App Console'
3. Click 'Create App'
4. Choose 'Dropbox API App'
5. Select 'Yes, my app only needs access to the files it creates' and give your app a name
6. Set the OAuth2 Redirect URI to https://yourappspublicurl.com:port/auth/dropbox/callback
7. Set the Webhooks URI to http://yourappspublicuri.com:port/dropbox/webhooks - Note that Dropbox will attempt to verify this url immediately, so your app must be running and available on the public internet

