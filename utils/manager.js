const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name,  github, office) {
    super(name, 'Manager', github);
    this.position = 'Manager';
    this.office = office;
  }
}
module.exports = Manager;
