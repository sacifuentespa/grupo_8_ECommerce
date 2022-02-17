window.addEventListener("load", () => {
    //add animation header
    if(document.querySelector(".iconNav")){
        let avatarUser = document.querySelector(".iconNav img")
        let iconDropdown = document.querySelector(".iconNav i")
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
    }
    
    //add animation footer
    let footerContent = document.querySelector(".footerContent")
    let btnFooter = document.querySelector(".btnMoreInfo")

    btnFooter.addEventListener("click", () => {
        footerContent.classList.toggle("visibleFooter")
        let arrowFooter = document.querySelector(".btnMoreInfo i")
        arrowFooter.style.transition = "all 0.5s"

        if(footerContent.classList.contains("visibleFooter")){
            arrowFooter.style.transform = "rotate(180deg)"
        }else{
            arrowFooter.style.transform = "rotate(0deg)"
        }
    })

    //ad animation productDetails
    let textDetailsProduct = document.querySelectorAll(".detailsProduct p")
    let detailsProductArrow = document.querySelectorAll(".detailsProduct i")
    let contentProduct = document.querySelectorAll(".detailsProduct article")

    detailsProductArrow.forEach((arrow, i) => {
        arrow.addEventListener("click", () => {
            textDetailsProduct[i].classList.toggle("visibleText")
    
            if(textDetailsProduct[i].classList.contains("visibleText")){
                contentProduct[i+1].style.background = "rgb(236, 236, 236)"
                arrow.style.transform = "rotate(180deg)"
            }else{
                contentProduct[i+1].style.background = "white"
                arrow.style.transform = "rotate(0deg)"
            }
        })
    });
    
    let imagesProduct = document.querySelectorAll(".imagesList img")
    let imagePrincipal = document.querySelector(".medSection img")

    imagesProduct.forEach(image => {
        image.addEventListener("click", () => {
            let srcImage = image.getAttribute("src")
            imagePrincipal.setAttribute("src", srcImage)
        })
    });
})