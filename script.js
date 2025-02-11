// Get DOM elements
const lengthInput = document.getElementById('length');
const rangeInput = document.getElementById('range');
const likelihoodText = document.getElementById('likelihood');
const passwordsDiv = document.getElementById('passwords');

// Function to calculate all possible password combinations
function calculateCombinations(length, characters) {
  if (length === 0 || characters.length === 0) return [];
  const result = [];
  const generate = (current) => {
    if (current.length === length) {
      result.push(current);
      return;
    }
    for (let char of characters) {
      generate(current + char);
    }
  };
  generate('');
  return result;
}

// Function to calculate likelihood
function calculateLikelihood(length, characters) {
  const totalCombinations = Math.pow(characters.length, length);
  return (1 / totalCombinations) * 100;
}

// Function to determine the number of decimal places dynamically
function formatLikelihood(likelihood) {
  if (likelihood >= 1) {
    return likelihood.toFixed(2); // Use 2 decimal places for likelihoods >= 1%
  } else {
    // Count the number of leading zeros after the decimal point
    const likelihoodString = likelihood.toFixed(20); // Use a high fixed number to capture leading zeros
    const decimalPart = likelihoodString.split('.')[1];
    const leadingZeros = decimalPart.match(/^0+/); // Match leading zeros
    const zeroCount = leadingZeros ? leadingZeros[0].length : 0;
    // Add 2 more decimal places after the leading zeros
    return likelihood.toFixed(zeroCount + 2);
  }
}

// Function to format numbers with commas
function formatNumberWithCommas(number) {
  return number.toLocaleString();
}

// Function to update results
function updateResults() {
  const length = parseInt(lengthInput.value);
  const characters = rangeInput.value.split('').filter((char, index, self) => self.indexOf(char) === index);

  if (isNaN(length) || characters.length === 0) {
    likelihoodText.textContent = 'Likelihood of Correct Guess: 0%';
    passwordsDiv.innerHTML = '';
    return;
  }

  const likelihood = calculateLikelihood(length, characters);
  const formattedLikelihood = formatLikelihood(likelihood);
  const combinations = calculateCombinations(length, characters);

  likelihoodText.textContent = `Likelihood of Correct Guess: ${formattedLikelihood}%`;

  // Display the total number of possible passwords (with commas) and the list of passwords
  passwordsDiv.innerHTML = `
    <h4>Possible Passwords: ${formatNumberWithCommas(combinations.length)}</h4>
    <div>${combinations.join(' ')}</div>
  `;
}

// Event listeners for input changes
lengthInput.addEventListener('input', updateResults);
rangeInput.addEventListener('input', updateResults);