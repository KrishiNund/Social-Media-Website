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
    getUserStatus();
    loadExplorePosts();
    loadFollowing(); 
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
                            <img src="images/logo.png" class="img-fluid" alt="Logo">
                            <span class="navbar-text" style="color: #B8BBD6;">Trailblazers' Hangout</span>
                        </a>
                    </div>

                    <div class="d-flex flex-column flex-grow-1">
                        <!--Search Bar-->
                        <div class="form search_bar">
                            <i class="fa fa-search" onclick="searchUser()"></i>
                            <input id="search" name="search" type="text" class="form-control form-input" placeholder="Search Anything...">
                        </div>

                        <div class="results_box">

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
                                <li>
                                    <span id="statusText" class="dropdown-item-text">
                                        <span id="sessionUsername"></span>
                                        <span id="userStatus"></span>
                                        <button type="button" class="btn" onclick="openFollowingList()">Following</button>
                                    </span>
                                </li>
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
    //loading the feed
    const TopContent = `<div class="container-fluid d-flex flex-row align-items-center justify-content-between">
        <!--Main Content-->
        <div>
            <!--Feed menu showcasing the different kinds of feed-->
            <div class="feed_options d-flex flex-row align-items-center justify-content-around rounded fixed-top">
                <button type="button" class="btn" style="text-decoration:underline;" id="explorePostsButton" onclick="showExplorePosts()">Explore</button>|
                <button type="button" class="btn" id="followingPostsButton"  onclick="showFollowingPosts()">Following</button>
            </div>

            <!--Posts Sections-->
            <div class="post_area">
                

            </div>
        </div>`;

    //loading the side bar elements and widgets
    const sideContent = `<!--Right sidebar-->
            <div class="d-flex flex-column position-fixed sidebar">
        
                <!--Trending Hashtags Widget-->
                <div class="trending_hashtags text-center">
                    <div class="widget_header"><h4>Trending</h4></div>
                    <span>#PenaconyUpdate</span>
                    <span>#Version2.0</span>
                    <span>#Firefly</span>
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
    
    //loading pop up elements
    const popupContent = `<!--Settings Pop Up-->
        <div class="container settings_box mx-auto text-center">
        
            <div class="settings_header">
                <h2>Settings Box</h2>   
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
                    Add
                    <i class="fa fa-photo-film"></i>
                    :
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
                
            </div>

            <div class="d-flex flex-row">
                <textarea id="comment_text" placeholder="Write something here..."></textarea>
                <button class="btn postCommentButton" value="" onclick="addComment()">
                    <i class="fa fa-paper-plane fa-2x" style="position:relative; right:0.3em"></i>
                </button>
            </div>

        </div>
        
        <!--Following List-->
        <div id="following_list" class="following_list">

            <div class="following_list_header d-flex flex-row">
                <h2 class="mt-2">Following List</h2>
                <i class="fa fa-times-circle-o fa-2x" onclick="closeFollowingList()"></i>
            </div>

            <div class="following_list_box d-flex flex-column mx-auto mt-2 rounded">

                

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

//get user status from session
function getUserStatus(){
    fetch('/M00934333/get-status', {
        method:'GET',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const status = data.message;
        const username = data.data;
        
        const sessionUsername = document.getElementById("sessionUsername");
        const userStatus = document.getElementById("userStatus");

        sessionUsername.innerHTML = `Username: ${username}`;
        userStatus.innerHTML =`Status:${status}`;  
    }); 
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

  loadExplorePosts();
}

//switch highlight to following button on feed
function showFollowingPosts() {
  exploreButton = document.getElementById("explorePostsButton");
  exploreButton.style.textDecoration = "none";

  followingPostsButton = document.getElementById("followingPostsButton");
  followingPostsButton.style.textDecoration = "underline";

  loadFollowingPosts();
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

function openFollowingList(){
    following_list = document.getElementById("following_list");
    following_list.style.display = "block";
}

function closeFollowingList(){
    following_list = document.getElementById("following_list");
    if (following_list.style.display == "block") {
        following_list.style.display = "none";
    }
}

/*if show is pressed, show actual password else if hide is pressed, hide password
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
function validateSignup(event){
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
function validateLogin(event){
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
                    window.location.reload();
                    loadHomePage();
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
function logOut(){

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
                    window.location.reload();
                    loadHomePage();
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
function createPost(){
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
    try{
        const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(extension); 
    } catch (error){
        return false;
    } 
}

function checkIfVideo(url){
    const videoExtensions = ['.mp4','.webm','.avi'];
    try{
        const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
        return videoExtensions.includes(extension);
    } catch(error){
        return false;
    }
    
}

//load the posts created
function loadExplorePosts(){
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
        //clear post area first
        postArea.innerHTML = "";
        for (let i =0; i<postsArray.length; i++){
            mediaURL = postsArray[i].media;
            username = postsArray[i].user;
            text = postsArray[i].text;
            postID = postsArray[i]._id;
            likes = postsArray[i].likes;
            dislikes = postsArray[i].dislikes;
            //console.log(postID);
            
            if(checkIfImage(mediaURL) == true){
                // console.log("image");
                postArea.innerHTML+=`<div class="post">
                    <!--Post related buttons-->
                    <div class="user_info d-flex flex-row align-items-center">
                        <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                        <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                        <button type="button" class="btn follow_button" value="${username}">Follow</button>
                        <button type="button" class="btn options_button">⋮</button>
                    </div>
                    
                    <!--Post Contents-->
                    <div class="post_content d-flex flex-column">
                        <span style="font-size:20px">${text}</span>
                        <img src="${mediaURL}" alt="post_image" class="img-fluid rounded" >
                    </div>
        
                    <hr>

                    <!--Adding engagement buttons: like, dislike, comment-->
                    <div class="d-flex flex-row engagement_buttons">
                        
                        <button class="likeButton btn" type="button" value="${postID}">
                            <span>${likes}</span>
                            <i class="fa fa-heart-o" style="color:red"></i> 
                        </button>
                        
                        <button class="dislikeButton btn" type="button" value="${postID}">
                            <span>${dislikes}</span>
                            <i class="fa fa-thumbs-o-down"></i>
                        </button>

                        <button class="commentsButton btn" type="button" value="${postID}">
                            <i class="fa fa-comment-o"></i>
                        </button>
                    </div>
                </div>`;
            } else if (checkIfVideo(mediaURL) == true){
                // console.log("video");
                postArea.innerHTML += `<div class="post">
                        <!--Post related buttons-->
                        <div class="user_info d-flex flex-row align-items-center">
                            <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                            <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                            <button type="button" class="btn follow_button" value="${username}">Follow</button>
                            <button type="button" class="btn options_button">⋮</button>
                        </div>
                        
                        <!--Post Contents-->
                        <div class="post_content d-flex flex-column">
                            <span style="font-size:20px">${text}</span>
                            <video class="img-fluid" controls>
                                <source src="${mediaURL}" type="video/mp4">
                            </video>
                        </div>
            
                        <hr>

                        <!--Adding engagement buttons: like, dislike, comment-->
                        <div class="d-flex flex-row engagement_buttons">
                            <button class="likeButton btn" type="button" value="${postID}">
                                <span>${likes}</span>
                                <i class="fa fa-heart-o"></i> 
                            </button>
                        

                            <button class="dislikeButton btn" type="button" value="${postID}">
                                <span>${dislikes}</span>
                                <i class="fa fa-thumbs-o-down"></i>
                            </button>

                            <button class="commentsButton btn" type="button" value="${postID}">
                                <i class="fa fa-comment-o"></i>
                            </button>
                        </div>
                    </div>`;
            } else {
                postArea.innerHTML += `<div class="post">
                        <!--Post related buttons-->
                        <div class="user_info d-flex flex-row align-items-center">
                            <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                            <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                            <button type="button" class="btn follow_button" value="${username}">Follow</button>
                            <button type="button" class="btn options_button">⋮</button>
                        </div>
                        
                        <!--Post Contents-->
                        <div class="post_content d-flex flex-column">
                            <span style="font-size:20px">${text}</span>
                        </div>
            
                        <hr>

                        <!--Adding engagement buttons: like, dislike, comment-->
                        <div class="d-flex flex-row engagement_buttons">
                            <button class="likeButton btn" type="button" value="${postID}">
                                <span>${likes}</span>
                                <i class="fa fa-heart-o"></i> 
                            </button>
                        

                            <button class="dislikeButton btn" type="button" value="${postID}">
                                <span>${dislikes}</span>
                                <i class="fa fa-thumbs-o-down"></i>
                            </button>

                            <button class="commentsButton btn" type="button" value="${postID}">
                                <i class="fa fa-comment-o"></i>
                            </button>
                        </div>
                    </div>`;
            }
        }
    }) 
}

//load posts from following users
function loadFollowingPosts() {
    let postArea = document.querySelector(".post_area");
    fetch('/M00934333/get-following-posts',{
        method:'GET',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data =>{
        const followingPostsArray = data.data;
        //clear post area first
        postArea.innerHTML = "";
        for (let i =0; i<followingPostsArray.length; i++){
            mediaURL = followingPostsArray[i].media;
            username = followingPostsArray[i].user;
            text = followingPostsArray[i].text;
            postID = followingPostsArray[i]._id;
            likes = followingPostsArray[i].likes;
            dislikes = followingPostsArray[i].dislikes;
            // console.log("here1");
            if(checkIfImage(mediaURL) == true){
                // console.log("image");
                postArea.innerHTML+=`<div class="post">
                    <!--Post related buttons-->
                    <div class="user_info d-flex flex-row align-items-center">
                        <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                        <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                        <button type="button" class="btn follow_button" value="${username}">Follow</button>
                        <button type="button" class="btn options_button">⋮</button>
                    </div>
                    
                    <!--Post Contents-->
                    <div class="post_content d-flex flex-column">
                        <span style="font-size:20px">${text}</span>
                        <img src="${mediaURL}" alt="dan_heng_build" class="img-fluid rounded" >
                    </div>
        
                    <hr>

                    <!--Adding engagement buttons: like, dislike, comment-->
                    <div class="d-flex flex-row engagement_buttons">
                        <button class="likeButton btn" type="button" value="${postID}">
                            <span>${likes}</span>
                            <i class="fa fa-heart-o"></i> 
                        </button>
                    

                        <button class="dislikeButton btn" type="button" value="${postID}">
                            <span>${dislikes}</span>
                            <i class="fa fa-thumbs-o-down"></i>
                        </button>

                        <button class="commentsButton btn" type="button" value="${postID}">
                            <i class="fa fa-comment-o"></i>
                        </button>
                    </div>
                </div>`;
            } else if (checkIfVideo(mediaURL) == true){
                // console.log("video");
                postArea.innerHTML += `<div class="post">
                        <!--Post related buttons-->
                        <div class="user_info d-flex flex-row align-items-center">
                            <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                            <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                            <button type="button" class="btn follow_button" value="${username}">Follow</button>
                            <button type="button" class="btn options_button">⋮</button>
                        </div>
                        
                        <!--Post Contents-->
                        <div class="post_content d-flex flex-column">
                            <span style="font-size:20px">${text}</span>
                            <video class="img-fluid" controls>
                                <source src="${mediaURL}" type="video/mp4">
                            </video>
                        </div>
            
                        <hr>

                        <!--Adding engagement buttons: like, dislike, comment-->
                        <div class="d-flex flex-row engagement_buttons">
                            <button class="likeButton btn" type="button" value="${postID}">
                                <span>${likes}</span>
                                <i class="fa fa-heart-o"></i> 
                            </button>
                        

                            <button class="dislikeButton btn" type="button" value="${postID}">
                                <span>${dislikes}</span>
                                <i class="fa fa-thumbs-o-down"></i>
                            </button>

                            <button class="commentsButton btn" type="button" value="${postID}">
                                <i class="fa fa-comment-o"></i>
                            </button>
                        </div>
                    </div>`;
            } else {
                postArea.innerHTML += `<div class="post">
                        <!--Post related buttons-->
                        <div class="user_info d-flex flex-row align-items-center">
                            <img src="images/icons8-user-profile-48.png" class="user_profile img-fluid" alt="user profile">
                            <span class="username" style="position: relative; left: 1.5em;">${username}</span>
                            <button type="button" class="btn follow_button" value="${username}">Follow</button>
                            <button type="button" class="btn options_button">⋮</button>
                        </div>
                        
                        <!--Post Contents-->
                        <div class="post_content d-flex flex-column">
                            <span style="font-size:20px">${text}</span>
                        </div>
            
                        <hr>

                        <!--Adding engagement buttons: like, dislike, comment-->
                        <div class="d-flex flex-row engagement_buttons">
                            <button class="likeButton btn" type="button" value="${postID}">
                                <span>${likes}</span>
                                <i class="fa fa-heart-o"></i> 
                            </button>
                        

                            <button class="dislikeButton btn" type="button" value="${postID}">
                                <span>${dislikes}</span>
                                <i class="fa fa-thumbs-o-down"></i>
                            </button>

                            <button class="commentsButton btn" type="button" value="${postID}">
                                <i class="fa fa-comment-o"></i>
                            </button>
                        </div>
                    </div>`;
            }
        }
    })
}

//follow User when follow button is pressed
document.addEventListener('DOMContentLoaded', function() {
    let postArea = document.querySelector(".post_area");
    postArea.addEventListener('click', function(event) {
        if (event.target.classList.contains('follow_button')) {
            const username = event.target.value;
            // console.log(username);
            //uploads/1711549258421-doge.jpg
            fetch('/M00934333/follow-user', {
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === "Successfully followed user"){
                    Swal.fire({
                        title: "Followed Successfully",
                        text:"You've successfully followed this user",
                        icon:"success", 
                        showCloseButton: true,
                        willClose: function(){
                            window.location.reload();
                        }
                    });
                   
                } else {
                    Swal.fire({
                        title: "Oops, something went wrong!",
                        text:"Unable to follow user. Must be logged in and you cannot follow yourself.",
                        icon:"error", 
                        showCloseButton: true,
                        willClose: function(){
                            window.location.reload();
                        }

                    });
                }
            })
            .catch(error=>{
                console.error(error);
            })
        }
    });
});

//load the following users in the following list
function loadFollowing(){
    const followingListBox = document.querySelector(".following_list_box");
    fetch('/M00934333/get-following',{
        method:'GET',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data =>{
        try{
            const followingList = data.data;
            for (let i =0; i < followingList.length;i++){
                followingListBox.innerHTML += `
                    <div class="following_profile d-flex flex-row">
                        <i class="fa fa-user fa-2xl"></i>
                        <h5 id="following_user">${followingList[i].username}</h5>
                        <button class="btn unfollow_button" type="button" value="${followingList[i].username}">Unfollow</button>
                    </div>
    
                    <hr> `;
            }
        } catch(error){
            console.log(error);
        }
       
    })
}

//unfollow user
document.addEventListener('DOMContentLoaded', function() {
    let followingListBox = document.querySelector(".following_list_box");
    followingListBox.addEventListener('click', function(event) {
        if (event.target.classList.contains('unfollow_button')) {
            const username = event.target.value;
            // console.log(username);

            fetch('/M00934333/unfollow-user', {
                method:'POST',
                credentials:"include",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === "Successfully unfollowed user"){
                    Swal.fire({
                        title: "Unfollowed Successfully",
                        text:"You've successfully unfollowed this user",
                        icon:"success", 
                        showCloseButton: true,
                        willClose: function(){
                            window.location.reload();
                        }
                    });
                   
                } else {
                    Swal.fire({
                        title: "Oops, something went wrong!",
                        text:"Unable to unfollow user.",
                        icon:"error", 
                        showCloseButton: true,
                        willClose: function(){
                            window.location.reload();
                        }

                    });
                }
            })
            .catch(error=>{
                console.error(error);
            })
        }
    });
});

//search bar function - search user
function searchUser(){
    const usernameEntered = document.getElementById('search').value;
    const resultsBox = document.querySelector(".results_box");
    fetch('/M00934333/search-user', {
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username:usernameEntered})
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User found"){
            resultsBox.innerHTML = `<div class="d-flex flex-row align-items-center justify-content-around result">
                <i class="fa fa-user fa-xl"></i>
                <span>${usernameEntered}</span>
                <button id="followUserButton" class="btn" value="${usernameEntered}" onclick="followUser()">Follow</button>
            </div>`;
            resultsBox.style.display = "block";
        } else {
            Swal.fire({
                title: "Unsuccessful Search",
                text:"User was not found!",
                icon:"error", 
                showCloseButton: true,
                willClose: function(){
                    window.location.reload();
                }
            });

        }
    })
}

//follow user from search results
function followUser(){
    const user = document.getElementById("followUserButton").value;
    fetch('/M00934333/follow-user', {
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username:user})
    })
    .then(response => response.json())
    .then(data => {
        const resultsBox = document.querySelector(".results_box");
        if (data.message === "Successfully followed user"){
            Swal.fire({
                title: "Followed Successfully",
                text:"You've successfully followed this user",
                icon:"success", 
                showCloseButton: true,
                willClose: function(){
                    window.location.reload();
                    resultsBox.style.display = "none";
                }
            });
        } else {
            Swal.fire({
                title: "Oops, something went wrong!",
                text:"Unable to follow user. Must be logged in and you cannot follow yourself.",
                icon:"error", 
                showCloseButton: true,
                willClose: function(){
                    window.location.reload();
                    resultsBox.style.display = "none";
                }

            });
        }
    })
}

//load comments when comments box is opened
document.addEventListener('DOMContentLoaded', function() {
    //console.log("works");
    try{
        let postArea = document.querySelector(".post_area");
        let commentBox = document.querySelector(".comment_box");
        postArea.addEventListener('click', function(event) {
            if (event.target.classList.contains('commentsButton')) {
                showCommentBox();
                const postID = event.target.value;
                console.log(postID);

                const postCommentButton = document.querySelector(".postCommentButton");
                postCommentButton.value = postID;
                // console.log(postCommentButton.value);
            
                fetch('/M00934333/get-comments', {
                    method:'POST',
                    credentials:"include",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({postID:postID})
                })
                .then(response => response.json())
                .then(data => {
                    const commentsArray = data.data;
                    console.log(commentsArray);
                    commentBox.innerHTML = "";
                    for (i = 0; i<commentsArray.length; i++){
                        const user = commentsArray[i].user;
                        const text = commentsArray[i].text;
                        console.log(user,text);
                        commentBox.innerHTML += `
                        <div class="comment d-flex flex-column mt-2">
                            <div class="commenter_profile d-flex flex-row">
                                <img src="images/icons8-user-profile-48.png" alt="user_profile" class="img-fluid mb-2">
                                <p class="mt-2">${user}</p>
                            </div>
                    
                            <div class="comment_content">
                                <p>${text}</p>
                            </div>
                            <hr>
                        </div>`;
                    }
                })
            }
        });
    } catch(error){
        console.log(error);
    }
    
});

//create comment
function addComment(){
    const postID = document.querySelector(".postCommentButton").value;
    const text = document.getElementById("comment_text").value;

    console.log(postID);
    console.log(text);

    fetch('/M00934333/add-comment', {
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({postID:postID,text:text})
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Comment successfully created"){
            Swal.fire({
                title: "Comment Successfully Created",
                text:"You've successfully commented on this post!",
                icon:"success", 
                showCloseButton: true,
                willClose: function(){
                    window.location.reload();
                }
            });
        } else {
            Swal.fire({
                title: "Oops, something went wrong!",
                text:"Unable to comment on post! Must be logged in to be able to comment.",
                icon:"error", 
                showCloseButton: true,
                willClose: function(){
                    window.location.reload();
                }

            });
        }
    })

}

//like post
document.addEventListener('DOMContentLoaded', function() {
    try{
        let postArea = document.querySelector(".post_area");
        postArea.addEventListener('click', function(event) {
            if (event.target.classList.contains('likeButton')) {
                const likeButton = event.target;
                const likeIcon = likeButton.querySelector('i');
                const postID = event.target.value;
                // console.log(values);
                let likeCounter = 0;
                console.log(likeCounter,postID);
               
                if (likeIcon.classList.contains('fa-heart-o')){
                    likeCounter = 1;
                    likeIcon.classList.replace('fa-heart-o','fa-heart');
                }
            
                fetch('/M00934333/like-post', {
                    method:'POST',
                    credentials:"include",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({change:likeCounter, postID:postID})
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Successful"){
                        window.location.reload();
                    } else {
                        Swal.fire({
                            title: "Operation Unsuccessful",
                            text:"Unable to like post when not logged in!",
                            icon:"error", 
                            showCloseButton: true,
                            willClose: function(){
                                window.location.reload();
                            }
            
                        });
                    }
                })
                    
            }
        });
    } catch(error){
        console.log(error);
    }
    
});

//dislike post
document.addEventListener('DOMContentLoaded', function() {
    try{
        let postArea = document.querySelector(".post_area");
        postArea.addEventListener('click', function(event) {
            if (event.target.classList.contains('dislikeButton')) {
                const dislikeButton = event.target;
                const dislikeIcon = dislikeButton.querySelector('i');
                const postID = event.target.value;
                
                let dislikeCounter = 0;
                // console.log(dislikeCounter,postID);
               
                if (dislikeIcon.classList.contains('fa-thumbs-o-down')){
                    dislikeCounter = 1;
                    dislikeIcon.classList.replace('fa-thumbs-o-down','fa-thumbs-down');
                }
            
                fetch('/M00934333/dislike-post', {
                    method:'POST',
                    credentials:"include",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({change:dislikeCounter, postID:postID})
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Successful"){
                        window.location.reload();
                    } else {
                        Swal.fire({
                            title: "Operation Unsuccessful",
                            text:"Unable to dislike post when not logged in!",
                            icon:"error", 
                            showCloseButton: true,
                            willClose: function(){
                                window.location.reload();
                            }
            
                        });
                    }
                })
                    
            }
        });
    } catch(error){
        console.log(error);
    }
    
});


