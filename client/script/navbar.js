
export const navbarListforNotLoggedInSession =
  '<ul class="navbar-nav gap-3"><li class="nav-item"><a class="nav-link" href="#">Search</a></li><li class="nav-item"><a class="nav-link" href="/">Home</a></li><li class="nav-item"><a class="nav-link" href="/business.html">Business</a></li><li class="nav-item ms-2 d-none d-md-inline"><a class="btn btn-secondary" href="/login.html">Log in</a></li><a class="btn border bg-white" href="/registration.html">Register</a></li></ul>';
export const navbarListforLoggedInSession =
  '<ul class="navbar-nav" id="navbar"><li class="nav-item"><a class="nav-link" href="#">Search</a></li><li class="nav-item"><a class="nav-link" href="/">Home</a></li><li class="nav-item"><a class="nav-link" href="/business.html">Business</a></li><li class="nav-item"><a class="nav-link" href="/dashboard.html">Dashboard</a></li><li class="nav-item"><span class="pt-5" id="userEmail"></span></li><li class="nav-item" id="logout"><button class="btn btn-danger" id="logout">Logout</button></li></ul>';

export function navbar() {
  const navbar = document.getElementById("main-nav");
  if (sessionStorage.getItem('email') !== null && sessionStorage.getItem("userId") !== undefined && sessionStorage.getItem("email") !== undefined) {
    navbar.innerHTML = navbarListforLoggedInSession;
    const userEmail = document.getElementById("userEmail");
    userEmail.innerHTML = JSON.parse(sessionStorage.getItem("email"));
  } else {
    navbar.innerHTML = navbarListforNotLoggedInSession;
  }
}
navbar();

export function logout() {
      const logoutButton = document.getElementById("logout");
      logoutButton.addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = "/";
      });
}
if(document.getElementById("logout")){
      logout();
}