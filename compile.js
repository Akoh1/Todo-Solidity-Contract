// const path = require('path');
// const fs = require('fs');
// const solc = require('solc');

// const inboxPath = path.resolve(__dirname, 'contracts', 'Todo.sol');
// const source = fs.readFileSync(inboxPath, 'utf8');
import path from 'path';
import fs from 'fs';
import solc from 'solc';

const contractName = "Todo.sol";
// Create a cross-platform-compatible path to the contract.
const TodoPath = path.resolve("contracts", contractName);

const source = fs.readFileSync(TodoPath, "utf8");

const input = {
  language: 'Solidity',
  sources: {
    'Todo.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   'Todo.sol'
// ].Todo;
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   'Todo.sol'
// ].Todo);
// Compile contract(s).
const output = JSON.parse(solc.compile(JSON.stringify(input)));

let abi;
let evm;

for (let contract in output.contracts[contractName]) {
  // Used to interface between javascript and contract.
  console.log("contract: " + contract);
  abi = JSON.stringify(output.contracts[contractName][contract].abi);
  // console.log("loop abi: "+ abi);
  // What we deploy to an Ethereum network.
  evm = output.contracts[contractName][contract].evm.bytecode.object;
}

// console.log("abi: "+ abi + " evm: "+ evm);
// console.log("output: "+ output);
// Export the ABI and bytecode for use in other files.
export { abi, evm };
