// Classes
// class AgedPerson {
//   printAge() {
//     console.log(this.age);
//   }
// }

// class Person extends AgedPerson {
//   name = "John";

//   constructor() {
//     super();
//     this.age = 35;
//   }

//   greet() {
//     console.log(
//       "Hi, my name is " + this.name + "! And I am " + this.age + " years old"
//     );
//   }
// }

// Constructor Function
// function Person() {
//   this.name = "John";
//   this.age = 35;
// }

// Person.prototype.greet = function () {
//   console.log(
//     "Hi, my name is " + this.name + "! And I am " + this.age + " years old"
//   );
// };

// const p = new Person();
// console.log(p);

// p.greet();

const course = {
  title: "JS Complete Guide",
  rating: 5,
};

Object.setPrototypeOf(
  course,
  {
    // ...Object.getPrototypeOf(course),
    printRating: function () {
      console.log(this.rating + "/5");
    },
  },
  {
    name: {
      value: "Prateek",
    },
  }
);

const student = Object.create({
  printProgress: function () {
    console.log(this.progress);
  },
});

Object.defineProperty(student, "progres", {
  configurable: true,
  enumerable: true,
  value: 0.8,
  writable: false,
});

console.log(student);
