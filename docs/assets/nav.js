menuOpen = false;

function openMenu(){
    if(menuOpen) return;
    menuOpen = true;
    document.querySelector("#title").style.display = "none";
    document.querySelector("#title").disabled = true;
    keyframer.createCSSTransition("header", "all 0.5s ease-in-out", {
        background: "#242a30",
        borderRadius: "0"
    }, ()=>{
        keyframer.createCSSTransition("#nav", "all 1s ease-in-out", {
            height: "300px",
            opacity: "1"
        });
    }); 
    setTimeout(()=>{
        document.querySelector("#closeNav").disabled = false;
        document.querySelector("#nav").style.overflow = "auto";
    }, 1000) 
};

function closeMenu(){
    menuOpen = false;
    document.querySelector("#closeNav").disabled = true;
    keyframer.createCSSTransition("header", "all 0.5s ease-in-out", {
        background: "white",
        borderRadius: "50px"
    }, ()=>{
        keyframer.createCSSTransition("#nav", "all 1s ease-in-out", {
            height: "0px",
            opacity: "0",
            overflow: "hidden"
        });
    });
    setTimeout(()=>{
        document.querySelector("#title").style.display = "block";
        document.querySelector("#title").disabled = true;
    }, 1000);
}

document.querySelector("#title").onclick = openMenu;
document.querySelector("#closeNav").onclick = closeMenu;
