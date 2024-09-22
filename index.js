const fs = require('fs');
const inquirer = require('inquirer'); // Importing inquirer module
const jest = require('jest'); // Corrected import

function svglogocreator(color, text, shape) {
  let svgShape;
  let svgText;

  if (shape === 'square') {
    svgShape = `<rect width="100" height="100" style="fill:${color}" />`;
    svgText = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${text}</text>`;
  } else if (shape === 'circle') {
    svgShape = `<circle cx="50" cy="50" r="40" style="fill:${color}" />`;
    svgText = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${text}</text>`;
  } else if (shape === 'triangle') {
    svgShape = `<polygon points="50,0 100,100 0,100" style="fill:${color}" />`;
    svgText = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">${text}</text>`;
  }

  return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    ${svgShape}
    ${svgText}
  </svg>`;
}

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'What text do you want to display?',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'What shape do you want?',
    choices: ['square', 'circle', 'triangle']
  },
  {
    type: 'input',
    name: 'color',
    message: 'What color do you want the shape to be?'
  }
])
  .then((answers) => {
    const svg = svglogocreator(answers.color, answers.text, answers.shape);
    fs.writeFileSync('logo.svg', svg);
  });

module.exports = svglogocreator;