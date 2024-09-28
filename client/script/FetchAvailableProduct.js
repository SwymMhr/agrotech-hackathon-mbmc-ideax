const SERVER_URL = "http://localhost:5173/api/";


// fetch all product

const FETCH_ALL_AVAILABLE_PRODUCT = `${SERVER_URL}product/all`;

const myProductList = document.querySelector("#availableProduct");
const renderProduct = (product) => {
  const card = `<div class="col">
      <div class="card " style="width: 18rem;">
      <img src="${product.image}" class="card-img-top" alt="${product.producttitle}">
                    <div class="card-body">
                    <h5 class="card-title">${product.producttitle}</h5>
                    <p class="card-text">${product.description}</p>
                    <a class="btn btn-primary" href="/product.html?productID=${product._id}">Open</a>
                    </div>
                </div>
            </div>`;
  return card;
};

const renderProducts = (products) => {
  let productList = "";
  products.forEach((product) => {
    productList += renderProduct(product);
  });
  myProductList.innerHTML = productList;
};

const getProducts = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  try {
    const response = await fetch(FETCH_ALL_AVAILABLE_PRODUCT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": `${token}`, // Send token if needed
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      renderProducts(data.data);
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("An error occurred", err);
  }
};

setTimeout(() => {
  getProducts();
}, 1);