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

      const voices = [
        'Polly.Amy',
        'Polly.Brian',
        'Polly.Emma-Neural',
        'Polly.Russell',
        'Polly.Lotte',
        'Polly.Joanna',
        'Polly.Kendra-Neural',
        'Polly.Geraint',
        'Polly.Gabrielle-Neural',
        'Polly.Vicki',
        'Polly.Karl',
        'Polly.Bianca-Neural',
      ];

      if (
        message &&
        (message.includes('yes') ||
          message.includes('yeah') ||
          message.includes('yup'))
      ) {
        twiml.say(
          { voice: voices[Math.floor(Math.random() * voices.length)] },
          `Thanks for confirming that you said ${randomWords()}.`
        );
        twiml.say(
          { voice: voices[Math.floor(Math.random() * voices.length)] },
          `Please wait while I transfer you to Nicholas Griffin.........`
        );
        twiml.play(
          {},
          'https://cdn.nicholasgriffin.dev/Old-Machine-Booting-Up-www.fesliyanstudios.com.mp3'
        );
        twiml.say(
          { voice: voices[Math.floor(Math.random() * voices.length)] },
          `LOL, did you really think it would be that easy?`
        );
        twiml.play({}, 'https://cdn.nicholasgriffin.dev/classic.mp3');
        twiml.hangup();
      } else {
        const gather = twiml.gather({
          input: 'speech',
          action: 'https://twilio.nicholasgriffin.dev/call/gatherspeech',
        });
        gather.say(
          { voice: voices[Math.floor(Math.random() * voices.length)] },
          `Did you say ${randomWords()}?`
        );
      }

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
