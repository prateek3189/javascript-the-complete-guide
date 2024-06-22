const productList = {
  products: [
    {
      title: "Pillow",
      image:
        "https://img.freepik.com/free-photo/pillows-white-background_93675-132173.jpg?t=st=1718999072~exp=1719002672~hmac=1a31f986fff0a722590fe295f630ee4ac4ce2f6e81f6b43fc1f2d5475a56ee63&w=2000",
      price: 1000.5,
      description: "A Soft pillow",
    },
    {
      title: "Carpet",
      image:
        "https://img.freepik.com/free-vector/realistic-icon-with-black-white-ornamental-carpet-floor-vector-illustration_1284-66915.jpg?t=st=1718999101~exp=1719002701~hmac=ef5a8c038a312b7654e60de486494a53192e865876eb25d3eddc074e002b61ec&w=2000",
      price: 4000.5,
      description: "A Kashmiri Carpet",
    },
    {
      title: "Curtons",
      image:
        "https://img.freepik.com/free-vector/theater-cinema-curtains-with-focus-light-vector-illustration_1017-38346.jpg?t=st=1718999686~exp=1719003286~hmac=9eeba50700af04c0735a936cef50f095110bb05559eef979aa25934d245721e0&w=1800",
      price: 2000.5,
      description: "A Curton for Hall",
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";

    for (const product of this.products) {
      const listItem = document.createElement("li");
      listItem.className = "product-item";
      listItem.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.title}" />
        <div class="product-item__content">
          <h2>${product.title}</h2>
          <h3>\$ ${product.price}</h3>
          <p>${product.description}</p>
          <button>Add To Cart</button>
        </div>
      </div>
      `;
      prodList.append(listItem);
    }

    renderHook.append(prodList);
  },
};

productList.render();
