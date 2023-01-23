const Employee = require("./Employee");

class Intern extends Employee {
  constructor(position,name,id,email,github,school) {
    super(position,name,id,email,github,);
    this.school = school;
  }
}
module.exports = Intern;