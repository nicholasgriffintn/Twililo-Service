'use strict';

const querystring = require('querystring');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

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
      const twiml = new MessagingResponse();

      const message = formData.Body.toLowerCase().trim();

      console.log(message);

      switch (message) {
        case `we're no strangers to love`:
          twiml.message(`You know the rules and so do I`);
          break;
        case `you know the rules and so do i`:
          twiml.message(`A full commitment's what I'm thinking of`);
          break;
        case `a full commitment's what i'm thinking of`:
          twiml.message(`You wouldn't get this from any other guy`);
          break;
        case `you wouldn't get this from any other guy`:
          twiml.message(`I just wanna tell you how I'm feeling`);
          break;
        case `i just wanna tell you how i'm feeling`:
          twiml.message(`Gotta make you understand`);
          break;
        case `gotta make you understand`:
          twiml.message(`Never gonna give you up`);
          break;
        case `never gonna give you up`:
          twiml.message(`Never gonna let you down`);
          break;
        case `never gonna let you down`:
          twiml.message(`Never gonna run around and desert you`);
          break;
        case `never gonna run around and desert you`:
          twiml.message(`Never gonna make you cry`);
          break;
        case `never gonna make you cry`:
          twiml.message(`Never gonna say goodbye`);
          break;
        case `never gonna say goodbye`:
          twiml.message(`Never gonna tell a lie and hurt you`);
          break;
        case `never gonna tell a lie and hurt you`:
          twiml.message(`We've known each other for so long`);
          break;
        case `we've known each other for so long`:
          twiml.message(
            `Your heart's been aching but you're too shy to say it`
          );
          break;
        case `your heart's been aching but you're too shy to say it`:
          twiml.message(`Inside we both know what's been going on`);
          break;
        case `inside we both know what's been going on`:
          twiml.message(`We know the game and we're gonna play it`);
          break;
        case `we know the game and we're gonna play it`:
          twiml.message(`And if you ask me how I'm feeling`);
          break;
        case `and if you ask me how i'm feeling`:
          twiml.message(`Don't tell me you're too blind to see`);
          break;
        case `don't tell me you're too blind to see`:
          twiml.message(`Never gonna give you up`);
          break;
        case `never gonna give, never gonna give`:
          twiml.message(`(Give you up)`);
          break;
        default:
          twiml.message(`We're no strangers to love`);
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
