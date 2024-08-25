class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.tooltipContainer;
    this._tooltipContent = "No text available";
    this._tooltipIcon = null;
    this.attachShadow({ mode: "open" });
    this.tooltipVisible = false;
    this.shadowRoot.innerHTML = `
    <style>
      div {
        background: black;
        color: white;
        position: absolute;
        z-index: 10;
        padding: 10px;
      }

      .icon {
        background: black;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 50%
      }

      :host-context(p) {
        font-weight: bold;
        font-size: 20px
      }

      :host {
        background: lightgray;
        padding: 20px;
        margin: 20px;
        display: block;
        position: relative;
      }

      :host(.important) {
        background: var(--color-primary);

      }

      ::slotted(.highlight) {
        border-bottom: 3px dotted red;
      }
    </style>  
    <slot></slot>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("content")) {
      this._tooltipContent = this.getAttribute("content");
    }

    this._tooltipIcon = document.createElement("span");
    this._tooltipIcon.innerHTML = "<span class='icon'>?</span>";
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._tooltipIcon);
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "content") {
      this._tooltipContent = newValue;
    }
  }

  static get observedAttributes() {
    return ["content", "class"];
  }

  _render() {
    if (this.tooltipVisible) {
      this.tooltipContainer = document.createElement("div");
      this.tooltipContainer.textContent = this._tooltipContent;
      this.shadowRoot.appendChild(this.tooltipContainer);
    } else {
      if (this.tooltipContainer) {
        this.shadowRoot.removeChild(this.tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this.tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this.tooltipVisible = false;
    this._render();
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this_showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this_hideTooltip);
  }
}

customElements.define("pm-tooltip", Tooltip);
