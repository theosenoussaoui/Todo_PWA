import { LitElement, html, css } from 'lit-element';

export default class TodoCreation extends LitElement {
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
    
    initTodoCreation(description) {
        this.description = description;
        this.status = "pending";
    }
    
    async addTodo() {
        try {
            const description = this.shadowRoot.getElementById('description').value;
            if (description != '') {
                await fetch(`http://localhost:3000/todos`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(
                        {
                            "id": "",
                            "description": description,
                            "status": "pending"
                        }
                    )
                });

                const event = new CustomEvent("update", {
                    detail: { event: "update todos" },
                });

                console.log(event)
                window.dispatchEvent(event);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    
    render() {
        return html`
            <link rel="stylesheet" href="/node_modules/spectre.css/dist/spectre.min.css">
            <style>
                .input-group {
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="input-group">
                <input class="form-input" id="description" type="text" value="${this.description}" placeholder="Entrez votre prochaine todo" />
                <button class="btn btn-primary input-group-btn" @click="${this.addTodo}">Ajouter</button>
            </div>
        `;
    }
}

customElements.define('todo-creation', TodoCreation);