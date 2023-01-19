const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, position, github, school) {
    super(name, position, github);
    this.school = school;
  }
}
module.exports = Intern;