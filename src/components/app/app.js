import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";
import { GoArrowLeft } from "react-icons/go";

import "./app.scss";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Tea and Eat Healthy"),
      this.createTodoItem("Make an Awesome App"),
      this.createTodoItem("Sleep Well"),
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  AddItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    // I don't understand the new JavaScript [ ] thing....
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((items) => {
      return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({
      term: term,
    });
  };

  onFilterChange = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibeItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="main-wrapper">
        <div className="button-wrapper m-3">
          <button className=" btn">
            <a href="https://artur-shapiro.netlify.app/portfolio">
              <GoArrowLeft /> Portfolio
            </a>
          </button>
        </div>
        <div className="content-wrapper">
          <div className="summary">
            <p>
              This app was created with the help of a tutorial by{" "}
              <a href="https://www.udemy.com/course/pro-react-redux/">
                Juriy Bura on Udemy
              </a>
            </p>
          </div>
          <div className="todo-app-wrapper">
            <div className="todo-app">
              <AppHeader toDo={todoCount} done={doneCount} />

              <div className="top-panel d-flex ">
                <SearchPanel onSearchChange={this.onSearchChange} />
                <ItemStatusFilter
                  filter={filter}
                  onFilterChange={this.onFilterChange}
                />
              </div>

              <TodoList
                todos={visibeItems}
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
              />

              <ItemAddForm onItemAdded={this.AddItem} />
            </div>
          </div>
          <div className="tools">React, Bootstrap, HTML/SCSS</div>
        </div>
      </div>
    );
  }
}
