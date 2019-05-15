import TodoList from '/js/components/todolist/todolist.js';
import { openDB } from '/node_modules/idb/build/esm/index.js';
import checkConnectivity from '/js/connection.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');
  
  checkConnectivity();
  document.addEventListener('connection-changed', ({ detail }) => {
    console.log(detail);
  });
  
  try {
    // const data = await fetch('/data/checkbox.json');
    const data = await fetch('http://localhost:3000/todos'); // intégration pas encore faite avec json server
    const json = await data.json();
    
    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('todosList');
      }
    });
    
    if (navigator.onLine) {
      await database.put('todosList', json, 'todosList');
    }
    
    const todosList = await database.get('todosList', 'todosList');
    
    const todos = json.map(item => {
      const todoElement = new TodoList();
      todoElement.initTodo(item.description,
        item.status);
        listPage.appendChild(todoElement);
        return todoElement;
    });
      
      /**
      * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      */
      
      const options = {
        rootMarging : '0px 0px 0px 0px'
      };
      
      window.addEventListener("update",async function(e) {
        const dataUpdated = await fetch('http://localhost:3000/todos');
        const jsonUpdated = await dataUpdated.json();
        await database.put('todosList', jsonUpdated, 'todosList');
        const updatedCheckbox = await database.get('todosList', 'todosList');
        todoElement.updateCheckbox(updatedcheckbox);
        console.log('db updated !');
      });
      
    } catch(error) {
      console.error(error);
    }
  })(document);