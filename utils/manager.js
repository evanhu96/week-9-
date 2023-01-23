const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name,id,email,github,office) {
    super(name,'manager',id,email,github);
    this.office = office;
  }
}
module.exports = Manager;
