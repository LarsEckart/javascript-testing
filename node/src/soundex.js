const MAX_CODE_LENGTH = 4
const NOT_A_DIGIT = '*'

function zeroPad (input) {
  const zerosNeeded = MAX_CODE_LENGTH - input.length
  return input + '0'.repeat(zerosNeeded)
}

function head (word) {
  return word.substring(0, 1)
}

function encodeDigit (letter) {
  const encodings = new Map([
    ['b', 1], ['f', 1], ['p', 1], ['v', 1],
    ['c', 2], ['g', 2], ['j', 2], ['k', 2],
    ['q', 2], ['s', 2], ['x', 2], ['z', 2],
    ['d', 3], ['t', 3],
    ['l', 4],
    ['m', 5], ['n', 5],
    ['r', 6]
  ])
  const key = letter.toLowerCase()
  return encodings.has(key) ? encodings.get(key) : NOT_A_DIGIT
}

function isComplete (encoding) {
  return encoding.length === MAX_CODE_LENGTH
}

function lastDigit (encoding) {
  if (encoding === '') {
    return NOT_A_DIGIT
  }
  return parseInt(encoding.substring(encoding.length - 1))
}

function encodeHead (encoding, word) {
  encoding += encodeDigit(word[0])
  return encoding
}

function isVowel (letter) {
  return 'aeiou'.includes(letter.toLowerCase())
}

function encodeLetter (encoding, letter, lastLetter) {
  const digit = encodeDigit(letter)
  if (digit !== NOT_A_DIGIT &&
    (digit !== lastDigit(encoding) || isVowel(lastLetter))) {
    encoding += digit
  }
  return encoding
}

function encodeTail (encoding, word) {
  for (let i = 1; i < word.length; i++) {
    if (!isComplete(encoding)) {
      encoding = encodeLetter(encoding, word[i], word[i - 1])
    }
  }
  return encoding
}

function encodeDigits (word) {
  let encoding = ''
  encoding = encodeHead(encoding, word)
  encoding = encodeTail(encoding, word)
  return encoding
}

function tail (word) {
  return word.substring(1)
}

function upperFront (str) {
  return str.toUpperCase()
}

class Soundex {
  encode (word) {
    return zeroPad(upperFront(head(word)) + tail(encodeDigits(word)))
  }
}

module.exports = { Soundex }
