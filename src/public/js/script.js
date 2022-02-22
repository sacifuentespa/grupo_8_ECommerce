window.addEventListener("load", () => {
  //add animation header
  if (document.querySelector(".iconNav")) {
    let avatarUser = document.querySelector(".iconNav img");
    let iconDropdown = document.querySelector(".iconNav i");
    let navUser = document.querySelector("#navUser");
    let navDropdown = document.querySelector("#navProducts");

    avatarUser.addEventListener("click", () => {
      navUser.classList.toggle("visibleHeader");
      if (navDropdown.classList.contains("visibleHeader")) {
        navDropdown.classList.remove("visibleHeader");
      }
    });

    iconDropdown.addEventListener("click", () => {
      navDropdown.classList.toggle("visibleHeader");

      if (navUser.classList.contains("visibleHeader")) {
        navUser.classList.remove("visibleHeader");
      }
    });
  }

  //add animation footer
  if (document.querySelector(".btnMoreInfo")) {
    let footerContent = document.querySelector(".footerContent");
    let btnFooter = document.querySelector(".btnMoreInfo");

    btnFooter.addEventListener("click", () => {
      footerContent.classList.toggle("visibleFooter");
      let arrowFooter = document.querySelector(".btnMoreInfo i");
      arrowFooter.style.transition = "all 0.5s";

      if (footerContent.classList.contains("visibleFooter")) {
        arrowFooter.style.transform = "rotate(180deg)";
      } else {
        arrowFooter.style.transform = "rotate(0deg)";
      }
    });
  }

  //add animation productDetails
  if (document.querySelector(".detailsProduct article")) {
    let textDetailsProduct = document.querySelectorAll(".detailsProduct p");
    let detailsProductArrow = document.querySelectorAll(".detailsProduct i");
    let contentProduct = document.querySelectorAll(".detailsProduct article");

    detailsProductArrow.forEach((arrow, i) => {
      arrow.addEventListener("click", () => {
        textDetailsProduct[i].classList.toggle("visibleText");

        if (textDetailsProduct[i].classList.contains("visibleText")) {
          contentProduct[i + 1].style.background = "rgb(236, 236, 236)";
          arrow.style.transform = "rotate(180deg)";
        } else {
          contentProduct[i + 1].style.background = "white";
          arrow.style.transform = "rotate(0deg)";
        }
      });
    });

    let imagesProduct = document.querySelectorAll(".imagesList img");
    let imagePrincipal = document.querySelector(".medSection img");

    imagesProduct.forEach((image) => {
      image.addEventListener("click", () => {
        let srcImage = image.getAttribute("src");
        imagePrincipal.setAttribute("src", srcImage);
      });
    });
  }

  //add animation login
  if (document.querySelector(".mainLogin label input")) {
    let inputLogin = document.querySelectorAll(".inputForm label input");

    inputLogin.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentNode.classList.add("focus");
        input.previousElementSibling.classList.add("top");
      });

      input.addEventListener("blur", () => {
        input.value = input.value.trim();
        if (input.value.trim().length == 0) {
          input.previousElementSibling.classList.remove("top");
        }
        input.parentNode.classList.remove("focus");
      });
    });

    //validation register
    if (document.querySelector(".mainLogin .formRegister")) {
      let form = document.querySelector(".mainLogin .formRegister");
      let inputsRegister = document.querySelectorAll(".formRegister input");
      // let [name, lastname, email, password, confirmPassword, avatar, checkbox] = [...inputs]

      form.addEventListener("submit", (event) => {
        let errors = [];
        inputsRegister.forEach((input, index) => {
          switch (input.getAttribute("name")) {
            case "name":
              if (input.value.length > 0) {
                if (input.value.length < 2)
                  errors.push("El nombre debe tener al menos dos caracteres");
              } else {
                errors.push("El campo nombre no puede estar vacio");
              }
              break;

            case "lastName":
              if (input.value.length > 0) {
                if (input.value.length < 2)
                  errors.push("El apellido debe tener al menos dos caracteres");
              } else {
                errors.push("El campo apellido no puede estar vacio");
              }
              break;

            case "email":
              if (input.value.length > 0) {
                if (!(/@/.test(input.value))) {
                  errors.push("El correo electronico no es valido");
                }
              } else {
                errors.push("El campo correo electronico no puede estar vacio");
              }
              break;

            case "password":
              let reg = /[A-Z]+[a-z]+[0-9]/
              if (input.value.length > 0) {
                if(!(input.value.length >= 8 && reg.test(input.value))){
                  errors.push("La contraseña debe contener al menos 8 caracteres, una mayuscula y un numero");
                }
              } else {
                errors.push("El campo contraseña no puede estar vacio");
              }
              break;
            
            case "confirmPassword":
              if (input.value.length > 0) {
                if(!(input.value == inputsRegister[index-1].value)){
                  errors.push("La contraseña no coicide con la confirmación");
                }
              } else {
                errors.push("El campo confirmar contraseña no puede estar vacio");
              }
              break;
          
            case "terminos":
              if(!input.checked){
                errors.push("Debe estar de acuerdo con terminos y condiciones");
              }
              break;
          }
        });
        if(errors.length > 0){
          console.log(errors)
          event.preventDefault();
          let errorsFront = document.querySelector(".mainLogin .errorsFront")
          errorsFront.innerHTML = ""
          errors.forEach(err => {
            errorsFront.innerHTML += "<p>"+err+"</p>"
          });
        }
      });
    }
  }
});
