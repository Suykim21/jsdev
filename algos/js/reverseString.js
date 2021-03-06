// Reversing the string
function reverse(str) {
  // array.reduce((accumulator, currentValue) => accumulator + currentValue, initial argument);
  return str.split('').reduce((rev, char) => char + rev, '');
}

// option 2
function reverseTwo(str) {
  return str.split('').reverse().join('');
}

// option 3
function reverseThree(str) {
  let reversed = '';

  for (let char of str) {
    reversed = char + reversed;
  }

  return reversed;
}