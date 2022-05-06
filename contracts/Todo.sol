// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Todo {
    string[] public status;
    // mapping(string => bool) public status_exist;

    struct Task {
      string title;
      string author;
      uint status;
      uint id;
      bool added;
      bool created;
   }

   Task[] public tasks;

   Task task;

//    mapping (bytes32 => uint) taskStatus;
//    taskStatus[sha3(Task.title)];

    constructor() {
        status.push("draft");
    }

    function addStatus(string memory value) public {
        status.push(value);
        // status_exist[value] = true;
    }

    function getStatus() public view returns (string[] memory) {
        return status;
    }

    function createTask(string memory title,
        string memory author,
        uint id) public {

            task = Task(title, author, 0, id, false, true);
            tasks.push(task);
            tasks[id].added = true;
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function changeTaskStatus(uint256 task_id, uint256 status_id) public {
        // if (tasks[task_id].added == false) {
        //     revert("No Task found!");
        // }
        // if (status_exist[status[status_id]] == false) {
        //     revert("No status found!");
        // }
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
