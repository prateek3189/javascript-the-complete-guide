class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);

    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      attributes.forEach((attr) => {
        rootElement.setAttribute(attr.name, attr.value);
      });
    }

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.image = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCartHandler() {
    App.addProductToCart(this.product);
  }

  render() {
    const productItem = this.createRootElement("li", "product-item");
    productItem.innerHTML = `
    <div>
      <img src="${this.product.image}" alt="${this.product.title}" />
      <div class="product-item__content">
        <h2>${this.product.title}</h2>
        <h3>\$ ${this.product.price}</h3>
        <p>${this.product.description}</p>
        <button>Add To Cart</button>
      </div>
    </div>
    `;
    const addToCart = productItem.querySelector("button");
    addToCart.addEventListener("click", this.addToCartHandler.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.#fetchProducts();
  }

  #fetchProducts() {
    this.#products = [
      new Product(
        "Pillow",
        "https://img.freepik.com/free-photo/pillows-white-background_93675-132173.jpg?t=st=1718999072~exp=1719002672~hmac=1a31f986fff0a722590fe295f630ee4ac4ce2f6e81f6b43fc1f2d5475a56ee63&w=2000",
        "A Soft pillow",
        1000.5
      ),
      new Product(
        "Carpet",
        "https://img.freepik.com/free-vector/realistic-icon-with-black-white-ornamental-carpet-floor-vector-illustration_1284-66915.jpg?t=st=1718999101~exp=1719002701~hmac=ef5a8c038a312b7654e60de486494a53192e865876eb25d3eddc074e002b61ec&w=2000",
        "A Kashmiri Carpet",
        4000.5
      ),
      new Product(
        "Curtons",
        "https://img.freepik.com/free-vector/theater-cinema-curtains-with-focus-light-vector-illustration_1017-38346.jpg?t=st=1718999686~exp=1719003286~hmac=9eeba50700af04c0735a936cef50f095110bb05559eef979aa25934d245721e0&w=1800",
        "A Curton for Hall",
        2000.5
      ),
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const product of this.#products) {
      new ProductItem(product, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);

    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    return this.items.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.price;
    }, 0);
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProduct() {
    console.log("Ordering Product");
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now</button>
    `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", this.orderProduct.bind(this));
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
