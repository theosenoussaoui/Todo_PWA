import { LitElement, html, css } from 'lit-element';

export default class TodoList extends LitElement {
  constructor() {
    super();
    this.description = "";
    this.status = "";
  }

  static get properties() {
    return {
      description: { type: String },
      status: { type: String },
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }

      .todo {
        position: relative;
        margin-bottom: 6px;
        overflow: hidden;
        border-radius: 5px;
        margin: 0.4rem;
      }

    //   .card main {
    //     padding: 1rem;
    //     background-color: var(--app-card-color);
    //     transition: color 0.3s ease, background-color 0.3s ease;
    //   }

      /**
        * Persist animation using : animation-fill-mode set to forward 
        * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
        */

      .fade {
        -webkit-animation: fadeout 2s forwards; /* Safari and Chrome */
        -moz-animation: fadeout 2s forwards; /* Firefox */
        -ms-animation: fadeout 2s forwards; /* Internet Explorer */
        -o-animation: fadeout 2s forwards; /* Opera */
        animation: fadeout 2s forwards;
      }

      /* Key frame animation */
      @keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      /* Firefox */
      @-moz-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      /* Safari and Chrome */
      @-webkit-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
      }

      @media (min-width: 600px) {

      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 460px) {
        .todo {
          flex-basis: 21%;
          margin: 2%;
        }
      }
    `;
  }

  firstUpdated() {
    this.shadowRoot.querySelector('.form-group')
      .addEventListener('load', () => {
        this.shadowRoot.querySelector('main')
          .classList.add('fade');
      });
  }

  initTodo(description, status) {
    this.description = description;
    this.status = status;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/node_modules/spectre.css/dist/spectre.css">
      <article class="todo">
        <main>
          <div class="form-group">
            <label class="form-checkbox">
                    <input type="checkbox">
                    <i class="form-icon"></i> Titre de la checkbox.
                </label>
            </div>
        </main>
      </article>
    `;
  }
}

customElements.define('todo-list', TodoList);
