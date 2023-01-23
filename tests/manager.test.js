const Manager = require('../utils/manager');

describe('init', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with a properties equal to what is inputed", () => {
      // Arrange
      const position = 'manager';
      const github = 'github';
      const id = 'id';
      const name = 'name';
      const email = 'email';
      const office = 'office'
      const testManager = [position,name,id,email,github,office]
      // Act
      const obj = new Manager(name,id,email,github,office);

      // Assert
      expect(Object.values(obj)).toEqual(testManager);
    });

    // Exception test
  });
});
