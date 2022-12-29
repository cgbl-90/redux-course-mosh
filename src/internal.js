import { lastIndexOf, wrap } from "lodash";
import { compose, pipe } from "lodash/fromPairs.js";

console.log("Hello World!");

// Functions can be treated as vars

function sayHello() {
  return "Hello World!";
}

let f = sayHello;
sayHello();

function greet(msg) {
  console.log(msg);
}

greet(sayHello);

// High order functions - takes function as arg and return it

let numbers = [1, 2, 3, 4];
numbers.map((el) => el * 2);

// Another High order function is setTimeOut

//Function composition

let input = "            JavaScript    ";
let output = "<div>" + input.trim() + "</div>";
const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
let output2 = wrapInDiv(trim(input));
console.log(output, output2);

// Composing - LODASH is a library for JS

const compTransform = compose(wrapInDiv, trim); // Use pipe and order trim, wrapInDiv => basically does the same as compose
let output3 = compTransform(input);
console.log(output3);

// Functions with the same goal

// const wrapInDiv = (str) => `<div>${str}</div>`;
// const wrapInSpan = (str) => `<span>${str}</span>`;
const wrapAll = (str, tag) => `<${tag}>${str}</${tag}>`;

// Currying

function add(a) {
  return (b) => a + b;
}
// const add2 = a => b => a + b;

console.log(add(1)(2));

/** 
 *  Pure functions -> no random values, no current date/time, no global state, no mutation
    PROS: self-documenting, easy to test, concurrency, cacheable (useful for intensive computation)
    JS allows arrays and object mutability
    Immutability means that once created, it can't be changed
    Why immutability? predictable, faster change detection
    CONS: performance issues are possible, memory issues
*/

//IMMUTABILITY IS A FUNDAMENTAL PRINCIPLE OF REDUX

// Immutability for ARRAYS

const numbArray = [1, 2, 3, 4];

// adding
const newNumbArray = [...numbArray, 4];
console.log(numbArray, newNumbArray);

// removing
const removedArray = numbers.filter((n) => n !== 2);
console.log(numbArray, removedArray);

//updating
const updatedArray = numbers.map((n) => (n === 2 ? 20 : n));
console.log(numbArray, updatedArray);

/**
 * LIBRARIES FOR IMMUTABILITY
 * Immutable -> npm i immutable -> has its own syntax, you need to learn
 * Immer
 * Mori
 */

import Map from "immutable";

let book = Map({ title: "Happy Potter" });
console.log(book);

// .get('title')

import { produce } from "immer";

let book2 = { title: "Happy Potter" };
console.log(book2);

produce(book, (draftBook) => (draftBook.isPublished = true));
console.log(book2, draftBook);

/**
 * Install npm i redux@4.0
 *
 * STEPS
 * Design the Store
 * Define the Actions
 * Create a Reducer
 * Set up the Store
 * */

/**
 * OUR STORE
 * Add a bug
 * Delete a bug
 * Resolve a bug
 */

{
  type: "bugAdded";
  payload: {
    id: 1;
    description: " ";
  }
}
{
  type: "bugRemoved";
  payload: {
    id: 1;
    description: " ";
  }
}

// REDUCER

function reducer(state = [], action) {
  if (action.type === "bugAdded") {
    return [
      ...state,
      {
        id: ++lastId,
        desc: action.payload.desc,
        resolved: false,
      },
    ];
  } else if (action.type === "bugRemoved")
    return state.filter((bug) => bug.id !== action.payload.id);
  else return state;
}

//SWITCH CASE REDUCER

function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          desc: action.payload.desc,
          resolved: false,
        },
      ];
    case "bugRemoved":
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}

/**
 * Create a file for actionsTypes and export it to the project
 *
 * export const bugAdded = "bugAdded";
 * export const bugRemoved = "bugRemoved";
 *
 * export * as actions from "./ActionTypes" <-- export to main file
 *
 * use Action Creators to create TYPES
 *
 *
 */

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  desc: description,
});
