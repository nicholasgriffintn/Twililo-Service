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
      twiml.say({ voice: 'alice' }, `Never gonna give you up.`);
      twiml.play({}, 'https://demo.twilio.com/docs/classic.mp3');

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
