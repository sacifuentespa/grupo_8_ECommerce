window.addEventListener("load", () => {
    let footerContent = document.querySelector(".footerContent")
    let btnFooter = document.querySelector(".btnMoreInfo")
    let avatarUser = document.querySelector(".iconNav img")
    let iconDropdown = document.querySelector(".iconNav i")

    //add animation header
    let navUser = document.querySelector("#navUser")
    let navDropdown = document.querySelector("#navProducts")
    avatarUser.addEventListener("click", () => {
        navUser.classList.toggle("visibleHeader")
        if(navDropdown.classList.contains("visibleHeader")){
            navDropdown.classList.remove("visibleHeader")
        }
    })
    iconDropdown.addEventListener("click", () => {
        navDropdown.classList.toggle("visibleHeader")

        if(navUser.classList.contains("visibleHeader")){
            navUser.classList.remove("visibleHeader")
        }
    })
    
    //add animation footer
    btnFooter.addEventListener("click", () => {
        footerContent.classList.toggle("visibleFooter")
        let arrowFooter = document.querySelector(".btnMoreInfo i")
        arrowFooter.style.transition = "all 0.5s"

        console.log(arrowFooter)

        if(footerContent.classList.contains("visibleFooter")){
            arrowFooter.style.transform = "rotate(180deg)"
        }else{
            arrowFooter.style.transform = "rotate(0deg)"
        }
    })
})