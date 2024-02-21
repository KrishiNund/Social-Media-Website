//after webpage has loaded, execute the awaiting javascript
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

//? load page content according to its type
function loadPageContent(content, type) {
  const app = document.getElementById("app");
  if (type == "homepage") {
    app.innerHTML = createHeader() + content;
  } else {
    app.innerHTML = content + createFooter();
  }
}

//returns html code for header and navigation bar
function createHeader() {
  return `<!--Creating our navigation bar-->
  <nav class="navigation_bar navbar navbar-expand-sm bg-warning navbar-dark fixed-top">
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

              <div class="d-flex align-items-center flex-grow-1">
                  <!--Sign Up-->
                  <div class="flex-grow-1">
                      <a href="#/signup" class="go_to_signup_page">Sign Up</a>
                  </div>
                  <!--Login-->
                  <div class="flex-grow-1">
                      <a href="#/login" class="go_to_login_page">Login</a>
                  </div>

                  <!--User profile button/dropdown-->
                  <div class="dropdown user_profile_button flex-grow-1">
                      <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
                         <img src="images/icons8-user-profile-48.png" alt="User Profile" class="rounded-circle">
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                          <li><span class="dropdown-item-text">Status:Logged In/ Logged Out</span></li>
                      </ul>
                  </div>

                  <!--Settings Button-->
                  <div class="flex-grow-1">
                      <button type="button" class="btn settings_button" onclick="ClickSettingsButton()">
                          <img src="images/icons8-settings-40.png" alt="settings button" class="img-fluid">
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </nav>`;
}

//returns html code for footer
function createFooter() {
  return `<!--Footer with copyright text-->
    <footer class="footer">
        <div class="container-fluid text-center">
            <small>&copy; 2024 Trailblazers' Hangout. All Rights Reserved.</small>
        </div>
    </footer>`;
}

//loads home page's main content/html
function loadHomePage() {
  const homePageContent = `<div class="container-fluid d-flex flex-row align-items-center justify-content-between">
  <!--Main Content-->
  <div>
      <!--Feed menu showcasing the different kinds of feed-->
      <div class="feed_options d-flex flex-row align-items-center justify-content-between rounded fixed-top">
          <button type="button" class="btn" style="text-decoration:underline;" id="explorePostsButton" onclick="showExplorePosts()">Explore</button>
          <button type="button" class="btn" id="followingPostsButton"  onclick="showFollowingPosts()">Following</button>
          <button type="button" class="btn" id="eventPostsButton" onclick="showEventPosts()">Events</button>
      </div>

      <!--Posts Sections-->
      <div class="post_area">
          <!--First Post Example-->
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
                      <i class="fa fa-comment-o" onclick="showCommentBox()"></i>
                  </button>
              </div>
          </div>

          <!--Second Post Example-->
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

          <!--Third Post Example-->
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

      <!--Trending Hashtags Widget-->
      <div class="trending_hashtags text-center">
          <div class="widget_header"><h4>Trending</h4></div>
          <span>#PenaconyUpdate <hr></span>
          <span>#Version2.0 <hr></span>
          <span>#Firefly <hr></span>
          <span>#HSR</span>
      </div>

      <!--Post Panel: Post Text, Images and Videos-->
      <div class="post_panel text-center">
          <div class="widget_header"><h4>Post Now~~</h4></div>

          <div class="d-flex flex-row post_options">
              <button type="button" class="btn" style="border: none;">
                  <i class="fa fa-camera fa-2x" onclick="showPostBox()"></i>
              </button>

              <button type="button" class="btn" style="border: none;">
                  <i class="fa fa-video-camera fa-2x" onclick="showPostBox()"></i>
              </button>

              <button type="button" class="btn" style="border: none;">
                  <i class="fa fa-pencil-square-o fa-2x" onclick="showPostBox()"></i>
              </button>

          </div>
      </div>

      <!--Contact Box containing essential pages redirection and copyright mark-->
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

<!--Settings Pop Up-->
<div class="container settings_box mx-auto text-center">

  <div class="settings_header">
      <h2>Settings Box<hr></h2>   
  </div>

  <p>Account Creation Date:XX-XX-XXXX</p>

  <div class="d-flex flex-row mx-auto">
      <button type="button" class="btn">Log Out</button>
      <button type="button" class="btn">Delete account</button>
  </div>

</div>

<!--Post Composer Pop Up-->
<div class="container post_box mx-auto">
  <div class="post_box_header d-flex flex-row">
      <h2>Post Box</h2>
      <i class="fa fa-times-circle-o fa-2x" onclick="closePostBox()"></i>
  </div>
  <textarea id="post_text" placeholder="Write something here..."></textarea>

  <!--Accept Images and Videos to be posted as well-->
  <div class="media_upload d-flex flex-column">
      <span class="d-flex flex-row media_upload_button mb-3">
          <p>Add </p>
          <i class="fa fa-camera"></i>
          <p>:</p>
          <input type="file" accept="image/*">
      </span>

      <span class="d-flex flex-row media_upload_button">
          <p>Add</p>
          <i class="fa fa-video-camera"></i>
          <p>:</p>
          <input type="file" accept="video/*">
      </span>
  </div>
  <button type="button" class="btn post_button">Post</button> 
</div>

<!--Comment Box Pop up-->
<div class="comment_section">
  <div class="comment_section_header d-flex flex-row ">
      <h2 class="mt-2">Comments</h2>
      <i class="fa fa-times-circle-o fa-2x" onclick="closeCommentBox()"></i>
  </div>

  <div class="comment_box d-flex flex-column mx-auto mt-2 rounded">

      <!--First example of comment-->
      <div class="comment d-flex flex-column mt-2">
          <div class="commenter_profile d-flex flex-row">
              <img src="images/icons8-user-profile-48.png" alt="user_profile" class="img-fluid mb-2">
              <p class="mt-2">Salty Player</p>
          </div>
  
          <div class="comment_content">
              <p>Dan Heng IL is just too OP! The devs need to nerf him!!</p>
          </div>
          <!--Adding engagement buttons: like, dislike-->
          <div class="d-flex flex-row">
              <button type="button" class="btn">
                  <i class="fa fa-heart-o"></i>
              </button>

              <button type="button" class="btn">
                  <i class="fa fa-thumbs-o-down"></i>
              </button>
          </div>
          <hr>
      </div>

       <!--Second example of comment-->
       <div class="comment d-flex flex-column mt-2">
          <div class="commenter_profile d-flex flex-row">
              <img src="images/icons8-user-profile-48.png" alt="user_profile" class="img-fluid mb-2">
              <p class="mt-2">Top Cat</p>
          </div>
  
          <div class="comment_content">
              <p>Yes you can stop farming now! Maybe try to get sparkle next update to maximise his damage.</p>
          </div>
          <!--Adding engagement buttons: like, dislike-->
          <div class="d-flex flex-row">
              <button type="button" class="btn">
                  <i class="fa fa-heart-o"></i>
              </button>

              <button type="button" class="btn">
                  <i class="fa fa-thumbs-o-down"></i>
              </button>
          </div>
          <hr>
      </div>

       <!--Third example of comment-->
       <div class="comment d-flex flex-column mt-2">
          <div class="commenter_profile d-flex flex-row">
              <img src="images/icons8-user-profile-48.png" alt="user_profile" class="img-fluid mb-2">
              <p class="mt-2">Tryhard Player</p>
          </div>
  
          <div class="comment_content">
              <p>No!! You should never stop farming for your favourite character. Build Rating: 7/10. His relics can be improved.</p>
          </div>
          <!--Adding engagement buttons: like, dislike-->
          <div class="d-flex flex-row">
              <button type="button" class="btn">
                  <i class="fa fa-heart-o"></i>
              </button>

              <button type="button" class="btn">
                  <i class="fa fa-thumbs-o-down"></i>
              </button>
          </div>
          <hr>
      </div> 
  </div>
</div>`;

  loadPageContent(homePageContent, "homepage");
}

//loads sign up page's html elements
function loadSignUpPage() {
  const content = `<link rel="stylesheet" href="forms.css">
    <!--Back Button-->
    <div class="container d-flex flex-column">
        <div class="back_button">
            <a href="/#">
                <img src="images/icons8-back-button-64.png" alt="go_back">
            </a>
        </div>
        <!--sign up form with different data fields-->
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
                <input type="email" class="form-input form-control entry_field mx-auto" placeholder="Email" required>
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

        <!--Redirection to login page if user already has an account-->
        <div class="mx-auto login_box text-center">
            <p class="mt-3">Have an account? <a href="#/login" style="text-decoration: none;">Log in</a></p>
        </div>

    </div>`;
  loadPageContent(content, "signup");
}

//loads login page's html elements
function loadLoginPage() {
  const content = `<link rel="stylesheet" href="forms.css">
    <!--Back Button-->
    <div class="container d-flex flex-column">
        <div class="back_button">
            <a href="/#">
                <img src="images/icons8-back-button-64.png" alt="go_back">
            </a>
        </div>

        <!--Login Form with username and password fields-->
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

        <!--Redirection to signup page if user does not have an account already-->
        <div class="mx-auto login_box text-center">
            <p class="mt-3">Don't have an account? <a href="#/signup" style="text-decoration: none;">Sign Up</a></p>
        </div>
    </div>`;
  loadPageContent(content, "login");
}

//opens and closes settings box
function ClickSettingsButton() {
  settingsBox = document.querySelector(".settings_box");
  console.log(settingsBox.style.display);
  if (settingsBox.style.display == "block") {
    settingsBox.style.display = "none";
  } else {
    settingsBox.style.display = "block";
  }
}

//closes post box/composer on clicking close button
function closePostBox() {
  postBox = document.querySelector(".post_box");
  if (postBox.style.display == "block") {
    postBox.style.display = "none";
  }
}

//opens post box/composer on clicking on post panel's icons
function showPostBox() {
  postBox = document.querySelector(".post_box");
  if (postBox.style.display == "block") {
    postBox.style.display = "none";
  } else {
    postBox.style.display = "block";
  }
}

//switch highlight to explore button on feed
function showExplorePosts() {
  exploreButton = document.getElementById("explorePostsButton");
  exploreButton.style.textDecoration = "underline";

  followingPostsButton = document.getElementById("followingPostsButton");
  followingPostsButton.style.textDecoration = "none";

  eventPostsButton = document.getElementById("eventPostsButton");
  eventPostsButton.style.textDecoration = "none";
}

//switch highlight to following button on feed
function showFollowingPosts() {
  exploreButton = document.getElementById("explorePostsButton");
  exploreButton.style.textDecoration = "none";

  followingPostsButton = document.getElementById("followingPostsButton");
  followingPostsButton.style.textDecoration = "underline";

  eventPostsButton = document.getElementById("eventPostsButton");
  eventPostsButton.style.textDecoration = "none";
}

//switch highlight to events button on feed
function showEventPosts() {
  exploreButton = document.getElementById("explorePostsButton");
  exploreButton.style.textDecoration = "none";

  followingPostsButton = document.getElementById("followingPostsButton");
  followingPostsButton.style.textDecoration = "none";

  eventPostsButton = document.getElementById("eventPostsButton");
  eventPostsButton.style.textDecoration = "underline";
}

//close comment box on a post
function closeCommentBox(){
    commentBox = document.querySelector(".comment_section");
    if (commentBox.style.display == "block") {
        commentBox.style.display = "none";
    }
}

//open comment box on a post
function showCommentBox() {
    commentBox = document.querySelector(".comment_section");
    if (commentBox.style.display == "block") {
      commentBox.style.display = "none";
    } else {
      commentBox.style.display = "block";
    }
}