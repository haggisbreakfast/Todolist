import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";
import { getTasks } from "./task-svc";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

class TodoListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.task.taskName}</td>
        <td>
          <input type="checkbox" checked={this.props.task.finished} />
        </td>
      </tr>
    );
  }
}

class NewTaskForm extends Component {
  render() {
    const onSubmit = evt => {
      evt.preventDefault();
      const taskInput = evt.target.elements.task;
      this.props.addTask(taskInput.value);
      console.log(this.props);
      taskInput.value = "";
    };
    return (
      <form onSubmit={onSubmit}>
        <input type="text" name="task" placeholder="Write Task Name" />
        <button type="submit">Add</button>
      </form>
    );
  }
}
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = {
      tasks: [],
      loading: true
    };
    this.addTask = this.addTask.bind(this);
  }
  addTask(task) {
    const oldTasks = this.state.tasks;
    const newTask = {
      taskName: task,
      id: generateRandomId,
      finished: false
    };
    const newTasks = [...oldTasks, newTask];
    this.setState({ tasks: newTasks });
  }
  componentDidMount() {
    getTasks().then(tasks => {
      this.setState({
        loading: false,
        tasks: tasks
      });
    });
  }
  render() {
    const taskItems = this.state.tasks.map(task => (
      <TodoListItem key={task.id} task={task} />
    ));
    let output = taskItems;
    if (this.state.loading) {
      output = <Loading />;
    }

    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          <small>For the truly industrious</small>
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{output}</tbody>
        </table>

        <hr />
        <NewTaskForm addTask={this.addTask} />
      </div>
    );
  }
}
