// import { SERVER_URL } from "../config.js"; // importing the config file
// script to handle registration of new users

const SERVER_URL = "http://localhost:5173/api/";
const REGISTER_URL = `${SERVER_URL}auth/register`;

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", register);

async function register(e) {
  e.preventDefault();
  e.stopPropagation();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const contact = document.getElementById("contact");
  const category = document.getElementById("category");
  const confirmPassword = document.getElementById("confirmPassword");
  const message = document.getElementById("message");
  
  console.log(firstName.value, lastName.value, email.value, password.value, contact.value, category.value, confirmPassword.value);

  if (password.value !== confirmPassword.value) {
    message.innerHTML = "Passwords do not match";
    return;
  }
  // send data to server
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    contact: contact.value,
    category: category.value,
  };
  
  try {
    await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response["status"]);
        if (response["status"] === 200) {
          message.innerHTML = response["message"];
        } else {
          message.innerHTML = response["message"];
        }
      })
      .catch((err) => {
        message.innerHTML = err.message;
      });
  } catch (error) {
    message.innerHTML = error.message;
  }
}
