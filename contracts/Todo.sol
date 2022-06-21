// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todo {
    string[] public status;
    mapping(string => bool) public status_exist;

    struct Task { 
      string title;
      string author;
    //   address author;
      uint status;
      uint id;
      bool added;
      bool created;
   }

   Task[] public tasks;

   Task task;

   Task[] public state_tasks;

//    mapping (bytes32 => uint) taskStatus;
//    taskStatus[sha3(Task.title)];

    constructor() {
        status.push("draft");
    }

    function addStatus(string memory value) public {
        status.push(value);
        status_exist[value] = true;
    }

    function getStatus() public view returns (string[] memory) {
        return status;
    }

    function createTask(string memory title, string memory author, uint id) public {
            
            // task = Task(title, author, 0, id, false, true);
            task.title = title;
            task.author = author;
            task.status = 0;
            task.id = id;
            task.added = false;
            task.created = true;
            tasks.push(task);
            tasks[id].added = true;
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getTasksAtState(uint256 status_id) public returns (Task[] memory) {
        
        uint256 taskArrayLen = tasks.length;
        for (uint i=0; i<taskArrayLen; i++) {
            if (tasks[i].status == status_id) {
                state_tasks.push(tasks[i]);
            }
            
        }
        return state_tasks;
    }

    function changeTaskStatus(uint256 task_id, uint256 status_id) public {
      
        tasks[task_id].status = status_id;
    }

    function changeTaskName(uint256 task_id, string memory name) public {
        tasks[task_id].title = name;
    }

    function changeTaskAuthor(uint256 task_id, string memory author) public {
        tasks[task_id].author = author;
    }

    function getTask(uint task_id) public view returns (Task memory) {
        // return status[tasks[task_id].status];
        return tasks[task_id];
    }

}