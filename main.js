//intro skip
document.querySelector("#page-content-wrapper").addEventListener("click", ()=>{
    if(document.querySelector("#page-content-wrapper.Intro")){
        document.querySelectorAll(".text-line").forEach(item => {
            item.classList.add("finished");
        })
    }
})
//settings and nav
const burgerMenu = document.querySelector(".burger-wrapper");
burgerMenu.addEventListener("click", ()=>{//opens and closes menu on clicking burger icon
    burgerMenu.classList.toggle("arrow");
    const menu = document.querySelector("#menu-wrapper");
    if(burgerMenu.classList.contains("arrow")){
        menu.classList.remove("hidden");
        setTimeout(() => {
            menu.classList.add("active")
        }, 50);
    }
    else {
        menu.classList.remove("active");
        setTimeout(() => {
            menu.classList.add("hidden");
        }, 500);
    }
});
//navigation
let currentPage = "Intro";

function handleNav(nextPage){
    const navData = ["Intro", "Portfolio", "Skills", "Contact"];
    const currentPageIndex = navData.indexOf(currentPage);
    const nextPageIndex = navData.indexOf(nextPage);
    if(currentPageIndex === nextPageIndex || nextPageIndex < 0){
        return;
    }
    const navRight = document.querySelector(".nav-right");
    const navLeft =  document.querySelector(".nav-left");
    const pageElem = document.querySelector("#page-content-wrapper");
    const breadcrumbWrapper = document.querySelector(".wrapper-top");
    
    if(currentPageIndex < nextPageIndex){
        navRight.classList.add("exit");
        setTimeout(() => {
            breadcrumbWrapper.classList.add("exit");
            pageElem.classList.add("exit-left");
        }, 800);
    }
    else if(currentPageIndex > nextPageIndex){
        navLeft.classList.add("exit");
        setTimeout(() => {
            breadcrumbWrapper.classList.add("exit");
            pageElem.classList.add("exit-right");
        }, 800);
    }
    document.querySelectorAll(`.setting-nav-item.nav`).forEach(i =>{//changes active element navigation menu
        if(i.dataset.nav === nextPage){
            i.classList.add("active");
        }
        else i.classList.remove("active");
    });
    // setting burger / breadcrumb 
    setTimeout(() => {
        pageElem.classList = nextPage;
        breadcrumbWrapper.classList.remove("exit");
        document.querySelectorAll(`.breadcrumbs_item`).forEach(i =>{
            if(i.dataset.nav === nextPage){
                i.classList.add("active");
            }
            else i.classList.remove("active");
        });
            if(nextPageIndex === 0){
                document.querySelectorAll(".text-line").forEach(i => i.classList.remove("finished"));
                navRight.classList.remove("exit", "hidden");
                navRight.querySelector(".nav-name").textContent = navData[1];
                navRight.dataset.nav = navData[1];
                navLeft.classList.add("hidden");
            }
            if(nextPageIndex === 1){
                navRight.classList.remove("exit", "hidden");
                navRight.querySelector(".nav-name").textContent = navData[2];
                navRight.dataset.nav = navData[2];
                navLeft.classList.remove("exit", "hidden");
                navLeft.querySelector(".nav-name").textContent = navData[0];
                navLeft.dataset.nav = navData[0];
            }
            if(nextPageIndex === 2){
                navRight.classList.add("hidden");
                navLeft.classList.remove("exit", "hidden");
                navLeft.querySelector(".nav-name").textContent = navData[1];
                navLeft.dataset.nav = navData[1];
            }
            currentPage = nextPage;
    }, 1400);
}
// mobile
// swipe
let touchstart, touchMoved
const throttledTouchMoveHandler = throttle(handleSwipe, 50);
function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      }
    };
  }
function handleSwipe(touchEvent){
    if(touchEvent.touches[0].clientY - touchstart.touches[0].clientY > 20 || touchEvent.touches[0].clientY - touchstart.touches[0].clientY < -20){
        return;
    }
    if(touchEvent.touches[0].clientX - touchstart.touches[0].clientX > 70){
        handleNav(document.querySelector(".nav-left").dataset.nav);
    }
    if(touchEvent.touches[0].clientX - touchstart.touches[0].clientX < -70){
        handleNav(document.querySelector(".nav-right").dataset.nav);
    }
}
document.querySelector("#full-page-wrapper").addEventListener("touchstart", (e)=>{
    const clientWidth = window.innerWidth;
    const startX = e.touches[0].clientX;
    if(startX > clientWidth * 0.1 && startX < clientWidth * 0.9){
        touchstart = e;
    }
});
document.querySelector("#full-page-wrapper").addEventListener("touchmove", (e)=>{
    if(!touchstart){
        return;
    }
    throttledTouchMoveHandler(e)
});
document.querySelector("#full-page-wrapper").addEventListener("touchend", (e)=>{
    touchstart, touchMoved = false;
});
// portfolio mobile
document.querySelectorAll(".portfolio-item").forEach(i=>{
    i.querySelector(".pulldown-mobile").addEventListener("click", ()=>{
        i.classList.toggle("active");
    })
})
//nav menu
const menuNavivator = document.querySelectorAll(".setting-nav-item.nav");
menuNavivator.forEach(elem =>{//allows menu navigation
    elem.addEventListener("click", (e)=>{
        if(elem.classList.contains("active")){
            return burgerMenu.click(); 
        }
        document.querySelector(".burger-wrapper").click();
        setTimeout(() => {
            handleNav(e.target.dataset.nav);
        }, 500);
    })
})

//intro nav to portfolio
function handleIntro(){//skip typing on click
    document.querySelector(".portfolio-nav").addEventListener("click", ()=>{
        handleNav("Portfolio");
    })//allow navigation for portfolio letter
    const navigator =  document.querySelectorAll(".nav-icon-wrapper");
    navigator.forEach(element => {//allows slider navigation
        element.addEventListener("click", ()=>{
            handleNav(element.dataset.nav);
        })
    });
}
//breadcrumbs nav
function handleBreadCrumbNav(){
    document.querySelectorAll(".breadcrumbs_item").forEach(i=>{
        i.addEventListener("click", ()=>{
            handleNav(i.dataset.nav)
        })
    })
}
//portolio tag handler

function filterTags(activeTags){
    projectList = document.querySelectorAll(".portfolio-item");
    for(let project = 0; project < projectList.length; project++){
        let matched = true;
        for(let tag = 0; tag < activeTags.length; tag++){
            if(!projectList[project].querySelector(`[data-tag="${activeTags[tag]}"]`)){
                matched = false;
                break;
            }
        }
        if(!matched){
            projectList[project].classList.add("hidden");
        }
        else projectList[project].classList.remove("hidden");
    }
    
}
function handleAttribute(){
    document.querySelectorAll(".portfolio-tags-container .tag").forEach(tag => {
        tag.addEventListener("click", (item)=>{
            let tags = [];
            console.log("click")
            if(item.target.dataset.tag === "all"){
                if(item.target.classList.contains("active")){
                    return;
                }
                else {
                    document.querySelectorAll(".portfolio-tags-container .tag").forEach(i => {
                        i.classList.remove("active");
                    });
                }
            }
            else {
                document.querySelector("#all-tag").classList.remove("active");
            }
            item.target.classList.toggle("active");
            document.querySelectorAll(".portfolio-tags-container .tag.active").forEach(i => {
                tags.push(i.dataset.tag);
            })
            filterTags(tags);
        })
    })

}

// skills
function handleSkills(){
    document.querySelectorAll(".skill-item").forEach(i=>{
        const bar = i.querySelector(".skill-bar");
        bar.style.width = i.querySelector(".skill-bar").dataset.fill + "%";
    })
};
//copy paste
function handleContactCopy(){
    // navigator.permissions.query({
    //     name:'clipboard-write'
    //   })
    //   .then((permissionObj) => {
    //     console.log(permissionObj);
    //     // ... check the permission object ...
    //   })
    //   .catch((error) => {
    //     // couldn't query the permission
    //     console.error(error);
    //   });
    // if ( navigator.permissions && navigator.permissions.query ){
    //     console.log("has permission")
    //         navigator.permissions.query({ name: "write-on-clipboard" }).then((result) => {
    //             console.log("copyable?");
    //             if(result.state == "granted" || result.state == "prompt"){
    //                 const link = document.querySelector(".c");
    //                 link.style.cursor = pointer;
    //                 link.addEventListener("click", ()=>{
    //                     navigator.clipboard.writeText(link.textContent);
    //               })
    //             } 
    //           });
    // }
}
window.addEventListener("DOMContentLoaded", ()=>{
    handleIntro();
    handleSkills();
    handleContactCopy();
    handleAttribute();
    handleBreadCrumbNav();
})


