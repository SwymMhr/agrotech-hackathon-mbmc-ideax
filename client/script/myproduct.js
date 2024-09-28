const SERVER_URL = "http://localhost:5173/api/";
const SERVER_PUBLIC_URL = "http://localhost:5173/";
if (sessionStorage.getItem("token") === null) {
  window.location.href = "../index.html";
}


// fetch product by user id

const FETCH_PRODUCT_BY_USER_ID = `${SERVER_URL}product/userId/${JSON.parse(
  sessionStorage.getItem("userId")
)}`;



const myProductList = document.querySelector("#myProductList");
const renderProduct = (product) => {
      let productId = product._id;
      productId = productId.trim();
  const card = `<div class="col">
      <div class="card " style="width: 18rem;">
      <img src="${product.image}" class="card-img-top" alt="${product.producttitle}">
                    <div class="card-body">
                    <h5 class="card-title">${product.producttitle}</h5>
                    <p class="card-text">${product.description}</p>
                    <input type="hidden" value="${productId}">
                    <button class="btn btn-primary sold-btn">Sold</button>
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
    const response = await fetch(FETCH_PRODUCT_BY_USER_ID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Send token if needed
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

// add product

const ADD_PRODUCT_URL = `${SERVER_URL}product/add`;

const addProduct = async (e) => {
  e.preventDefault();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const addProductTitle = document.getElementById("addProductTitle");
  const addProductDescription = document.getElementById(
    "addProductDescription"
  );
  const addProductPhoto = document.getElementById("addProductPhoto");
  const addProductCategory = document.getElementById("addProductCategory");
  const addProductPrice = document.getElementById("addProductPrice");

  // Check if a photo is selected
  if (!addProductPhoto.files.length) {
    alert("Please upload a product photo.");
    return;
  }

  const uploadImage = async () => {
    const URI = `https://api.imgbb.com/1/upload?key=5a93615c80edfa0fe70eb0706df0ef66`;
    const formData = new FormData();
    formData.append("image", addProductPhoto.files[0]);

    try {
      const response = await fetch(URI, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.data.image.url;
    } catch (err) {
      console.log(err);
    }
  };
  const image = await uploadImage();

  const productData = {
    producttitle: addProductTitle.value,
    description: addProductDescription.value,
    image: image,
    category: addProductCategory.value,
    price: addProductPrice.value,
    userId: JSON.parse(sessionStorage.getItem("userId")),
    isAvailable: true,
  };
  console.log(productData);

  try {
    const response = await fetch(ADD_PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (data.status === 200) {
      // Call getProducts() to refresh product list
      getProducts();
      alert("Product added successfully!");

      // Clear the form fields after successful submission
      addProductTitle.value = "";
      addProductDescription.value = "";
      addProductPhoto.value = "";
      addProductCategory.value = "";
      addProductPrice.value = "";
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert(`An error occurred: ${err.message}`);
  }
};

const addProductButton = document.getElementById("addProductButton");
addProductButton.addEventListener("click", addProduct);


    


// delete product

async function sold(productId) {
  console.log(productId);
  const SOLD_PRODUCT_URL = `${SERVER_URL}product/delete/${productId}`;
  const token = JSON.parse(sessionStorage.getItem("token"));

  try {
    const response = await fetch(SOLD_PRODUCT_URL, {  // Await the fetch call
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": `${token}`,
      },
    });
    
    const data = await response.json();  // Await the JSON parsing

    if (response.ok) {  // Check if the response is successful (status 200-299)
      getProducts();  // Refresh the product list
      alert("Product sold successfully!");
      window.location.href='http://127.0.0.1:5500/dashboard.html'
    } else {
      alert(data.message || "Failed to sell the product.");  // Provide a default error message
    }
  } catch (err) {
    alert(`An error occurred: ${err.message}`);  // Catch any errors during the fetch
  }
}


setTimeout(() => {
  const soldButton = document.querySelectorAll(".sold-btn");
  console.log(soldButton);
  soldButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.previousElementSibling.value;
      sold(productId);
    });
  });
}, 3000);