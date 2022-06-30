// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const { abi, evm } = require('../compile');
import assert from 'assert';
import Ganache from 'ganache';
// import ganache from 'ganache-cli';
// const ganache = require('ganache-cli');
import Web3 from 'web3';
import { abi, evm} from '../compile.js';
const web3 = new Web3(Ganache.provider());


let accounts;

let todo;


beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // console.log("accounts: "+accounts);
  // // balance = await web3.eth.getBalance(accounts[3]);
  // console.log("test abi: " + abi);
  todo = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({
      data: evm,
    })
    .send({ from: accounts[1], gas: '3000000' });
    await todo.methods.addStatus('Draft').send({
      from: accounts[2],
      gas: '3000000'
    });
});

describe('Todo', () => {
  it('deploys a contract', () => {
    assert.ok(todo.options.address);
  });

  // it('status exist when loaded', async () => {
  //   // await todo.methods.addStatus('in progress').send({
  //   //   from: accounts[2],
  //   //   gas: '3000000'
  //   // });
  //   const status = await todo.methods.getStatus().call();
  //   console.log("Statuses: " + status);
  //   assert.equal('draft', status[0]);
  // });

  it('can add a status', async () => {
    await todo.methods.addStatus('Pending').send({
      from: accounts[2],
      gas: '3000000'
    });
    const status = await todo.methods.getStatus().call();
    console.log("Statuses: " + status);
    assert.equal('Pending', status[1]);
  });

  it('can create a task', async () => {
    // await todo.methods.addStatus('Draft').send({
    //   from: accounts[2],
    //   gas: '3000000'
    // });
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.ok(task);
  });

  it('can change a task status', async () => {
    // await todo.methods.addStatus('Draft').send({
    //   from: accounts[2],
    //   gas: '3000000'
    // });
    await todo.methods.addStatus('in progress').send({
      from: accounts[2],
      gas: '3000000'
    });
    await todo.methods.createTask('Task', 'Akoh').send({
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

  it('can change a task detail name', async () => {
    
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskDetails(0, 'Task1', 'Akoh').send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal('Task1', task.title);
    assert.equal('Akoh', task.author);
  });

  it('can change a task detail author', async () => {
    
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskDetails(0, 'Task', 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal('Task', task.title);
    assert.equal('Akoh1', task.author);
  });

  it('can change a task detail', async () => {
    
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.changeTaskDetails(0, 'Task1', 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    const task = await todo.methods.getTask(0).call();
    assert.equal('Task1', task.title);
    assert.equal('Akoh1', task.author);
  });

  // it('can change a task name', async () => {
    
  //   await todo.methods.createTask('Task', 'Akoh').send({
  //     from: accounts[3],
  //     gas: '3000000'
  //   });
  //   await todo.methods.changeTaskName(0, 'Task1').send({
  //     from: accounts[4],
  //     gas: '3000000'
  //   });
  //   const task = await todo.methods.getTask(0).call();
  //   assert.equal('Task1', task.title);
  // });

  // it('can change a task author', async () => {
  //   // await todo.methods.addStatus('Draft').send({
  //   //   from: accounts[2],
  //   //   gas: '3000000'
  //   // });
  //   await todo.methods.createTask('Task', 'Akoh').send({
  //     from: accounts[3],
  //     gas: '3000000'
  //   });
  //   await todo.methods.changeTaskAuthor(0, 'Akoh1').send({
  //     from: accounts[4],
  //     gas: '3000000'
  //   });
  //   const task = await todo.methods.getTask(0).call();
  //   assert.equal('Akoh1', task.author);
  // });

  it('can remove a task', async () => {
    // await todo.methods.addStatus('in progress').send({
    //   from: accounts[2],
    //   gas: '3000000'
    // });
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.createTask('Task1', 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    await todo.methods.removeTask(1).send({
      from: accounts[5],
      gas: '3000000'
    });
    // const tasks = await todo.methods.tasks().call();
    const len = await todo.methods.getAllTasksLength().call();
    
    assert.equal(1, len);
  });

  it('check task id is consistent after remove', async () => {

    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.createTask('Task1', 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    await todo.methods.createTask('Task2', 'Akoh2').send({
      from: accounts[4],
      gas: '3000000'
    });
    await todo.methods.removeTask(1).send({
      from: accounts[5],
      gas: '3000000'
    });
    // const tasks = await todo.methods.tasks().call();
    const task = await todo.methods.getTask(1).call();
 
    assert.equal('Task2', task.title);
    assert.equal(1, task.id)
  });

  it('task id not present to remove', async () => {
    await todo.methods.createTask('Task', 'Akoh').send({
      from: accounts[3],
      gas: '3000000'
    });
    await todo.methods.createTask('Task1', 'Akoh1').send({
      from: accounts[4],
      gas: '3000000'
    });
    try {
      await todo.methods.removeTask(2).send({
        from: accounts[5],
        gas: '3000000'
      });
      assert(false);
    } catch (e) {
      assert(e);
    }

  });

  it('can remove a status', async () => {
    await todo.methods.addStatus('in progress').send({
      from: accounts[2],
      gas: '3000000'
    });
  
    await todo.methods.removeStatus(1).send({
      from: accounts[3],
      gas: '3000000'
    });
    // const tasks = await todo.methods.tasks().call();
    const len = await todo.methods.getStatus().call();
    
    assert.equal(1, len.length);
  });
});
