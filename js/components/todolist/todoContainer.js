import { LitElement, html, css } from 'lit-element';
import AppCard from '/js/components/todolist/todolist.js';
import AppNewCard from '/js/components/todolist/todolistCreation.js';

export default class TodolistContainer extends LitElement {
  constructor(todos) {
    super();
    this.todos = todos;
  }

  static get properties() {
    return {
      todos: { type: Array, reflect: true },
    }
  }

  static get styles(){
    return css`
      :host {
        cursor: pointer;
        display: inline-block;
        width: 100%;
      }
      input {
        display: none;
      }
    `;
  }

  updatetodos(updatedTodos) {
    this.todos = updatedTodos;
  }

  async displayTodos() {
    const todos = json.map(item => {
      const todoElement = new TodoList();
      todoElement.initTodo(item.description,
        item.status);
        listPage.appendChild(todoElement);
        return todoElement;
    });
  }

  render() {
    return html`
    <div>
      <todo-creation></todo-creation>
      <div>
      ${
        this.todos.map(item =>
          (html`
            <todo-list></todo-list>
        `)
        )
      }
      </div>
    </div>
    `;
  }
}

customElements.define('todo-container', todoContainer);