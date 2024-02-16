//after webpage has loaded, execuet the awaiting javascript
document.addEventListener("DOMContentLoaded", () => {
    goTo(window.location.hash);
});

window.addEventListener("hashchange", () => {
    goTo(window.location.hash);
});
function goTo(hash) {
  switch (hash) {
    case "#/signup": 
      loadSignUpPage();
      break;

    case "#/login":
      loadLoginPage();
      break;

    default:
      loadHomePage();
      break;
  }
}

function loadPageContent(content,type) {
    const app = document.getElementById("app");
  if (type == "homepage"){
    app.innerHTML = createHeader() + content;
  } else {
    app.innerHTML = content + createFooter();
  }
}

function createHeader() {
  return `<nav class="navigation_bar navbar navbar-expand-sm bg-warning navbar-dark fixed-top">
  <div class="container-fluid">
      <div class="d-flex flex-row align-items-center justify-content-between">
          <div class="flex-grow-1">
              <!--Logo and Title-->
              <a class="navbar-brand ms-left" href="#">
                  <img src="images/icons8-honkai-star-rail-logo-50.png" class="img-fluid" alt="Logo">
                  <span class="navbar-text" style="color: #B8BBD6;">Trailblazers' Hangout</span>
              </a>
          </div>

          <div class="flex-grow-1">
              <!--Search Bar-->
              <div class="form search_bar">
                  <i class="fa fa-search"></i>
                  <input type="text" class="form-control form-input" placeholder="Search Anything...">
              </div>
          </div>

          <!--Menu-->
          <div class="d-flex align-items-center flex-grow-1">
              <!--Sign Up-->
              <div class="flex-grow-1">
                <a href="#/signup" class="go_to_signup_page">Sign Up</a>
              </div>
              <!--login-->
              <div class="flex-grow-1">
              <a href="#/login" class="go_to_login_page">Login</a>
              </div>
              <!--User profile-->

              <div class="dropdown user_profile_button flex-grow-1">
                  <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                     <img src="images/icons8-user-profile-48.png" alt="User Profile" class="rounded-circle">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                      <li><span class="dropdown-item-text">Status:Logged In/ Logged Out</span></li>
                  </ul>
              </div>

              <!--Settings-->
              <div class="flex-grow-1">
                  <!--Settings button-->
                  <button type="button" class="btn settings_button" onclick="ClickSettingsButton()">
                      <img src="images/icons8-settings-40.png" alt="settings button" class="img-fluid">
                  </button>
              </div>
          </div>
      </div>
  </div>
</nav>`;
}

function createFooter() {

    return `<footer class="footer">
        <div class="container-fluid text-center">
            <small>&copy; 2024 Trailblazers' Hangout. All Rights Reserved.</small>
        </div>
    </footer>`

}

function loadHomePage() {
  const homePageContent = `<div class="container-fluid d-flex flex-row align-items-center justify-content-between">
  <!--Main Content-->
  <div>
      <!--Feed menu-->
      <div class="feed_options d-flex flex-row align-items-center justify-content-between rounded fixed-top">
          <button type="button" class="btn">Following</button>
          <button type="button" class="btn">Explore</button>
          <button type="button" class="btn">Events</button>
      </div>

      <!--Posts-->
      <div class="post_area">

          <!--First Post-->
          <div class="post">
              <!--Post related buttons-->
              <div class="user_info d-flex align-items-center">
                  <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                  <span style="position: relative; left: 1.5em;">CatKittyCatCat</span>
                  <button type="button" class="btn follow_button">Follow</button>
                  <button type="button" class="btn">⋮</button>
              </div>
              
              <!--Post Contents-->
              <div class="post_content d-flex flex-column">
                  <span><h5>Can I stop farming now?</h2></span>
                  <img src="images/dan_heng_build.jpg" alt="dan_heng_build" class="img-fluid rounded" >
                  <span style="color: #533A7B;"><h6>#danheng #buildreview</h6></span>
              </div>
  
              <hr>

              <!--Adding engagement buttons: like, dislike, comment-->
              <div class="d-flex flex-row engagement_buttons">
                  <button type="button" class="btn">
                      <i class="fa fa-heart-o"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-thumbs-o-down"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-comment-o"></i>
                  </button>
              </div>
          </div>

          <!--Second Post-->
          <div class="post">
              <!--Post related buttons-->
              <div class="user_info d-flex align-items-center">
                  <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                  <span style="position: relative; left: 1.5em;">GingerCat</span>
                  <button type="button" class="btn follow_button">Follow</button>
                  <button type="button" class="btn">⋮</button>
              </div>
              
              <!--Post Contents-->
              <div class="post_content d-flex flex-column">
                  <span><h5>Which banner do you recommend pulling on?</h2></span>
                  <img src="images/banner.jpg" alt="dan_heng_build" class="img-fluid rounded" >
                  <span style="color: #533A7B;"><h6>#banner #newupdate</h6></span>
              </div>
  
              <hr>

              <!--Adding engagement buttons: like, dislike, comment-->
              <div class="d-flex flex-row engagement_buttons">
                  <button type="button" class="btn">
                      <i class="fa fa-heart-o"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-thumbs-o-down"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-comment-o"></i>
                  </button>
              </div>
          </div>

          <!--Third Post-->
          <div class="post">
              <!--Post related buttons-->
              <div class="user_info d-flex align-items-center">
                  <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                  <span style="position: relative; left: 1.5em;">GigaCat</span>
                  <button type="button" class="btn follow_button">Follow</button>
                  <button type="button" class="btn">⋮</button>
              </div>
              
              <!--Post Contents-->
              <div class="post_content d-flex flex-column">
                  <span><h5>How to defeat this boss in less than 2 turns?</h2></span>
                  <img src="images/boss_battle.jpg" alt="dan_heng_build" class="img-fluid rounded" >
                  <span style="color: #533A7B;"><h6>#bossbattle #cocolia</h6></span>
              </div>
  
              <hr>

              <!--Adding engagement buttons: like, dislike, comment-->
              <div class="d-flex flex-row engagement_buttons">
                  <button type="button" class="btn">
                      <i class="fa fa-heart-o"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-thumbs-o-down"></i>
                  </button>

                  <button type="button" class="btn">
                      <i class="fa fa-comment-o"></i>
                  </button>
              </div>
          </div>

      </div>
  </div>

  <!--Right sidebar-->
  <div class="d-flex flex-column position-fixed sidebar">

      <div class="trending_hashtags text-center">
          <div class="widget_header"><h4>Trending</h4></div>
          <span>#PenaconyUpdate <hr></span>
          <span>#Version2.0 <hr></span>
          <span>#Firefly <hr></span>
          <span>#HSR</span>
      </div>

      <div class="post_panel text-center">
          <div class="widget_header"><h4>Post Now~~</h4></div>

          <div class="d-flex flex-row post_options">
              <button type="button" class="btn">
                  <i class="fa fa-camera fa-2x"></i>
              </button>

              <button type="button" class="btn">
                  <i class="fa fa-video-camera fa-2x"></i>
              </button>

              <button type="button" class="btn">
                  <i class="fa fa-pencil-square-o fa-2x"></i>
              </button>

          </div>
      </div>

      <div class="contact_box text-center">
          <div class="widget_header"><h4>Contact</h4></div>

          <span>
              <a href="#">About Us</a>
              <br>
              <a href="#">Terms of Use</a>
              <br>
              <a href="#">Privacy Policy</a>
              <br>
              Email Address: ON144@live.mdx.ac.uk 
              <br>
              Copyright &copy; 2024 Trailblazers' Hangout 
          </span>
      </div>

  </div>
</div>

<div class="container settings_box mx-auto text-center">

        <div class="settings_header">
            <h2>Settings Box<hr></h2>   
        </div>

        <p>Account Creation Date:XX-XX-XXXX</p>

        <div class="d-flex flex-row mx-auto">
            <button type="button" class="btn">Log Out</button>
            <button type="button" class="btn">Delete account</button>
        </div>
    
    </div>`;

  loadPageContent(homePageContent,"homepage");
}

function loadSignUpPage(){
    const content =`<link rel="stylesheet" href="forms.css">
    <div class="container d-flex flex-column">
    <div class="back_button">
        <a href="/M00934333/#">
            <img src="images/icons8-back-button-64.png" alt="go_back">
        </a>
    </div>

    <form class="mx-auto text-center d-flex flex-column">
        <div class="form_header">
            <h4>Sign up<hr></h4>
        </div>

        <div class="mb-3">
            <input type="text" class="form-input form-control mx-auto entry_field" placeholder="Full Name" required>
        </div>

        <div class="mb-3">
            <input type="text" class="form-input form-control entry_field mx-auto" placeholder="Username" required>
        </div>

        <div class="mb-3">
            <input type="text" class="form-input form-control entry_field mx-auto" placeholder="Email" required>
        </div>

        <div class="form-group">
            <input type="password" class="form-input form-control entry_field mx-auto" placeholder="Password" required>
            <i class="fa fa-eye-slash show_hide_password"></i>
        </div>
        
        <div class="form-group mb-3">
            <label for="gender">Gender: </label>

            <input type="radio" class="radio" name="gender" value="male">
            <label for="fullName" class="label">Male</label>

            <input type="radio" class="radio" name="gender" value="female">
            <label for="fullName" class="label">Female</label>

            <input type="radio" class="radio" name="gender" value="other">
            <label for="fullName" class="label">Rather not disclose</label>
        </div>

        <div class="form-group mb-3">
            <label for="dob">Date of Birth: </label>
            <input type="date" style="border-radius: 20px; border: 2px solid black" id="dob" name="dob" required>
        </div>

        <button type="submit" class="btn submit_button mx-auto">Submit</button>
        
    </form>

    <div class="mx-auto login_box text-center">
        <p class="mt-3">Have an account? <a href="/M00934333/#/login" style="text-decoration: none;">Log in</a></p>
    </div>

</div>`;
    loadPageContent(content,"signup");
}

function loadLoginPage(){
    const content=`<link rel="stylesheet" href="forms.css">
    <div class="container d-flex flex-column">
    <div class="back_button">
        <a href="/M00934333/#">
            <img src="images/icons8-back-button-64.png" alt="go_back">
        </a>
    </div>

    <form class="mx-auto text-center d-flex flex-column">
        <div class="form_header">
            <h4>Login<hr></h4>
        </div>

        <div class="mb-3">
            <input type="text" class="form-input form-control entry_field mx-auto" placeholder="Username" required>
        </div>

        <div class="form-group">
            <input type="password" class="form-input form-control entry_field mx-auto" placeholder="Password" required>
            <i class="fa fa-eye-slash show_hide_password"></i>
        </div>
        

        <button type="submit" class="btn submit_button mx-auto">Confirm</button>
        
    </form>

    <div class="mx-auto login_box text-center">
        <p class="mt-3">Don't have an account? <a href="/M00934333/#/signup" style="text-decoration: none;">Sign Up</a></p>
    </div>

</div>`;
    loadPageContent(content,"login");
}

function ClickSettingsButton(){
    settingsBox = document.querySelector('.settings_box');
    console.log(settingsBox.style.display);
    if (settingsBox.style.display == 'block'){
        settingsBox.style.display = 'none';
    } else {
        settingsBox.style.display = 'block';
    }
    
}