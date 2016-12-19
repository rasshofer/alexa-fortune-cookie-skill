'use strict';

var path = require('path');
var sdk = require('alexa-sdk');

var i18n = {
  'en-GB': {
    translation: {
      SKILL_NAME: 'Fortune Cookie',
      HELP_MESSAGE: 'You can ask me for a random quote!',
      HELP_REPROMPT: 'What can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
      QUOTES: require(path.resolve(__dirname, 'en.json'))
    }
  },
  'en-US': {
    translation: {
      SKILL_NAME: 'Fortune Cookie',
      HELP_MESSAGE: 'You can ask me for a random quote!',
      HELP_REPROMPT: 'What can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
      QUOTES: require(path.resolve(__dirname, 'en.json'))
    }
  },
  'de-DE': {
    translation: {
      SKILL_NAME: 'Glückskeks',
      HELP_MESSAGE: 'Frage mich nach einer zufälligen Weisheit!',
      HELP_REPROMPT: 'Wie kann ich dir helfen?',
      STOP_MESSAGE: 'Auf Wiedersehen!',
      QUOTES: require(path.resolve(__dirname, 'de.json'))
    }
  }
};

var handlers = {
  LaunchRequest: function () {
    this.emit(':ask', this.t('HELP_MESSAGE'));
  },
  GetQuoteIntent: function () {
    var quotes = this.t('QUOTES');
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    this.emit(':tell', quote);
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  }
};

module.exports = {
  handler: function (event, context, callback) {
    var alexa = sdk.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.1ff6f7c0-5fa4-4793-9dd5-c515505788cf';
    alexa.resources = i18n;
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
};
