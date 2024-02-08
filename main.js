document.addEventListener("DOMContentLoaded",()=>{
    goTo(window.location.hash);
});

window.addEventListener("hashchange",()=>{
    goTo(window.location.hash);
})

function goTo(hash){
    switch (hash){
        
        case "M00934333/signup":
            loadSignUpPage();
            break;

        case "M00934333/login":
            loadLoginPage();
            break;

        default:
            loadHomePage();
            break;
    }
}