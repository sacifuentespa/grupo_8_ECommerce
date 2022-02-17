//evitamos el envío de datos al backend, con el fin de validarlos y luego sí enviarlos
let form = document.querySelector(".formProductUpload");

form.onsubmit = async (e) => {
    e.preventDefault();
    

    let productName = document.querySelector("input[name=productName]").value;
    if(!productName  || productName.length < 5){
        showError("El nombre es requerido y debe tener mínimo 3 caracteres");
        return false;
    }

    let productPrice = document.querySelector("input[name=productPrice]").value;
    if(!productPrice){
        showError("El producto debe tener un precio estimado");
        return false;
    }

    let productDescriptionUpload = document.querySelector("textarea[name=productDescriptionUpload]").value;
    if(!productDescriptionUpload || productDescriptionUpload.length < 20){
        showError("Una descripción debe tener al menos 20 caracteres");
        return false;
    }

    let mainImageUpload = document.querySelector("input[name=mainImageUpload]").value
    console.log(mainImageUpload)
    if(!mainImageUpload){
        showError("El producto debe tener una imagen principal");
        return false;
    }

    let aimUpload = document.querySelector("input[name=aimUpload").value;
    
    if(!aimUpload){
        showError("Debemos saber qué quieres hacer con tu producto");
        return false;
    }
    

    
    form.submit();
}

