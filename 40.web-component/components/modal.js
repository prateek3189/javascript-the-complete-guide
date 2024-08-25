class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host([opened]) {
          #backdrop, #modal {
            display: block;
          }
        }
        #backdrop {
          position: fixed;
          top: 0;
          height: 100vh;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 11;
          display: none;
        }

        #modal {
          z-index: 100;
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          background-color: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          display: none;
        }

        header {
          padding: 1rem;
        }

        #action {
          border-top: 1px solid #CCC;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #action button {
          margin: 0 10px;
        }

        #main {
          padding: 1rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="modal-header"><h1>Please Confirm</h1></slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="action">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Okay</button>
        </section>
      </div>
    `;

    this._cancelButton = this.shadowRoot.querySelector("#cancel-btn");
    this._confirmButton = this.shadowRoot.querySelector("#confirm-btn");

    // Bind methods to the instance
    this._cancel = this._cancel.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  connectedCallback() {
    // Add event listeners when the element is added to the DOM
    this._cancelButton.addEventListener("click", this._cancel);
    this._confirmButton.addEventListener("click", this._confirm);
  }

  disconnectedCallback() {
    // Remove event listeners when the element is removed from the DOM
    this._cancelButton.removeEventListener("click", this._cancel);
    this._confirmButton.removeEventListener("click", this._confirm);
  }

  open() {
    this.setAttribute("opened", true);
  }

  close() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
  }

  _confirm(event) {
    this.close();
    this.confirmEvent = new Event("confirm");
    this.dispatchEvent(this.confirmEvent);
  }

  _cancel(event) {
    this.close();
    this.cancelEvent = new Event("cancel");
    this.dispatchEvent(this.cancelEvent);
  }
}

customElements.define("pm-modal", Modal);
