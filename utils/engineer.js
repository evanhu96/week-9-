const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, position, github, ) {
    super(name, position);
    this.github = github;
  }
}
module.exports = Manager;