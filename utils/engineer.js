const Employee = require("./Employee");

class Manager extends Employee {
  constructor(position,name,id,email,github,) {
    super(position,name,id,email,github,);
    this.github = github;
  }
}
module.exports = Manager;