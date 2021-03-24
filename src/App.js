import React, { Component } from "react";
import "./style.css";
import { createStore } from "redux";

let todos = ["todo1", "todo2"];

function storeReducer(state = {}, action) {
  //funzione che riceve uno stato iniziale ed a secondo dell'azione che riceve ritorna un nuovo stato
  switch (action.type) {
    case "ADD_TODO":
      return {
        _todos: [action.payload, ...state._todos]
      };
      break;
    case "REMOVE_TODO":
      return {
        _todos: [
          ...state._todos.slice(0, action.id),
          ...state._todos.slice(action.id + 1)
        ]
      };
      break;
    default:
      return {
        ...state
      };
      break;
  }
  return { ...state }; //copia non modificata dello stato precedente
}

const store = createStore(storeReducer, { _todos: [...todos] });

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      _todos: []
    };
    this.todoInput = React.createRef();
  }

  componentDidMount() {
    //console.log(store.getState());
    this.setState({ _todos: [...store.getState()._todos] });
    store.subscribe(() => {
      this.setState({ _todos: [...store.getState()._todos] });
      console.log(store.getState());
    });
  }

  addTodo = () => {
    const todo = this.todoInput.current.value;
    store.dispatch({
      type: "ADD_TODO",
      payload: todo
    });
  };

  removeTodo = i => {
    store.dispatch({
      type: "REMOVE_TODO",
      id: i
    });
  };

  render() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <p>Start editing to see some magic happen :)</p>
        <input ref={this.todoInput} />
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {this.state._todos.map((todo, i) => (
            <li key={i}>
              {todo}
              <button
                /*onClick={() => {
                  this.removeTodo(i);
                }}*/
                onClick={this.removeTodo.bind(null, i)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
