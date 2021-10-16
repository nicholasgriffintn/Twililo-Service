'use strict';

const querystring = require('querystring');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

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

      // Use the Twilio Node.js SDK to build an XML response
      const twiml = new VoiceResponse();
      const gather = twiml.gather({
        input: 'speech',
        action: 'https://twilio.nicholasgriffin.dev/call/gatherspeech',
      });
      gather.say(
        { voice: 'alice' },
        "Welcome to Nicholas Griffin's phone service, please tell us why you're calling?"
      );
      twiml.say(
        { voice: 'alice' },
        `Sorry, I didn't get that, Please hold the line while I transfer your call to Nicholas Griffin................`
      );
      twiml.play({
        digits:
          '47447381929129218282727273373478784783437473734www23983928323893289332392932392',
      });
      twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');
      twiml.hangup();

      /*
      For taking messages seriously:
      */
      /*
        twiml.say('Please leave a message at the beep.\nPress the star key when finished.');
        twiml.record({
            action: 'http://foo.edu/handleRecording.php',
            method: 'GET',
            maxLength: 20,
            finishOnKey: '*'
        });
        twiml.say('I did not receive a recording');
      */

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
