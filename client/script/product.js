// fetch single product

// const searchDetails = window.location.search;

const searchParams = new URLSearchParams(window.location.search);
const productId = searchParams.get("productID");

// fetch user by id
const fetchUser = async (userId) => {
  const SERVER_URL = `http://localhost:5173/api/user/userId/${userId}`;

  const response = await fetch(SERVER_URL);
  const data = await response.json();
  const user = data.data;

  const sellerDetails = `
                <div class="col justify-content-end border border-5">
                    <div class="p-4">
                        <h2>Seller Information:</h2>
                        <p>${user.firstName} ${user.lastName}</p>
                        <p>${user.contact}</p>
                        <p>${user.email}</p>
                        <button class="btn btn-secondary">Chat with Seller</button>
                    </div>
            </div>`;
  return sellerDetails;
  //     });
};

// fetch product by id
const fetchProduct = () => {
  const SERVER_URL = `http://localhost:5173/api/product/productId/${productId}`;
  const response = fetch(SERVER_URL);
  response
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const product = data.data;
      const userId = product.userId;
      const productDetails = document.getElementById("product-container");
      fetchUser(userId).then((sellerDetails) => {
        productDetails.innerHTML = `
                <div class="row pt-3">
                <div class="col" style="max-width:600px;">
                    <img src="${product.image}" width="100%" alt="raddish">
                </div>
                <div class="col justify-content-center ms-2">
                    <div>
                        <h1>${product.producttitle}</h1>
                        <p>
                            ${product.description}
                        </p>
                        <p>Price: ${product.price}</p>
    
                    </div>
                    ${sellerDetails} 
                </div>
                </div>
                `;
      });
    });
};

setTimeout(() => {
  fetchProduct();
}, 2000);
