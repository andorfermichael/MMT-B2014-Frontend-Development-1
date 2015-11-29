module.exports = function createDog(name) {
    "use strict"

    class Dog {
        constructor(name) {
            this.name = name
        }

        makeSound() {
            return "Woof"
        }
    }

    return new Dog(name);
}
