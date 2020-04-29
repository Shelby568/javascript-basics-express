const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement,
} = require('./lib/arrays');

const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  console.log(req.query, 'string');
  const string = req.params.string;
  const length = req.query.length || 1;
  
  console.log(length);
  res.json({ result: firstCharacters(string, length) });
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(a, b) });
});

app.post('/numbers/multiply', (req, res) => {
  const a = req.body.a
  const b = req.body.b
  if (a == null || b == null) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(parseInt(a, 10)) || Number.isNaN(parseInt(b, 10))) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }
  res.status(200).json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const a = req.body.a
  const b = req.body.b
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (a == null || b == null) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(parseInt(a, 10)) || Number.isNaN(parseInt(b, 10))) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }
  res.status(200).json({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
  const a = req.body.a
  const b = req.body.b
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (a == null || b == null) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(parseInt(a, 10)) || Number.isNaN(parseInt(b, 10))) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  }
  res.status(200).json({ result: remainder(a, b) });
});

app.post('/booleans/negate', (req, res) => {
  const value = req.body.value
  res.status(200).json({ result: negate(value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const value = req.body.value
  res.status(200).json({ result: truthiness(value) });
})

app.get('/booleans/is-odd/:number', (req, res) => {
  const number = req.params.number
  if (Number.isNaN(parseInt(number, 10))) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.status(200).json({ result: isOdd(number) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const character = req.params.character
  const string = req.params.string
  if (character.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.status(200).json({ result: startsWith(character, string) });
});

app.post('/arrays/element-at-index/:number', (req, res) => {
  const index = req.params.number;
  const array = req.body.array;
  res.status(200).json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const array = req.body.array;
  res.status(200).json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  const array = req.body.array;
  const element = req.body.value;
  res.status(200).json({ result: addToArray2(element, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const array = req.body.array;
  res.status(200).json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const array = req.body.array;
  const index = req.query.index || 0;
  res.status(200).json({ result: removeNthElement(index, array) });
});

module.exports = app;
