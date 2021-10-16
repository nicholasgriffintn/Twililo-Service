'use strict';

const querystring = require('querystring');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
var randomWords = require('random-words');

const headers = {
  'Content-Type': 'text/xml',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
};

exports.handler = async (event) => {
  try {
    const formData = querystring.parse(event.body);

    if (formData) {
      console.log(formData);

      const message = formData.SpeechResult.toLowerCase().trim();

      const twiml = new VoiceResponse();

      if (message !== 'yes') {
        const gather = twiml.gather({
          input: 'speech',
          action: 'https://twilio.nicholasgriffin.dev/call/gatherspeech',
        });
        gather.say({ voice: 'alice' }, `Did you say ${randomWords()}?`);
      } else {
        twiml.say(
          { voice: 'alice' },
          `Thanks for confirming that you said ${randomWords()}.`
        );
        twiml.say(
          { voice: 'alice' },
          `Please wait while i transfer you to Nicholas Griffin.........`
        );
      }
      twiml.play({
        digits:
          '47447381929129218282727273373478784783437473734www23983928323893289332392932392',
      });
      twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');
      twiml.hangup();

      return {
        statusCode: 200,
        body: twiml.toString(),
        headers,
      };
    } else {
      throw new Error('whoops, no body!');
    }
  } catch (err) {
    console.error('handler error: ', err);

    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'Error' }),
      headers,
    };
  }
};
