const inquirer = require("inquirer");
const Employee = require("./utils/Employee");
const Manager = require( "./utils/Manager");
const Engineer = require("./utils/Engineer");
const Intern = require(  "./utils/Intern");
const generateMarkdown = require(  "./utils/markDown");
const util = require("util");
const fs = require("fs");
const { log } = require("console");


const employees = [];
const add = [
  {
    type: "list",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"],
    name: "continue",
  },
];

const choosePosition = [
  {
    type: "list",
    message: "What is your position?",
    choices: ["Intern", "Engineer"],
    name: "position",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your position");
      }
      return true;
    },
  },
];
const mainQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your name");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your id?",
    name: "id",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your id");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your email");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is your GitHub profile?",
    name: "github",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your github");
      }
      return true;
    },
  },
];
const managerQ = [
  {
    type: "input",
    message: "What is your office number?",
    name: "office",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter you office number");
      }
      return true;
    },
  },
];
const internQ = [
  {
    type: "input",
    message: "Where did you go to school?",
    name: "office",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your school");
      }
      return true;
    },
  },
];


function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Success! ");
  });
}

const writeFileAsync = util.promisify(writeToFile);


async function init(position) {
  try {
    console.log(position);
    var userResponses = await inquirer.prompt(mainQuestions);
    console.log(userResponses);
    if (position == "Manager") {
      var managerResponses = await inquirer.prompt(managerQ);
      console.log(Object.values(userResponses));
      let manager = new Manager(
        ...Object.values(userResponses),
        ...Object.values(managerResponses)
      );
      employees.push(manager);
    } else if (position == 'Intern') {
      var internResponses = await inquirer.prompt(internQ);
      let intern = new Intern(
        position,
        ...Object.values(userResponses),
        ...Object.values(internResponses)
      );

      employees.push(intern);
    } else {
      let engineer = new Engineer(
        position,
        ...Object.values(userResponses),
      );
      employees.push(engineer);
    }
    var cont = await inquirer.prompt(add);
    if (cont.continue == "Yes") {
      var p = await inquirer.prompt(choosePosition);
      init(p.position);
    } else {
      const markdown = createCards(employees);
      await writeFileAsync("index.html", markdown);
    }
  } catch (error) {
    console.log(error);
  }
}

function createCards(employees){
  var body = ''
  for (i in employees){
    console.log(employees[i]);
    body += `        
    <div>
    <li>${employees[i].name}</li>
    <li>${employees[i].position}</li>
    <a href = ${employees[i].email}>${employees[i].email}</a>
    <a href = ${employees[i].github}>${employees[i].github}</a>
    <li>${employees[i].id}</li>
</div>`
  }
  const cards = generateMarkdown(body)
  return cards
}

function manager() {
  init("Manager");
}
manager();
