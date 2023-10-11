'use strict';
const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
});

const personModel = dynamoose.model('People', personSchema);

exports.handler = async (event) => {
  console.log('EVENT: ', event);
  try {
    const { name } = JSON.parse(event.body);
    const person = new personModel({ id: name });
    const result = await person.save();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    console.error('ERROR: ', error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
