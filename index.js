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
    message: "What is your email?",
    name: "position",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your email");
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
const engineerQ = [
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "github",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("Please enter your github username");
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
    if (position == "Manager") {
      var managerResponses = await inquirer.prompt(managerQ);
      let manager = new Manager(
        ...Object.values(userResponses),
        ...Object.values(managerResponses)
      );
      employees.push(manager);
    } else if (position == 'Intern') {
      console.log("hey");
      var internResponses = await inquirer.prompt(internQ);
      let intern = new Intern(
        ...Object.values(userResponses),
        ...Object.values(internResponses)
      );

      employees.push(intern);
    } else {
      var engineerResponses = await inquirer.prompt(engineerQ);
      let engineer = new Engineer(
        ...Object.values(userResponses),
        ...Object.values(engineerResponses)
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
    // else{
    //     await writeFileAsync("employeeCards.html");

    // }
    // x= new Employee(...Object.values(userResponses));
    // console.log(x)
    // console.log("Thank you!");
    //   console.log("Generating your HTML...");
    //   const markdown = generateMarkdown(userResponses, userInfo);
    //   console.log(markdown);
  } catch (error) {
    console.log(error);
  }
}

function createCards(employees){
  var body = ''
  for (i in employees){
    console.log(employees[i].name);
    body += `        
    <div>
    <li>${employees[i].name}</li>
    <li>${employees[i].position}</li>
    <li>${employees[i].email}</li>
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
