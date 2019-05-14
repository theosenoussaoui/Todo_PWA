// import AppCard from '/js/components/card/card.js';
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
    const data = await fetch('/data/spacex.json');
    const json = await data.json();
  
    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('todos');
      }
    });
  
    if (navigator.onLine) {
      await database.put('todos', json, 'todos');
    }

    const acticles = await database.get('articles', 'articles');
  
    //    const cards = acticles.map(item => {
    //   const cardElement = new AppCard();
      
    //   cardElement.initCard(item.image,
    //     item.placeholder,
    //     item.content.title,
    //     item.content.description);
    //   listPage.appendChild(cardElement);
  
    //   if (!'IntersectionObserver' in window) {
    //     cardElement.swapImage();
    //   }

    //   return cardElement;
    // });

    const todolist = articles.map(item=> {
      const todoElement = new TodoList();

      todoElement.initTodo(item.content.description,
        item.content.status);

      listPage.appendChild(todoElement);

      if (!'IntersectionObserver' in window) {
        todoElement.swapImage();
      }

      return todoElement;

    });
  
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
     */

    const options = {
      rootMarging : '0px 0px 0px 0px'
    };

    const callback = entries => {
      entries.forEach((entry) => {
        // If image element in view
          const todo = entry.target
        }
      );
    };
  
    const io = new IntersectionObserver(callback, options);
    // Observe cards as they enter the viewport
    todolist.forEach(todo => {
      io.observe(todo);
    }); 
  } catch(error) {
    console.error(error);
  }
})(document);