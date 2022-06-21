// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const { abi, evm } = require('../compile');
import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';
import { abi, evm} from '../compile.js';
const web3 = new Web3(ganache.provider());


let accounts;

let todo;


beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // console.log("accounts: "+accounts);
  // balance = await web3.eth.getBalance(accounts[3]);
  // console.log("Balance: " + balance);
  todo = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({
      data: evm,
    })
    .send({ from: accounts[1], gas: '3000000' });
});

describe('Todo', () => {
  it('deploys a contract', () => {
    assert.ok(todo.options.address);
  });

  it('can add a status', async () => {
    await todo.methods.addStatus('in progress').send({
      from: accounts[2],
      gas: '3000000'
    });
    const status = await todo.methods.getStatus().call();
    console.log("Statuses: " + status);
    assert.equal('in progress', status[1]);
  });

  it('can create a task', async () => {
    await todo.methods.createTask('Task', 'Akoh', 0).send({
      from: accounts[3],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.ok(task);
  });

  it('can change a task status', async () => {
    await todo.methods.addStatus('in progress').send({
      from: accounts[2],
      gas: '3000000'
    });
    await todo.methods.createTask('Task', 'Akoh', 0).send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskStatus(0, 1).send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal(1, task.status);
  });

  it('can change a task name', async () => {
    // await todo.methods.addStatus('in progress').send({
    //   from: accounts[2],
    //   gas: '3000000'
    // });
    await todo.methods.createTask('Task', 'Akoh', 0).send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskName(0, 'Task1').send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal('Task1', task.title);
  });

  it('can change a task author', async () => {
    // await todo.methods.addStatus('in progress').send({
    //   from: accounts[2],
    //   gas: '3000000'
    // });
    await todo.methods.createTask('Task', 'Akoh', 0).send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskAuthor(0, 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal('Akoh1', task.author);
  });
});
