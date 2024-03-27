// const { default: Swal } = require("sweetalert2");

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

// load page content according to its type
function loadPageContent(content, type) {
  const app = document.getElementById("app");
  if (type == "homepage") {
    app.innerHTML = createHeader() + content;
    loadPosts();
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
                        <i class="fa fa-circle-user fa-2x" style="color:#b8bbd6"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                          <li><span id="statusText" class="dropdown-item-text"><span id="sessionUsername"></span>Status:Logged Out</span></li>
                      </ul>
                  </div>

                  <!--Settings Button-->
                  <div class="flex-grow-1">
                      <button type="button" class="btn settings_button" onclick="ClickSettingsButton()">
                        <i class="fa fa-gear fa-2x" style="color:#b8bbd6;"></i>
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
    const TopContent = `<div class="container-fluid d-flex flex-row align-items-center justify-content-between">
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
                

            </div>
        </div>`;

    const sideContent = `<!--Right sidebar-->
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
                    <div class="widget_header d-flex flex-row">
                    <h4>Post Area</h4>
                    <button type="button" class="btn mt-4" style="border:none;" onclick="showPostBox()">
                        <i class="fa fa-square-plus fa-2x"></i>
                    </button>
                    </div>
        
                    <div class="d-flex flex-row post_options">
                        <button type="button" class="btn" style="border: none;">
                            <i class="fa fa-camera fa-2x"></i>
                        </button>
        
                        <button type="button" class="btn" style="border: none;">
                            <i class="fa fa-video-camera fa-2x"></i>
                        </button>
        
                        <button type="button" class="btn" style="border: none;">
                            <i class="fa fa-pencil-square-o fa-2x"></i>
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
        </div>`;
  
    const popupContent = `<!--Settings Pop Up-->
        <div class="container settings_box mx-auto text-center">
        
        <div class="settings_header">
            <h2>Settings Box<hr></h2>   
        </div>
        
        <p>Account Creation Date:XX-XX-XXXX</p>
        
        <div class="d-flex flex-row mx-auto">
            <button type="button" class="btn" onclick="logOut()">Log Out</button>
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
                <i class="fa fa-photo-film"></i>
                <p>:</p>
                <input name="mediaUpload" id="mediaUpload" type="file" accept="image/*,video/*">
            </span>
        </div>
        <button type="button" class="btn post_button" onclick="createPost()">Post</button> 
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

    const homePageContent = TopContent + sideContent + popupContent;
    
  loadPageContent(homePageContent, "homepage");
}

//loads sign up page's html elements
function loadSignUpPage() {
  const content = `<link rel="stylesheet" href="forms.css">
    <!--Back Button-->
    <div class="container d-flex flex-column">
        <div class="back_button">
            <a href="/#">
                <i class="fa fa-circle-left fa-3x" style="color:white"></i>
            </a>
        </div>
        <!--sign up form with different data fields-->
        <form id="signupForm" class="mx-auto text-center d-flex flex-column" method = "post" onsubmit="validateSignup(event)">
            <div class="form_header">
                <h4>Sign up<hr></h4>
            </div>

            <div class="mb-3">
                <input type="text" name="fullName" class="form-input form-control mx-auto entry_field" placeholder="Full Name" required>
            </div>

            <div class="mb-3">
                <input type="text" name="username" id="username" class="form-input form-control entry_field mx-auto" placeholder="Username" required>
            </div>

            <div class="mb-3">
                <input type="email" name="email" id="email" class="form-input form-control entry_field mx-auto" placeholder="Email" required>
            </div>

            <div class="form-group">
                <input type="password" name ="password" id="password" class="form-input form-control entry_field mx-auto" placeholder="Password" required>
                <i class="fa fa-eye-slash show_hide_password" onclick="showHidePassword()"></i>
            </div>
            
            <div class="form-group mb-3">
                <label for="gender">Gender: </label>

                <input type="radio" class="radio" name="gender" value="male" required>
                <label for="gender" class="label">Male</label>

                <input type="radio" class="radio" name="gender" value="female" required>
                <label for="gender" class="label">Female</label>

                <input type="radio" class="radio" name="gender" value="other" required>
                <label for="gender" class="label">Rather not disclose</label>
            </div>

            <div class="form-group mb-3">
                <label for="dob">Date of Birth: </label>
                <input type="date" name = "dob" style="border-radius: 20px; border: 2px solid black" id="dob" name="dob" required>
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
                <i class="fa fa-circle-left fa-3x" style="color:white"></i>
            </a>
        </div>

        <!--Login Form with username and password fields-->
        <form id="loginForm" name="loginForm" class="mx-auto text-center d-flex flex-column" method = "post" onsubmit="validateLogin(event)">
            <div class="form_header">
                <h4>Login<hr></h4>
            </div>

            <div class="mb-3">
                <input type="text" id="username" name="username" class="form-input form-control entry_field mx-auto" placeholder="Username" required>
            </div>

            <div class="form-group">
                <input type="password" id="password" name="password" class="form-input form-control entry_field mx-auto" placeholder="Password" required>
                <i class="fa fa-eye-slash show_hide_password" onclick="showHidePassword()"></i>
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
function closeCommentBox() {
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


/*if show is pressed, show actual password
else if hide is pressed, hide password
by default, password is hidden*/
function showHidePassword() {
    //show/hide password
    let showHideButton = document.querySelector(".show_hide_password");
    let password = document.getElementById("password");
    
    if (password.type === "password"){
        password.type = "text";
        showHideButton.classList.remove("fa-eye-slash");
        showHideButton.classList.add("fa-eye");
    } else {
        password.type = "password";
        showHideButton.classList.remove("fa-eye");
        showHideButton.classList.add("fa-eye-slash");
    }
}

//trigger validation for sign up
async function validateSignup(event){
    event.preventDefault();
    const form = document.getElementById("signupForm");
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value,key)=>{
        jsonData[key] = value;
    });

    fetch('/M00934333/validate-signup', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === "Username already taken"){
            Swal.fire({
                title: "Username already taken!",
                text:"Choose another username",
                icon:"error", 
                showCloseButton: true
            })
            form.reset();
        } else if (data.message === "Error List"){
            Swal.fire({
                title: "Sign up Failed",
                html:data.data,
                icon:"error", 
                showCloseButton: true
            })
            form.reset();
        } else {
            Swal.fire({
                title: "Sign Up Successfully",
                text:"You've successfully created an account!",
                icon:"success", 
                showCloseButton: true,
                willClose:function(){
                    loadLoginPage();
                    window.location.hash = "#/login";
                }
            })
            form.reset();
        }
    })
    .catch(error => {
        console.log('Error',error);
        Swal.fire({
            title:'Oops...',
            text:'Something went wrong!',
            icon:'error',
            showCloseButton:true
        });
        form.reset();
    });
}

//trigger validation for login
async function validateLogin(event){
    event.preventDefault();
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    fetch('/M00934333/validate-login', {
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User found"){
            const username = data.data;
            // console.log("here as well");
            Swal.fire({
                title: "Authentication Successful",
                text:"You've successfully logged in",
                icon:"success", 
                showCloseButton: true,
                willClose: function(){
                    loadHomePage();
                    const statusText = document.getElementById("statusText");
                    statusText.innerHTML = `Username:<span id="sessionUsername">${username}</span><br>Status:Logged In`; 
                    
                    const signupButton = document.querySelector(".go_to_signup_page");
                    signupButton.style.display = "none";

                    const loginButton = document.querySelector(".go_to_login_page");
                    loginButton.style.display = "none";

                    const userProfileButton = document.querySelector(".user_profile_button");
                    const settingsButton = document.querySelector(".settings_button");
                    settingsButton.style.left = "17em";
                    userProfileButton.style.left = "27em";
                }
            })
            form.reset();
            window.location.hash = ""; 
            
        } else {
            Swal.fire({
                title: "Authentication Failed",
                text:"Invalid Credentials!",
                icon:"error", 
                showCloseButton: true
            })
            form.reset();
        }
    })
    .catch(error => {
        console.log('Error',error);
        Swal.fire({
            title:'Oops...',
            text:'Something went wrong!',
            icon:'error',
            showCloseButton:true
        });
        form.reset();
    });
}

//logout function 
async function logOut(){

    fetch('/M00934333/logout', {
        method:'GET',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Log Out Successful"){
            Swal.fire({
                title: "Log out Successful",
                text:"You've successfully logged out",
                icon:"success", 
                showCloseButton: true,
                willClose: function(){
                    ClickSettingsButton();
                    loadHomePage();
                    // const statusText = document.getElementById("statusText");
                    // statusText.innerHTML = "Status:Logged Out";
                }
            })
        } else {
            Swal.fire({
                title: "Invalid Operation",
                text:"You're already logged out!",
                icon:"error", 
                showCloseButton: true,
            })
        }
    })
}

//creating a post and posting the details to server to store them
async function createPost(){
    const username = document.getElementById("sessionUsername").innerText;
    const postText = document.getElementById("post_text").value;
    const mediaUploaded = document.getElementById("mediaUpload").files[0];

    if (postText === ""){
        Swal.fire({
            title: "Blank Post",
            text:"Post cannot be empty",
            icon:"error", 
            showCloseButton: true
        });
    } else {
        const formData = new FormData();
        formData.append('user',username);
        formData.append('text',postText);
        formData.append('mediaUpload',mediaUploaded);

        fetch('/M00934333/create-post',{
            method:'POST',
            body:formData,
            credentials: "include",
        })
        .then(response => response.json())
        .then(data =>{
            if(data.message === "Post Created Successfully"){
                //if there is a media file
                Swal.fire({
                    title: "Post Created",
                    text:"Post has been created successfully!",
                    icon:"success", 
                    showCloseButton: true
                });
                document.getElementById("post_text").value = "";
                document.getElementById("mediaUpload").value = "";
                closePostBox();
            } else {
                Swal.fire({
                    title: "Cannot Post",
                    text:"You need to login to post!",
                    icon:"error", 
                    showCloseButton: true
                });
                document.getElementById("post_text").value = "";
                document.getElementById("mediaUpload").value = "";
                closePostBox();
            }
        })
    }
}

//check media type
function checkIfImage(url){
    const imageExtensions = ['.jpg','.png','.jpeg','.gif'];
    const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(extension);
}

function checkIfVideo(url){
    const videoExtensions = ['.mp4','.webm','.avi'];
    const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(extension);
}
//load the posts created
async function loadPosts(){
    let postArea = document.querySelector(".post_area");
    fetch('/M00934333/get-all-posts',{
        method:'GET',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data =>{
        const postsArray = data.data;
        console.log("postarray:",postsArray);
        for (let i =0; i<postsArray.length; i++){
            mediaURL = postsArray[i].media;
            username = postsArray[i].user;
            text = postsArray[i].text;
            console.log("here1");
            if(checkIfImage(mediaURL) == true){
                console.log("image");
                postArea.innerHTML+=`<div class="post">
                    <!--Post related buttons-->
                    <div class="user_info d-flex flex-row align-items-center">
                        <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                        <span style="position: relative; left: 1.5em;">${username}</span>
                        <button type="button" class="btn follow_button">Follow</button>
                        <button type="button" class="btn options_button">⋮</button>
                    </div>
                    
                    <!--Post Contents-->
                    <div class="post_content d-flex flex-column">
                        <span><h5>${text}</h5></span>
                        <img src="${mediaURL}" alt="dan_heng_build" class="img-fluid rounded" >
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
                </div>`;
            } else if (checkIfVideo(mediaURL) == true){
                console.log("video");
                postArea.innerHTML += `<div class="post">
                        <!--Post related buttons-->
                        <div class="user_info d-flex flex-row align-items-center">
                            <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                            <span style="position: relative; left: 1.5em;">${username}</span>
                            <button type="button" class="btn follow_button">Follow</button>
                            <button type="button" class="btn options_button">⋮</button>
                        </div>
                        
                        <!--Post Contents-->
                        <div class="post_content d-flex flex-column">
                            <span><h5>${text}</h5></span>
                            <video class="img-fluid" controls>
                                <source src="${mediaURL}" type="video/mp4">
                            </video>
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
                    </div>`;
            }
        }
    }) 
}





