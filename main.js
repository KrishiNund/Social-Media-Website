//after webpage has loaded, execuet the awaiting javascript
document.addEventListener("DOMContentLoaded", () => {
  goTo(window.location.pathname);
});

function goTo(path) {
  switch (path) {
    case "/M00934333/signup":
      loadSignUpPage();
      break;

    case "/M00934333/login":
      loadLoginPage();
      break;

    default:
      loadHomePage();
      break;
  }
}

function loadPageContent(content) {
  const app = document.getElementById("app");
  app.innerHTML = createHeader() + content + createFooter() ;
}

function createHeader(){
    return `<nav class="navigation_bar navbar navbar-expand-sm bg-warning navbar-dark fixed-top">

    <div class="container-fluid">

        <div class="row align-items-center">
            <div class="col-sm-4">
                <!--Logo and Title-->
                <a class="navbar-brand ms-left" href="#">
                    <img src="images/icons8-honkai-star-rail-logo-40 (1).png" class="img-fluid" alt="Logo">
                    <span class="navbar-text font" style="color: #424874;">Trailblazers' Hangout</span>
                </a>
            </div>

            <div class="col-sm-4">
                <!--Search Bar-->
                <div class="form search_bar">
                    <i class="fa fa-search"></i>
                    <input type="text" class="form-control form-input" placeholder="Search Anything...">
                </div>
            </div>

            <div class="col-sm-4" style="display: flex;">
                <!--Menu-->
                <div>
                    <button type="button" class="btn go_to_signup_page font">
                        <!-- <img src="images/icons8-sign-up-40.png" alt="redirectToSignUpPageButton"> -->
                        Sign Up
                    </button>

                </div>

                <div>
                    <button type="button" class="btn go_to_login_page font">
                        <!-- <img src="images/icons8-sign-up-40.png" alt="redirectToSignUpPageButton"> -->
                        Login
                    </button>

                </div>
                
                <div class="dropdown user_profile_button">
                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                       <img src="images/icons8-user-profile-40.png" alt="User Profile" class="rounded-circle">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><span class="dropdown-item-text">Status:Logged In/ Logged Out</span></li>
                    </ul>
                </div>

                <div>
                    <!--Settings button-->
                    <button type="button" class="btn settings_button">
                        <img src="images/icons8-settings-40 (1).png" alt="settings button" class="img-fluid">
                    </button>
                </div>
            </div>

        </div>
   
    </div>
</nav>`
}

function createFooter(){

}


function loadHomePage() {
  const homePageContent = `<h2 style="text-align: center;color: black;">This is working!</h2>
    <div width="500" height="500" style="display:flex">
     <img src="images/nahidwin.jpg" alt="Gojo" width="500" height="500">
     <img src="images/gigachad-cat-v0-mfrsimrgvi1c1.webp" alt="Giga cat" width="500" height="500">
    </div>`;

    loadPageContent(homePageContent);
}
